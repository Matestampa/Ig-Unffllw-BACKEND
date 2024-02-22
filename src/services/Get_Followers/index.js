const {get_IgAccountsManager}=require("../IgAccounts_Managment")

//Import igRequests
const {userInfo_igRequest}=require("./requests/userInfo_request.js");
const {followers_igRequest}=require("./requests/followers_request.js");


//Import utils
const {sleep}=require("./utils.js");


//Import errors part
const {error_handler}=require("./service_errorHandler.js");

const {DEF_API_ERRORS}=require("../../error_handling");


let AccountsManager=get_IgAccountsManager();




//------------------ TRAER INFO NECESARIA DEL USER. ----------------------------

//Return {user_info: { id, isPrivate, cant_followers} }
async function get_userInfo(username){
    
    //Cuenta para hacer la request.
    let req_account=AccountsManager.get_accountForReq();
    
    //Si ya no hay cuentas disponibles
    if (!req_account){
        return  {error:DEF_API_ERRORS.SERVER("No available Accounts"),user_info:null}; 
    }
    
    //hacer la req de la data del perfil
    let user_info;
    
    try{
        user_info=await userInfo_igRequest(username,req_account.auth.cookies,
                                           req_account.proxy.url);
    }
    
    //Ver si tira error la req
    catch(error){
        let user_error=await error_handler(e,AccountsManager,req_account.key);
        
        return {error:user_error,user_info:null};
    }
    
    //Nos fijamos si la cuenta es privada
    if (user_info.isPrivate){
        return {error:DEF_API_ERRORS.BAD_REQ("The account is private"),user_info:null};
          
    }

    return user_info;
}



//----------------- TRAER DE A POCO (CANT_REQ) LOS FOLLOWERS DEL USER. ---------------

const CANT_REQ=3; //Cantidad de req a ig q puede hacer una req del user antes de return
const MS_BTW_REQ=500; //Milisecs entre requests a ig.

//Return {followers:{user_id:username...}}
async function get_followers(user_id,last_cursor){ 

    let followers={};
    let cursor;

    let req_cont=0;
    let req_account;
    
    //Hacemos las requests para traer de a poco los followes
    do{ 
        //Ponemos un rate-limiting
        sleep(MS_BTW_REQ);
        
        //Cuenta para hacer la request.
        req_account=AccountsManager.get_accountForReq();
        
        //Si ya no hay cuentas disponibles
        if (!req_account){
            return {error:DEF_API_ERRORS.SERVER("No available Accounts"),followers:null};
        }

        //hacer la request
        let data={};
        
        try{
            data=await followers_igRequest(user_id,last_cursor,req_account.auth.cookies,
                                           req_account.proxy.url);
        } 
        
        //Ver si tiro errror la req
        catch(error){
            let user_error=await error_handler(error,AccountsManager,req_account.key);
            
            return {error:user_error,followers:null};
        }
        
        //Si no, vamos agregando los followers.
        
        followers={...followers,...data.followers};

        cursor=data.cursor;
        
        //Chequear limites de cant de requests.
        req_cont++;
        if (req_cont>=CANT_REQ){
            break;
        }
    }
    
    //Mientras el cursor siga teniendo contenido(es decir q todavia falten por traer)
    while(cursor!="");

    return followers;
}


module.exports={get_userInfo,get_followers};