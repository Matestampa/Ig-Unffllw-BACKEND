const {createClient}=require("redis");
const {REDIS_CONN_VARS}=require("../config/redis_config.js");

const {internalError_handler,InternalError}=require("../error_handling");

//Crear client de redis
let redisClient=createClient({
    url:`redis://${REDIS_CONN_VARS.host}:${REDIS_CONN_VARS.port}`,
    socket:{
        reconnectStrategy:false
    }
})

//------------------------- Error handling -----------------------------

//Custom redis error
class RedisError extends InternalError{
    constructor(message,attachedError){
        super(message,attachedError);
        this.critic=true;
    }
}

//General error handler
redisClient.on("error",async (e)=>{
    
    //Si es error de conexion
    if (e.code=="ECONNREFUSED"){
        internalError_handler(new RedisError("Connection failed",e))
    }
    //Otro
    else{
        internalError_handler(new RedisError("",e))
        await redisClient.disconnect();
    }
});


//------------------------- Connection ---------------------------------------
async function connect(){
    try{
        await redisClient.connect();
        console.log("Redis connection established");
    }
    catch(e){}
} 


connect();

module.exports={redisClient};