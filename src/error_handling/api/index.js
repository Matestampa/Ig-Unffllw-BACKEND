//------------ importar handler y errors generales ----------------
const {apiError_handler}=require("./handler.js");
const {Error4User,DEF_API_ERRORS}=require("./general_errors.js");

//----------- importar errors especificos ------------------------
const {FOLLOWERS_ERRORS}=require("./followers_errors.js");

module.exports={apiError_handler,Error4User,DEF_API_ERRORS,FOLLOWERS_ERRORS};