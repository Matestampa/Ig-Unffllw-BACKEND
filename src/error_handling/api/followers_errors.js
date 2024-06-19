const {Api_ServerError,Api_BadRequest_Error}=require("./general_errors.js");

class Api_ACCOUNT_NOTEXIST_Error extends Api_BadRequest_Error{
    constructor(message,data){
        super(message,data);
        
        this.sub_code="ACCOUNT_NOTEXIST";
        this.message="The account does not exist";

    }
}

class Api_PRIVATE_ACCOUNT_Error extends Api_BadRequest_Error{
    constructor(message,data){
        super(message,data);
        
        this.sub_code="PRIVATE_ACCOUNT";
        this.message="The account is private";

    }
}

class Api_FOLL_EXCESS_Error extends Api_BadRequest_Error{
    constructor(message,data){
        super(message,data);

        this.sub_code="FOLL_EXCESS";
        this.message="Followers limit excedeed";
    }
}

class Api_NOMORE_REQ_Error extends Api_BadRequest_Error{
    constructor(message,data){
        super(message,data);

        this.sub_code="NOMORE_REQ";
        this.message="Requests limit excedeed";
    }
}

class Api_REQUESTS_DISABLED_Error extends Api_ServerError{
    constructor(message,data){
        super(message,data);

        this.sub_code="REQUESTS_DISABLED";
        this.message="The server is down, please try later";
    }
}

const FOLLOWERS_ERRORS={
    ACCOUNT_NOTEXIST: (message,data)=>new Api_ACCOUNT_NOTEXIST_Error(message,data),
    PRIVATE_ACCOUNT: (message,data)=>new Api_PRIVATE_ACCOUNT_Error(message,data),
    FOLL_EXCESS: (message,data)=>new Api_FOLL_EXCESS_Error(message,data),
    NOMORE_REQ: (message,data)=>new Api_NOMORE_REQ_Error(message,data),
    REQUESTS_DISABLED: (message,data)=>new Api_REQUESTS_DISABLED_Error(message,data)
}

module.exports={
    FOLLOWERS_ERRORS
}