const {apiError_handler,Error4User,DEF_API_ERRORS,FOLLOWERS_ERRORS}=require("./api");
const {internalError_handler,InternalError,GEN_INT_ERRORS}=require("./internal");


module.exports={apiError_handler,DEF_API_ERRORS,FOLLOWERS_ERRORS,
                internalError_handler,InternalError,GEN_INT_ERRORS};