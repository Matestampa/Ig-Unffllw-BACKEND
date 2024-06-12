//IMPORTAR ERRORES COMUNES HTTP PARA EL USER.
const {DEF_API_ERRORS,Error4User}=require("../../error_handling");


//Importar errores que pueden tener las requests aig.
const {IG_REQ_ERRORS}=require("../IgRequests");


//Importar habdler para los erros internos
const {internalError_handler,GEN_INT_ERRORS,InternalError}=require("../../error_handling");



/*---- Algunos errores que pueden haber en las funciones del servicio -----*/
const SERVICE_ERRORS={
    BANNED_LAMBDA:(message,attachedError)=>new BannedLambda_Error(message,attachedError)
}

class BannedLambda_Error extends InternalError{
    constructor(message,attachedError){
        super(message,attachedError);
        this.name="BannedLambda_Error"
        this.message="Lambda banned from ig, deploy again"
        this.critic=true;
    }
}




//Este error handler es propio del servicio, y se encarga
//tanto de retornar un error para el usuario, como de ejecutar
//la logica posterior necesaria de c/u.
async function error_handler(error,AccountsManager,account_key){
    
    if (error instanceof BannedLambda_Error){
        internalError_handler(error);
        return DEF_API_ERRORS.SERVER();
    }
    
    if (error instanceof IG_REQ_ERRORS.BannedIgAccount_Error){
        AccountsManager.disable_account(account_key);
        
        //Avisar en algun lado q paso esto. Para que la podamos volver a activar manualmente
        //(podriamos llamar a un logger tmb)
        error.message=`Account:${account_key} banned`
        internalError_handler(error)

        return DEF_API_ERRORS.RETRY();
    }

    else if (error instanceof IG_REQ_ERRORS.NotAuthIgAccount_Error){

        //Llamar al login para q inicie session de nuevo
        AccountsManager.disable_account(account_key,"auth");

        //Avisar en el logger de erros que paso por las dudas
        error.message=`Account:${account_key} not auth`
        internalError_handler(error);

        return DEF_API_ERRORS.RETRY();
    }

    else if (error instanceof IG_REQ_ERRORS.UnknownIgRequest_Error){
        AccountsManager.disable_account(account_key)
        
        //mandarlo a algun loger o lo que sea por error critico
        error.message=`Account:${account_key} unknown error`
        internalError_handler(error);


        return DEF_API_ERRORS.SERVER();
    }
    
    //Si es un error desconocido, que vino por otra cosa
    else{
        internalError_handler(GEN_INT_ERRORS.UNKNOWN("",error));
        return DEF_API_ERRORS.SERVER();
    }

}


module.exports={error_handler,SERVICE_ERRORS}