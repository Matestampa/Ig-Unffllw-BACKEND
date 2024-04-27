const {APP_GEN_VARS}=require("../../config/app_config.js");

const {followers_igRequest}=require("./followers_request.js");
const {userInfo_igRequest}=require("./userInfo_request.js");
const {login_igRequest}=require("./login_request.js");

const {BannedIgAccount_Error,NotAuthIgAccount_Error,BadLoginIgAccount_Error,
       UnknownIgRequest_Error}=require("./error_handler.js");

const {TEST_REQUESTS}=require("./tests_requests.js");

const NORMAL_REQUESTS={
    userInfo:userInfo_igRequest,
    followers:followers_igRequest,
    login:login_igRequest,
}

let DEF_REQUESTS=APP_GEN_VARS.secure_mode ? TEST_REQUESTS : NORMAL_REQUESTS;


module.exports={

    followers_igRequest:DEF_REQUESTS.followers,
    userInfo_igRequest:DEF_REQUESTS.userInfo,
    login_igRequest:DEF_REQUESTS.login,


    IG_REQ_ERRORS:{
        BannedIgAccount_Error,
        NotAuthIgAccount_Error,
        BadLoginIgAccount_Error,
        UnknownIgRequest_Error
    }
}