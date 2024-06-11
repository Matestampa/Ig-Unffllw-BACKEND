const {get_IgAccountsManager}=require("../IgAccounts_Managment")

//----------------- Import igRequests -----------------------
const {userInfo_igRequest,followers_igRequest}=require("../IgRequests");

//---------------- Import utils ----------------------------
const {sleep}=require("./utils.js");

//---------------- Import const_vars -----------------------
const service_constVars=require("./const_vars.js");

//-------------- Import errors part -------------------------
const {error_handler}=require("./service_errorHandler.js");

const {DEF_API_ERRORS,FOLLOWERS_ERRORS}=require("../../error_handling");


/*let AccountsManager=get_IgAccountsManager();
console.log(AccountsManager);*/


//----------------- CHEQUEAR SI EXSITE EL USER -------------------------------

async function check_userExistence(username){
    //llamar a la lambda
}



//------------------ TRAER INFO NECESARIA DEL USER. ----------------------------

//Return {user_info: { id, isPrivate, cant_followers} }

async function get_userInfo(username){
    
    let AccountsManager=get_IgAccountsManager();
    
    //Cuenta para hacer la request.
    let req_account=AccountsManager.get_accountForReq();
    
    //Si ya no hay cuentas disponibles
    if (!req_account){
        return  {error:DEF_API_ERRORS.SERVER("No available accounts"),user_info:null}; 
    }
    
    //hacer la req de la data del perfil
    let user_info;
    
    try{
        user_info=await userInfo_igRequest(username,req_account.authData.cookies,
                                           req_account.authData.headers,req_account.proxyData);
    }
    
    //Ver si tira error la req
    catch(error){
        let user_error=await error_handler(error,AccountsManager,req_account.key);
        
        return {error:user_error,user_info:null};
    }
    
    //Nos fijamos si la cuenta es privada
    if (user_info.isPrivate){
        return {error:FOLLOWERS_ERRORS.PRIVATE_ACCOUNT(),user_info:null};
          
    }

    if (user_info.cant_followers> service_constVars.MAX_FOLLOWERS ){
        return {error:FOLLOWERS_ERRORS.FOLL_EXCESS(),user_info:null};
    }
    
    return {error:null,user_info:user_info};
}



//----------------- TRAER DE A POCO (CANT_REQ) LOS FOLLOWERS DEL USER. ---------------


//Return {followers:{user_id:username...}}
async function get_followers(user_id,last_cursor){
    
    let AccountsManager=get_IgAccountsManager();

    let followers={};
    let cursor=last_cursor;

    let req_cont=0;
    let req_account;
    
    //Hacemos las requests para traer de a poco los followes
    do{ 
        //Ponemos un rate-limiting
        await sleep( service_constVars.MS_BTW_REQ );
        
        //Cuenta para hacer la request.
        req_account=AccountsManager.get_accountForReq();
        
        //Si ya no hay cuentas disponibles
        if (!req_account){
            return {error:DEF_API_ERRORS.SERVER("No available Accounts"),data:null};
        }

        //hacer la request
        let data={};
        
        try{
            data=await followers_igRequest(user_id,cursor,req_account.authData.cookies,
                                           req_account.proxyData);
        } 
        
        //Ver si tiro errror la req
        catch(error){
            let user_error=await error_handler(error,AccountsManager,req_account.key);
            
            return {error:user_error,data:null};
        }
        
        //Si no, vamos agregando los followers.
        
        followers={...followers,...data.followers};

        cursor=data.cursor;
        
        //Chequear limites de cant de requests.
        req_cont++;
        if (req_cont>= service_constVars.CANT_REQ ){
            break;
        }
    }
    
    //Mientras el cursor siga teniendo contenido(es decir q todavia falten por traer)
    while(cursor!="");

    return {error:null,data:{followers,cursor}};
}


module.exports={check_userExistence,get_userInfo,get_followers};