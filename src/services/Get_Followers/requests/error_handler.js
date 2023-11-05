
const {InternalError}=require("../../../error_handling");

function igRequest_errorHandler(error){
    let message=error.message;
    
    if (error.type=="invalid-json"){
        throw new BannedIgAccount_Error();
    }

    else if (message=="not auth"){
        throw new NotAuthIgAccount_Error();
    }

    else{
       throw new UnknownIgRequest_Error("",error);
    }
}



class NotAuthIgAccount_Error extends InternalError{
    constructor(message,attachedError){
        super(message,attachedError);
        this.critic=false;
    }
}


class BannedIgAccount_Error extends InternalError{
    constructor(message,attachedError){
        super(message,attachedError);
        this.critic=false;
    }
}


class UnknownIgRequest_Error extends InternalError{
    constructor(message,attachedError){
        super(message,attachedError);
        this.critic=true;
    }
}


module.exports={igRequest_errorHandler,
                BannedIgAccount_Error,NotAuthIgAccount_Error,UnknownIgRequest_Error};