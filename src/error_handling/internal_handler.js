

async function internalError_handler(error){
    //Lo logea
    console.log(`${error} DESDE EL INTERNAL HANDLER`);

    //Si es critico, tira abajo el server o las requests.
    if (error.isCritic){
      //tirar abajo, .....
    }
}


class InternalError extends Error{
    constructor(message,attachedError){
      super(message);
      this.message=message;
      this.attachedError=attachedError;
      this.critic;
    }
}

module.exports={internalError_handler,InternalError};