const {IG_ACCOUNTS_VARS}=require("../../config/igAccounts_config.js");

const {JsonFile_Access}=require("./storage_utils.js");

const {IgAccountsUse_Manager}=require("./accountsUseManager.js");

const {internalError_handler}=require("../../error_handling");
const {NoMoreIgAccounts_Error}=require("./errors.js");

let IG_ACCOUNTS_DATA={};


/*
Clase encargada de manejar todo lo relacionado con las cuentas de IG:

- Carga los datos de las cuentas en memoria.

- Es la unica que puede acceder a ellos.

- Provee los datos de cuentas para hacer una request a ig.

- A traves de ella se pueden modificar datos de las cuentas.
*/
class IgAccounts_Manager{
    constructor(){
        
        this.Storage_Access=new JsonFile_Access(IG_ACCOUNTS_VARS.accounts_file);
        
        this.LoginControl;
        
        
        //Traer la data
        //Meterla a memoria
        IG_ACCOUNTS_DATA=this.__getAll_fromStorage()
        this.ACTIVE_ACCOUNTS_KEYS=this.__filter_activeAccounts(IG_ACCOUNTS_DATA);
        
        //Darle la data al "IgAccountUse_Manager"
        this.AccountsUse_Manager=new IgAccountsUse_Manager(this.ACTIVE_ACCOUNTS_KEYS);
    }
    
    //Da la data de una cuenta para hacer req
    async get_accountForReq(){
       let account_key;
       let repeat=false;
       
       do{
         account_key=await this.AccountsUse_Manager.get_availAccount();
         
         //Si pasa esto es q no hay mas accounts disponibles
         if (account_key==undefined){
            //-------------------- TIRAR ERROR ACAAA -------------------------------------
            return undefined;
            break;
         }
         
         //Si la cuenta no esta activa, hay que pedir otra
         if (IG_ACCOUNTS_DATA[account_key]["active"]==false){
            repeat=true;
         }
         
         //Si todo esta bien, devolvemos la data de auth.
         else{
            let authData=IG_ACCOUNTS_DATA[account_key]["auth"];

            let proxyData=IG_ACCOUNTS_DATA[account_key]["proxy"].url;

            return {key:account_key,authData:authData,proxyData:proxyData}
         }
       }
       while(repeat);
    
    } 

    get_activeAccountsKeys(){
        return this.ACTIVE_ACCOUNTS_KEYS;
    }

    get_allAccountsData(){
        return IG_ACCOUNTS_DATA;
    }
    
    
    //Da data de la cuenta para lo q sea (la usaria el de login x ejemplo)
    get_accountData(account_key,field){
        
        return IG_ACCOUNTS_DATA[account_key][field];
    }
    
    
    //Setea data de la cuenta (la usaria el de login x ejemplo)
    set_accountData(account_key,field,data){
        
        //Si se actualiza toda la data de una
        if (field=="ALL"){
            IG_ACCOUNTS_DATA[account_key]=data
        }
        
        //Si se actualiza por campo
        else{
            if (IG_ACCOUNTS_DATA[account_key][field]!=undefined){
            
                //Guardar en memoria
                IG_ACCOUNTS_DATA[account_key][field]=data;
            
            }
        }
        
        //guardar despues en alamcenamiento ext
        this.Storage_Access.write(IG_ACCOUNTS_DATA);
    
    }
    
    //Activa una cuenta
    enable_account(account_key,data_already_setted){
        
        //Si ya se llamo a set_accountData antes. Y solo se quiere actualizar la
        //data del manager.
        if (data_already_setted){
            if (IG_ACCOUNTS_DATA[account_key]["active"]==true){
                //Habilitar en "IgAccountsUse_Manager"
                this.AccountsUse_Manager.enable_account(account_key);
            
                //Añadir key a las activas
                this.ACTIVE_ACCOUNTS_KEYS.push(account_key);
            }
            return;
        }
        
        //Si se quiere hacer todo.
        if (IG_ACCOUNTS_DATA[account_key]["active"]!=true){
        
            //Guardar en memoria, y ext
            this.set_accountData(account_key,"active",true);
            
            //Habilitar en "IgAccountsUse_Manager"
            this.AccountsUse_Manager.enable_account(account_key);
            
            //Añadir key a las activas
            this.ACTIVE_ACCOUNTS_KEYS.push(account_key);
        
        }
    }
    
    //Desactiva una cuenta (cuando nos la banea instagram x ejemplo)
    disable_account(account_key,reason){
        
        if (IG_ACCOUNTS_DATA[account_key]["active"]!=false){
            
            //Guardar en memoria y ext.
            this.set_accountData(account_key,"active",false);
            
            //Quitar la key de las activas
            this.ACTIVE_ACCOUNTS_KEYS=this.ACTIVE_ACCOUNTS_KEYS.filter(key=> key!=account_key);
            
            //Deshabilitar en "IgAccountsUse_Manager"
            let accountsLeft=this.AccountsUse_Manager.disable_account(account_key);
            
            //Si no queda ninguna, hay que mandarlo al handler de erros central
            //para que cancele las requests al server.
            if (accountsLeft==0){
                internalError_handler(new NoMoreIgAccounts_Error());
            }


            if (reason=="auth"){
                //Llamar al coso de login
                //this.Accounts_LoginControl.update_authCredentials();
            }
        }
    }

    set_loginControl(loginControl_class){
        this.LoginControl=loginControl_class;
    }


    __filter_activeAccounts(accounts_data){
        let accounts_keys=[];
        
        //Solo metemos las keys de las account q esten activas
        for (let key of Object.keys(accounts_data)){
            if (accounts_data[key].active){
                accounts_keys.push(key);
            }
        }

        return accounts_keys;
    }
    
    //Trae la data del almacenamiento externo y la mete a memoria
    __getAll_fromStorage(){
        return this.Storage_Access.read();
    }

    /*Guarda toda la data de una de la memoria en el almacenamiento externo
    __saveAll_toStorage(){
    }*/
}


module.exports={IgAccounts_Manager};
