const {APP_GEN_VARS}=require("../../config/app_config.js");

const {followers_igRequest}=require("./followers_request.js");
const {userInfo_igRequest}=require("./userInfo_request.js");
const {auth_igRequest}=require("./auth_request.js");

const {BannedIgAccount_Error,NotAuthIgAccount_Error,
       UnknownIgRequest_Error}=require("./error_handler.js");

const {TEST_REQUESTS}=require("./tests_requests.js");

const NORMAL_REQUESTS={
    userInfo:userInfo_igRequest,
    followers:followers_igRequest,
    auth:auth_igRequest,
}

let DEF_REQUESTS=APP_GEN_VARS.secure_mode ? TEST_REQUESTS : NORMAL_REQUESTS;

module.exports={

    followers_igRequest:DEF_REQUESTS.followers,
    userInfo_igRequest:DEF_REQUESTS.userInfo,
    auth_igRequest:DEF_REQUESTS.auth,


    IG_REQ_ERRORS:{
        BannedIgAccount_Error,
        NotAuthIgAccount_Error,
        UnknownIgRequest_Error
    }
}