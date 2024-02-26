const {followers_igRequest}=require("./followers_request.js");
const {userInfo_igRequest}=require("./userInfo_request.js");
const {auth_igRequest}=require("./auth_request.js");

const {BannedIgAccount_Error,NotAuthIgAccount_Error,
       UnknownIgRequest_Error}=require("./error_handler.js");


module.exports={
    followers_igRequest,
    userInfo_igRequest,
    auth_igRequest,
    
    IG_REQ_ERRORS:{
        BannedIgAccount_Error,
        NotAuthIgAccount_Error,
        UnknownIgRequest_Error
    }
}