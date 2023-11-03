/*Errores posibles:

- En ambas Requests:
   - Error en la conexion (interno) (500, intentar de nuevo)
   - Error de baneo: (interno)  (500, intentar de nuevo)
        - Desactivar la cuenta
        - Avisar que esta baneada a algun lado, nashe.
   
   - Error de auth: (interno)  (500, intentar de nuevo)
        - Desactivar la cuenta
        - Llamar al servicio de login (nose como)

- En ambas Funciones:
   - Error de no cuentas disponibles. (interno) (500)

- En funcion de "get_userInfo":
   - Que la cuenta sea privada. (user)  (404)

*/

//IMPORTAR ERRORES COMUNES HTTP PARA EL USER.
const {API_ERRORS}=require("../../middlewares/api_errorHandler.js");


//Importar errores que pueden tener las requests
const {IG_REQUESTS_ERRORS_TYPES}=require("./requests/error_handler.js");


//Errores que pueden haber en las funciones del servicio
const SERVICE_ERRORS={
    PRIVATE_PROFILE: Symbol(),
    NO_AVAILABLE_ACCOUNTS: Symbol(),
}


//Este error handler es propio del servicio, y se encarga
//tanto de retornar un error para el usuario, como de ejecutar
//la logica posterior necesaria de c/u.
async function error_handler(error,AccountsManager,account_key){
     
    if (error.type==IG_REQUESTS_ERRORS_TYPES.BANNED_ACCOUNT){
        AccountsManager.disable_account(account_key,"banned");
        //Avisar en algun lado q paso esto. Para que la podamos volver a activar manualmente
        //(podriamos llamar a un logger tmb)

        return API_ERRORS.RETRY();
    }

    if (error==IG_REQUESTS_ERRORS_TYPES.NOT_AUTH){
        AccountsManager.disable_account(account_key,"auth");
        //Llamar al login para q inicie session de nuevoSS
        return API_ERRORS.RETRY();
    }

    if (error==IG_REQUESTS_ERRORS_TYPES.CONNECTION){
        //mandarlo a algun loger o lo que sea por error critico
        return API_ERRORS.RETRY();
    }

    if (error==SERVICE_ERRORS.PRIVATE_PROFILE){
        //retornar el 404 nashe.
        return API_ERRORS.BAD_REQ("The account is private")
    }

    if (error==SERVICE_ERRORS.NO_AVAILABLE_ACCOUNTS){
        //cancelar las request al server,
        //setear 
        //retornar el 500, nsahee.
        return API_ERRORS.SERVER("No available accounts");
    }
}

module.exports={error_handler,IG_REQUESTS_ERRORS_TYPES,SERVICE_ERRORS}