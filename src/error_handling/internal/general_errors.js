//---------------------------- ERRORS -------------------------------------------

//Clase Base de errors internos
class InternalError extends Error{
    constructor(message,attachedError){
      super(message);
      this.name="InternalError"
      this.message=message; //str
      this.attachedError=attachedError; //Error
      this.critic; //bool
    }
}


//--------------- Clases Hijas  --------------------------------------
class UnknownError extends InternalError{
  constructor(message,attachedError){
    super(message,attachedError);
    this.name="UnknownError"
    this.critic=true;
  }
}



const GEN_INT_ERRORS={
  UNKNOWN:(message,attachedError)=>new UnknownError(message,attachedError)
}

module.exports={InternalError,GEN_INT_ERRORS};