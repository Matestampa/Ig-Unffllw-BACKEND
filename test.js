/*const {inititalize_IgAccountsManager}=require("./src/services/IgAccounts_Managment");
const {getFollowers_service}=require("./src/services/Get_Followers");




async function dale(){
    let {followers,error}=await getFollowers_service()

    console.log(followers)
    console.log(error);
}


inititalize_IgAccountsManager();
dale();*/


//Probar si try-catch es async     |podemos usar el handler sin problema ya que es sync con el await.
//Probar si se propagan los errroes  | si se propgan

/*function action(e){
    setTimeout(()=>{
        console.log("La action desencadenane putoo");
    },2000);
};

async function handler(e){
   action(e);
   throw new Error("ole ole ole");
}

async function level1(){
   try{
     throw new Error("Manu se la come");
   }
   catch(e){
     await handler(e);
     console.log("Listo");
   }
}

async function level0(){
    try{
        await level1();
        console.log("hola level 0");
    }
    catch(e){
        console.log(e);
        console.log("Retornamos el err en la response nashe");
    }
}

level0();*/

const RedisStore=require("connect-redis").default;
const {createClient}=require("redis");

let redisClient=createClient({
    host:"localhost",
    port:6379,
})

redisClient.connect().catch(console.log)

let redisStore=new RedisStore({
   client:redisClient,
   prefix:"igUnfollowSession:",
   ttl:1000*60*60*24,
   disableTouch:true,
})

async function dale(){
    //await redisStore.set("age","tute");
    let value=await sessionStorage.get("age",(err,data)=>{return data});
    console.log(value)
    //await redisStore.set("name","yapu");
    //let all=await sessionStorage.all((err,data)=>{return err});

    //console.log(all);

}

class SessionStorage{
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

let sessionStorage=new SessionStorage(redisStore);

dale();