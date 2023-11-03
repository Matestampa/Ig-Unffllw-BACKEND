class InternalError extends Error{
    constructor(message,attachedError){
      super(message);
      this.message=message;
      this.attachedError=attachedError;
      this.critic;
    }
}


class Error4User extends Error{
    constructor(message,data){
      super(message);
      this.message=message;
      this.data=data;
      this.default_message;
      this.status_code;
    }
}


module.exports={InternalError,Error4User};