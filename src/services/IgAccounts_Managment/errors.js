const {InternalError}=require("../../error_handling");


class NoMoreIgAccounts_Error extends InternalError{
    constructor(message,attachedError){
        super(message,attachedError)
        this.name="NomoreIgAccounts_Error"
        this.critic=true;
    }
}

module.exports={NoMoreIgAccounts_Error};

