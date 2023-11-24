const {disable_requests}=require("../config/app_config.js");

async function internalError_handler(error){
    //Lo logea
    console.log(`${error} DESDE EL INTERNAL HANDLER`);

    //Si es critico, tira abajo el server o las requests.
    if (error.critic){
      //tirar abajo, .....
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

module.exports={internalError_handler,InternalError};