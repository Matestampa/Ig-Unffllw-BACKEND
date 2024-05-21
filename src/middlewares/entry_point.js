
const {APP_ACCESS_VARS,APP_GEN_VARS}=require("../config/app_config");
const {apiError_handler,DEF_API_ERRORS,FOLLOWERS_ERRORS}=require("../error_handling");


async function entry_point(req,res,next){
     //Si las requests no estan habilitadas
     if (!APP_ACCESS_VARS.allow_requests){
        apiError_handler(FOLLOWERS_ERRORS.NOMORE_REQ(),res);
        return 
     }
     
     //Si estamos en dev_mode(o testing)
     if (APP_GEN_VARS.alpha_mode){
        
        //Verificar que la request contenga la password exclusiva
        let pwd=req.body["excl_pwd"];
        
        if (pwd!=APP_ACCESS_VARS.exclusive_req_pwd){
           apiError_handler(DEF_API_ERRORS.BAD_REQ("Wrong exclusive pwd"),res);
           return;
        }

     }
     
     next();
}

module.exports={entry_point};