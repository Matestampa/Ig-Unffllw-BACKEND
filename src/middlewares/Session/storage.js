const {REDIS_CONN_VARS}=require("../../config/redis_config.js");
const {createClient}=require("redis");
const RedisStore=require("connect-redis").default;


//Iniciamos client de redis
let redisClient=createClient({
    host:REDIS_CONN_VARS.host,
    port:REDIS_CONN_VARS.port,
    password:REDIS_CONN_VARS.password,
})

//Lo conectamos
redisClient.connect().catch(console.error)


//Store de redis para que lo use la session.
let redisStore=new RedisStore({
   client:redisClient,
   
   prefix:"igUnfllwSession:", //esto se lo pone adelante de cada key, q se cree desde este store.
                              //Por si tenemos varias cosas que usan el mismo client  server de redis
                              //y no queremos que se confundan las keys.      
   
   ttl:1000*60*60*24, //le damos 1 dia de vida
   
   disableTouch:true, //deshabilitamos que se reinicie el ttl cada vez q se accede a una key
})



//Clase abstraida, para acceder de forma facil a metodos que necesitamos de los session stores.
//(en este caso usamos el de redis, pero funciona para cualquiera
//que este vinculado a express-session).
class SessionStorageAccess{
    constructor(StorageClass){
        this.Storage=StorageClass;
    }

    async get(key){
        return await this.Storage.get(key,(err,data)=>{return data})
    }

    async set(key,value){
        await this.Storage.set(key,value);
    }
}


module.exports={
    redisStore,
    SessionStorageAccess
}