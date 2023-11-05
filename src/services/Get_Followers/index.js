//Aca iria la funcion q llama el controller.

const {get_IgAccountsManager}=require("../IgAccounts_Managment")

//Import igRequests
const {userInfo_igRequest}=require("./requests/userInfo_request.js");
const {followers_igRequest}=require("./requests/followers_request.js");


//Import utils
const {sleep}=require("./utils.js");


//Import errors part
const {error_handler}=require("./service_errorHandler.js");

const {DEF_API_ERRORS}=require("../../error_handling");



//Esta funcion es la que llama el controller.
//Se encarga de llamar a las funciones de "get_userInfo"
//y de "get_followers", y traer los datos.
async function getFollowers_service(username){
    let IgAccountsManager=get_IgAccountsManager();

    
    let info=await get_userInfo(IgAccountsManager,username);

    
    let followers=await get_followers(IgAccountsManager,info.user_info.id);

    
    return {followers:followers};

}


//Return {user_info:{id,isPrivate}}
async function get_userInfo(AccountsManager,username){
    
    //Cuenta para hacer la request.
    let req_account=AccountsManager.get_accountForReq();
    
    //Si ya no hay cuentas disponibles
    if (!req_account){
        throw DEF_API_ERRORS.SERVER("No available Accounts");
    }
    
    //hacer la req de la data del perfil
    let user_info;
    
    try{
        user_info=await userInfo_igRequest(req_account.auth.cookies, username);
    }
    
    //Ver si tira error la req
    catch(error){
        await error_handler(error,AccountsManager,req_account.key);
    }
    
    //Nos fijamos si la cuenta es privada
    if (user_info.isPrivate){
        throw DEF_API_ERRORS.BAD_REQ("The account is private");
          
    }

    return user_info;
}



//Return {followers:{user_id:username...}}
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
            throw DEF_API_ERRORS.SERVER("No available Accounts");
        }

        //hacer la request
        let data={};
        
        try{
            data=await followers_igRequest(req_account.auth.cookies,user_id,cursor)
        } 
        
        //Ver si tiro errror la req
        catch(error){
            await error_handler(error,AccountsManager,req_account.key);
        }
        
        //Si no, vamos agregando los followers.
        
        followers={...followers,...data.followers};

        cursor=data.cursor;
    }
    
    //Mientras el cursor siga teniendo contenido(es decir q todavia falten por traer)
    while(cursor!="");

    return followers;
}


module.exports={getFollowers_service};