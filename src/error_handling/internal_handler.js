const {disable_requests}=require("../config/app_config.js");

const {sendMail}=require("../extra_services/mail.js");

async function internalError_handler(error){
    //Si es critico, tira abajo el server o las requests.
    if (error.critic){
      disable_requests();
      
      console.log("REQUESTS DISABLED")
    }

    //Logearlo
    console.log(error);
    
    //Enviar mail
    send_ErrorMail(error.name,error.message,error.critic);

}

async function send_ErrorMail(name,message,critic){
    let mailSubject;
    let mailMessage;
    
    if (critic){
      mailSubject="REQUESTS DISABLED",
      mailMessage=`${name} | ${message} | critic: ${critic} | `
    }
    else{
      mailSubject=name;
      mailMessage=`${message} | critic: ${critic} | `
    }

    sendMail(mailSubject,mailMessage);
}


//---------------------------- ERRORS -------------------------------------------

class InternalError extends Error{
    constructor(message,attachedError){
      super(message);
      this.name="InternalError"
      this.message=message; //str
      this.attachedError=attachedError; //Error
      this.critic; //bool
    }
}

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

module.exports={internalError_handler,InternalError,GEN_INT_ERRORS};