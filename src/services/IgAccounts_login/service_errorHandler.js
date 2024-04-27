//------- Importar errores que pueden tener las requests a Ig. --------------
const {IG_REQ_ERRORS}=require("../IgRequests");


//------ Importar habdler para los erros internos --------------------------
const {internalError_handler,GEN_INT_ERRORS}=require("../../error_handling");



function error_handler(error,AccountsManager,account_key){
     
    if (error instanceof IG_REQ_ERRORS.BadLoginIgAccount_Error){
        AccountsManager.disable_account(account_key);
        error.message=`Account ${account_key} failed login, maybe expired data`

        internalError_handler(error);
        return;
    }
    
    else if (error instanceof IG_REQ_ERRORS.BannedIgAccount_Error){
        AccountsManager.disable_account(account_key);
        
        //Avisar en algun lado q paso esto. Para que la podamos volver a activar manualmente
        //(podriamos llamar a un logger tmb)
        error.message=`Account:${account_key} banned`
        internalError_handler(error)
        return;

    }

    else if (error instanceof IG_REQ_ERRORS.UnknownIgRequest_Error){
        AccountsManager.disable_account(account_key)
        
        //mandarlo a algun loger o lo que sea por error critico
        error.message=`Account:${account_key} unknown error`
        internalError_handler(error);
        return;
    }

}

module.exports={error_handler};
