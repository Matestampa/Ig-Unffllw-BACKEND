const {disable_requests}=require("../config/app_config.js");

async function internalError_handler(error){
    //Lo logea
    console.log(`ERROR DESDE EL INTERNAL HANDLER`);
    console.log(error);

    //Si es critico, tira abajo el server o las requests.
    if (error.critic){
      //tirar abajo, .....
      console.log("REQUESTS DISABLED")
      disable_requests();
    }
}


class InternalError extends Error{
    constructor(message,attachedError){
      super(message);
      this.message=message; //str
      this.attachedError=attachedError; //Error
      this.critic; //bool
    }
}

class UnknownError extends InternalError{
  constructor(message,attachedError){
    super(message,attachedError);
    this.critic=true;
  }
}

const GEN_INT_ERRORS={
  UNKNOWN:(message,attachedError)=>new UnknownError(message,attachedError)
}

module.exports={internalError_handler,InternalError,GEN_INT_ERRORS};