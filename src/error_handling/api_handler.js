

function apiError_handler(error,response){
    
    let response_message=error.message? error.message: error.default_message;

    response.status(error.status_code).json({
        status:error.status_code,
        error:{
            message:response_message,
            code:error.code,
            sub_code:error.sub_code ? error.sub_code : undefined,
            data:error.data 
        }
    });
}


//Clase Base de errors para la api.
class Error4User extends Error{
    constructor(message,data){
      super(message);
      this.message=message; 
      this.data=data;
      this.code;
      this.default_message;
      this.status_code;
    }
}


//Clases hijass
class Api_NotAuth_Error extends Error4User{
    constructor(message,data){
        super(message,data);
        
        this.code="NOT_AUTH";
        this.default_message="Unhautorized user"
        this.status_code=401;
    }
}

class Api_BadRequest_Error extends Error4User{
    constructor(message,data){
        super(message,data);
        
        this.code="BAD_REQ";
        this.default_message="Bad request"
        this.status_code=404;
    }
}

class Api_Retry_Error extends Error4User{
    constructor(message,data){
        super(message,data)
        
        this.code="RETRY";
        this.status_code=404;
        this.default_message="Retry the request";
    }
}

class Api_ServerError extends Error4User{
    constructor(message,data){
        super(message,data);
        
        this.code="SERVER";
        this.default_message="Server malfunc"
        this.status_code=500;
    }
}


//Obj con estos errors default.
const DEF_API_ERRORS={
    NOT_AUTH:(message,data)=>new Api_NotAuth_Error(message,data),
    BAD_REQ:(message,data)=> new Api_BadRequest_Error(message,data),
    RETRY:(message,data)=> new Api_Retry_Error(message,data),
    SERVER: (message,data)=> new Api_ServerError(message,data),
}


module.exports={apiError_handler,Error4User,DEF_API_ERRORS};