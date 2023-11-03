//Aca iria la funcion q llama el controller.

const {get_IgAccountsManager}=require("../IgAccounts_Managment")

//Import igRequests
const {userInfo_igRequest}=require("./requests/userInfo_request.js");
const {followers_igRequest}=require("./requests/followers_request.js");


//Import utils
const {sleep}=require("./utils.js");


//Import errors part
const {error_handler,SERVICE_ERRORS}=require("./service_errorHandler.js");



//Esta funcion es la que llama el controller.
//Se encarga de llamar a las funciones de "get_userInfo"
//y de "get_followers", y traer los datos.
async function getFollowers_service(username){
    let IgAccountsManager=get_IgAccountsManager();

    let data;
    
    data=await get_userInfo(IgAccountsManager,username);

    
    if (data.error){
        return {followers:undefined,error:data.error};
    }

    
    data=await get_followers(IgAccountsManager,data.user_info.id);

    
    if (data.error){
        return {followers:undefined,error:data.error};
    }

    
    return {followers:data.followers,error:undefined};

}


//Return {user_info:{id,isPrivate},error}
async function get_userInfo(AccountsManager,username){
    
    //Cuenta para hacer la request.
    let req_account=AccountsManager.get_accountForReq();
    
    //Si ya no hay cuentas disponibles
    if (!req_account){
        let error4User=error_handler(SERVICE_ERRORS.NO_AVAILABLE_ACCOUNTS, AccountsManager);
        
        return {user_info:undefined,error:error4User};
    }
    
    //hacer la req de la data del perfil
    let {user_info,error}=await userInfo_igRequest(req_account.auth.cookies, username);
    
    //si hay error handlearlo y ver q le mandamos al user
    if (error){
        let error4User=await error_handler(error,AccountsManager,req_account.key);
        
        return {user_info:undefined,error:error4User};
    }

    else{
       
       //Nos fijamos si la cuenta es privada
       if (user_info.isPrivate){
          let error4User=await error_handler(SERVICE_ERRORS.PRIVATE_PROFILE);
          
          return {user_info:undefined,error:error4User};  
       }

       return {user_info:user_info,error:undefined};
    }

}


//Return {followers:{user_id:username...}, error}
async function get_followers(AccountsManager,user_id){ 

    let followers={};
    let cursor;
    
    //Hacemos las requests para traer de a poco los followes
    do{ 
        //Ponemos un rate-limiting
        sleep(100);
        
        //Cuenta para hacer la request.
        req_account=AccountsManager.get_accountForReq();
        
        //Si ya no hay cuentas disponibles
        if (!req_account){
            let error4User=error_handler(SERVICE_ERRORS.NO_AVAILABLE_ACCOUNTS, AccountsManager);
            return {followers:undefined,error:error4User};
        }

        //hacer la request
        let {data,error}=await followers_igRequest(req_account.auth.cookies,user_id,cursor)
        
        //Si tira error handlearlo para devolverle algo al user
        if (error){
            let error4User=await error_handler(error,AccountsManager,req_account.key);
            
            return {followers:undefined,error:error4User};

        }
        
        //Si no, vamos agregando los followers.
        else{
            followers={...followers,...data.followers};

            cursor=data.cursor;
        }

    }
    
    //Mientras el cursor siga teniendo contenido(es decir q todavia falten por traer)
    while(cursor!="");

    
    return {followers:followers,error:undefined};
}


module.exports={getFollowers_service};