

const DAYS_TO_EXPIRE=2; //Limite de dias anteriores a la fecha de expiracion

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
        let account_keys=this.AccountsManager.get_allAccountKeys();
  
        for (let key of account_keys){
            let authData=this.AccountsManager.get_accountData(key,"auth");
            let expireDate=authData.expire;
  
            if (this.__isExpired(expireDate)){
                await this.update_authCredentials(key);
            }
        }
      }

    
    async update_loginCredentials(account_key){
        let login_data=this.AccountsManager.get_accountData(account_key,"login");
        //hacer la req, y etc, etc, etc.
    }
    
    
    async update_authCredentials(account_key){
        let auth_data=this.AccountsManager.get_accountData(account_key,"auth");
        
        //Request que nos de las cookies
        
        //Si todo va bien setear la data y activar la cuenta
        this.AccountsManager.set_accountData(account_key,"auth") //{cookies:,expire:}
        this.AccountsManager.enable_account(account_key);
        //Si va mal, avisar
    }
    
    __isExpired(expireDate){
        
        if (day_diference(new Date(expireDate),new Date()) < DAYS_TO_EXPIRE){
            return true;
        }
        return false;
    }

    __parseCookies(){}
}



//Util function
function day_diference(date1,date2){
    let ms_diff=date1.getTime()-date2.getTime();
    return ms_diff / (1000*60*60*24);
}



module.exports={IgAccounts_LoginControl};