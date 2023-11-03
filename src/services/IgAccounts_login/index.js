//Aca estaria la funcion que se dedique a hacer los chequeos de
//de las cookies, y de renovarlas de ser necesario.


class IgAccounts_LoginControl{
    consrtuctor(AccountsManager){
      this.AccountsManager=AccountsManager;
    }

    //Aca iria la func para chequear expire

    
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
    
    __isExpired(){}

    __parseCookies(){}
}



module.exports={IgAccounts_LoginControl};