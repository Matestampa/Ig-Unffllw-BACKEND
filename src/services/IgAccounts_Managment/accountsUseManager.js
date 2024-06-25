/*
Clase encargada de manejar el uso de las cuentas para las req, e
ir entregando las que esten disponibles cuando se solicite alguna.
*/

class IgAccountsUse_Manager{
    constructor(accounts_keys){
        this.accounts=[]; //arr con las keys
        this.accounts_data={}; //obj con las keys y su "data de uso"

        [this.accounts,this.accounts_data]=this.__initialize(accounts_keys);

        this.account_iterator=this.__iterator(this.accounts);
        
        //this.accounts=[key1,key2,key3]
        //this.accounts_data={key:{active,req_x_hr,last_time}}

        //el carrousel elije del arr la key, y con eso se trae la data del obj
    }

    __initialize(accounts_keys){
        //Esto deberia crear el obj con la data de las cuentas,
        //pero solo la data q tenga q ver con el uso.

        //ademas deberia crear el carrousel q usemos.
        //llenaer accounts_data y accounts
        accounts_keys.forEach(key=>{
            this.accounts.push(key);

            //Crear el obj si fuera necesario
            this.accounts_data[key]={};
        })

        return [this.accounts,this.accounts_data];
    }
    
    //Return key de la cuenta.
    get_availAccount(){
       let next_availAccount=this.account_iterator.next();

       return next_availAccount;
    }
    
    //
    enable_account(key){
        this.accounts.push(key);
    }
    
    //saca accounts de las posibles avail, y return cuantas avail quedan
    disable_account(key){
        //Sacar la key de la cuenta del array.

        for (let i=0;i<this.accounts.length;i++){
            if (this.accounts[i]==key){
                this.accounts.splice(i,1);
                break;
            }
        }

        return this.accounts.length;

    }

    __iterator(accounts){
        let index=0;
        return{
            next:function(){
                if(index>=accounts.length){
                    index=0;
                }
                return accounts[index++];
            }
        }
    }
}

module.exports={IgAccountsUse_Manager};