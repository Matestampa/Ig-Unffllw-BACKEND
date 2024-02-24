

const DAYS_TO_EXPIRE=2; //Limite de dias anteriores a la fecha de expiracion

/*Clase encargada de todo lo que tenga que ver con el login y autenticacion
  de las cuentas. Los datos, las requests para obtenerlos, y su verificacion
  de validez
*/
class IgAccounts_LoginControl{
    constructor(AccountsManager){
      this.AccountsManager=AccountsManager;
    }

    dale(){
        console.log(this.AccountsManager);
    }

    //Func para chequear el expire
    async check_expire(){
        let account_keys=this.AccountsManager.get_allAccountsKeys();
  
        for (let key of account_keys){
            let authData=this.AccountsManager.get_accountData(key,"auth");
            let expireDate=authData.expires;
  
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
        /*let new_authData={
            "expires": new Date("2024-8-10"),
            "cookies": "csrftoken=o7aS6VXop2pkaWYuux7T2yo5Pa1OvpmV; rur=\"NCG\\05463141326590\\0541731619700:01f789d76f63f4b82504770c576aa2063184a5e922571c4e5a9fd89aca98212b400a8f9c\"; ds_user_id=63141326590; sessionid=63141326590%3A5Nbb7ysMNPiTKm%3A21%3AAYdEykn7QUMhbcFd36N5IV_EEoZ7bq2RapPApamn6w; ",
            "headers": {"x-csrftoken": "o7aS6VXop2pkaWYuux7T2yo5Pa1OvpmV"}
        }*/
        
        //Si todo va bien setear la data y activar la cuenta
        this.AccountsManager.set_accountData(account_key,"auth",new_authData) //{cookies:,expire:}
        this.AccountsManager.enable_account(account_key);
        console.log(`Account ${account_key} updated`);
        
        //Si va mal, avisar
    }
    
    __isExpired(expireDate){
        console.log(expireDate);
        
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
    
    return Math.abs(ms_diff / (1000*60*60*24));
}



module.exports={IgAccounts_LoginControl};