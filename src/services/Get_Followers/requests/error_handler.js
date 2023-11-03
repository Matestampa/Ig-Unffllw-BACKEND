const IG_REQUESTS_ERRORS={
    CONNECTION: (descr)=>{return {type:IG_REQUESTS_ERRORS_TYPES.CONNECTION,descr:descr}},
    BANNED_ACCOUNT: ()=>{return {type:IG_REQUESTS_ERRORS_TYPES.BANNED_ACCOUNT,descr:"Banned Account"}},
    NOT_AUTH: ()=>{return {type:IG_REQUESTS_ERRORS_TYPES.NOT_AUTH,descr:"not auth account"}},
};



function request_errorHandler(error){
    let message=error.message;
    
    if (error.type=="invalid-json"){
        //return IG_REQUESTS_ERRORS.BANNED_ACCOUNT;
        return IG_REQUESTS_ERRORS.BANNED_ACCOUNT();
    }

    else if (message=="not auth"){
        //return IG_REQUESTS_ERRORS.NOT_AUTH;
        return IG_REQUESTS_ERRORS.NOT_AUTH();
    }

    else{
        //return IG_REQUESTS_ERRORS.CONNECTION;
        return IG_REQUESTS_ERRORS.CONNECTION(message);
    }
}


module.exports={IG_REQUESTS_ERRORS_TYPES, request_errorHandler};