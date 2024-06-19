const {DEF_API_ERRORS,apiError_handler}=require("../error_handling");

const {APP_ACCESS_VARS}=require("../config/app_config");


async function admin_auth(req,res,next){
    let auth_header=req.headers["authorization"];
    
    if (auth_header!=APP_ACCESS_VARS.admin_pwd){
       apiError_handler(DEF_API_ERRORS.NOT_AUTH(),res);return;
    }

    next();
}

module.exports={admin_auth};