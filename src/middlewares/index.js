
const {CONFIG_VARS}=require("../config/app_config");
const {apiError_handler,DEF_API_ERRORS}=require("../error_handling");


async function entry_point(req,res,next){
     if (!CONFIG_VARS.allow_requests){
        apiError_handler(DEF_API_ERRORS.SERVER());
     }

     next();
}

module.exports={entry_point};