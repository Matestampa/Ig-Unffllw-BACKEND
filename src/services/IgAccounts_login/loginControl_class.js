const {login_igRequest}=require("../IgRequests")

const {day_diference,clean_cookies,
      get_cookiesExpireDate}=require("./utils.js");

const {error_handler}=require("./service_errorHandler.js");


//---------------------------------------------------------------------------
const DAYS_TO_EXPIRE=2; //Limite de dias anteriores a la fecha de expiracion,
                        //para volver a actualizar las credenciales.

const AUTHCOOKIES_MAX_AGE=7776000; //para calcular la fecha de expire al recibir 
                                   //nuevas cookies de auth
//---------------------------------------------------------------------------------

/*Clase encargada de todo lo que tenga que ver con el login y autenticacion
  de las cuentas. Los datos, las requests para obtenerlos, y su verificacion
  de validez
*/
class IgAccounts_LoginControl{
    constructor(AccountsManager){
      this.AccountsManager=AccountsManager;
    }


    //Func para chequear el expire
    async check_expire(){
        let account_keys=this.AccountsManager.get_activeAccountsKeys();
  
        for (let key of account_keys){
            let authData=this.AccountsManager.get_accountData(key,"auth");
            let expireDate=authData.expires;
  
            if (this.__isExpired(expireDate)){
                console.log(`${key} expired`)
                
                //actualizamos los datos de auth
                let error=await this.update_authCredentials(key);
                
                if (error){ //si hay error lo mandamos al error handler
                   error_handler(error,this.AccountsManager,key);
                }
            }
            else{
                console.log(`${key} NOT expired`);
            }
        }
      }

    
    async update_loginCredentials(account_key){
        let login_data=this.AccountsManager.get_accountData(account_key,"login");
        //hacer la req, y etc, etc, etc.
    }
    
    
    async update_authCredentials(account_key){
        let login_data=this.AccountsManager.get_accountData(account_key,"login");
        let acc_proxyData=this.AccountsManager.get_accountData(account_key,"proxy")
        
        //Hacer Request que nos devuelve unas cookies en forma de array.
        let resp_cookies;
        try{
          resp_cookies=await login_igRequest(login_data.username,login_data.psd,
                                        login_data.cookies,login_data.headers,
                                        acc_proxyData.url);
        }
        catch(e){
          
          return e;
        }
        
        //Parsear esas cookies, para extraer la nueva data para auth.
        let new_authData=this.__parseCookies(resp_cookies);
        
        //Si todo va bien setear la data y activar la cuenta
        this.AccountsManager.set_accountData(account_key,"auth",new_authData) //{cookies:,expire:}
        this.AccountsManager.enable_account(account_key); //(medio al pedo?)
        
        console.log(`Account ${account_key} updated`);
        //Mandar mail
    }
    
    __isExpired(expireDate){
        
        if (day_diference(new Date(expireDate),new Date()) < DAYS_TO_EXPIRE){
            return true;
        }
        return false;
    }

    __parseCookies(resp_cookiesArr){
        let cookies_str=clean_cookies(resp_cookiesArr);

        let headers={
            "x-csrftoken":cookies_str.split(";")[0].split("=")[1]
        }
        
        //Calcular fecha de expiracion
        let expire_date=get_cookiesExpireDate(AUTHCOOKIES_MAX_AGE);

        //return clean_cookies
        return {"expires":expire_date,"cookies":cookies_str,"headers":headers};
    
    }
}




module.exports={IgAccounts_LoginControl};