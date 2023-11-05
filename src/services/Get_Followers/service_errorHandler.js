//IMPORTAR ERRORES COMUNES HTTP PARA EL USER.
const {DEF_API_ERRORS,Error4User}=require("../../error_handling");


//Importar errores que pueden tener las requests aig.
const {BannedIgAccount_Error,NotAuthIgAccount_Error,
       UnknownIgRequest_Error}=require("./requests/error_handler.js");


//Importar habdler para los erros internos
const {internalError_handler}=require("../../error_handling");


/*Errores que pueden haber en las funciones del servicio
const SERVICE_ERRORS={
    //PRIVATE_PROFILE: Symbol(),
    //NO_AVAILABLE_ACCOUNTS: Symbol(),
    
}*/




//Este error handler es propio del servicio, y se encarga
//tanto de retornar un error para el usuario, como de ejecutar
//la logica posterior necesaria de c/u.
async function error_handler(error,AccountsManager,account_key){
     
    if (error instanceof BannedIgAccount_Error){
        AccountsManager.disable_account(account_key);
        
        //Avisar en algun lado q paso esto. Para que la podamos volver a activar manualmente
        //(podriamos llamar a un logger tmb)
        error.message=`Account:${account_key} banned`
        internalError_handler(error)

        throw DEF_API_ERRORS.RETRY();
    }

    if (error instanceof NotAuthIgAccount_Error){

        //Llamar al login para q inicie session de nuevo
        AccountsManager.disable_account(account_key,"auth");

        //Avisar en el logger de erros que paso por las dudas
        error.message=`Account:${account_key} not auth`
        internalError_handler(error);

        throw DEF_API_ERRORS.RETRY();
    }

    if (error instanceof UnknownIgRequest_Error){
        AccountsManager.disable_account(account_key)
        
        //mandarlo a algun loger o lo que sea por error critico
        error.message=`Account:${account_key} unknown error`
        internalError_handler(error);


        throw DEF_API_ERRORS.SERVER();
    }

}


module.exports={error_handler,SERVICE_ERRORS}