const {createClient}=require("redis");
const {REDIS_CONN_VARS}=require("../config/redis_config.js");

//Iniciamos client de redis
let redisClient=createClient({
    url:`redis://${REDIS_CONN_VARS.host}:${REDIS_CONN_VARS.port}`
})


async function connect(){
    try{
        await redisClient.connect();
        console.log("Redis connection established");
    }

    catch(e){
        console.log("Redis conection failed");
        throw e;
    }
}

connect();

module.exports={redisClient};