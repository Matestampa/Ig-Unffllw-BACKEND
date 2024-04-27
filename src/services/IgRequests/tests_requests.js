const fetch=require("node-fetch");

const {igRequest_errorHandler}=require("./error_handler.js");

const FAKEAPI_BASEURL="http://localhost:2000/"


//-------------------- USERINFO RESQUEST -------------------------
async function test_userInfo_igRequest(username){
      
    let URL=FAKEAPI_BASEURL+`FAKE_user_info/${username}`;

    let response,json_data;

    try{
        response=await fetch(URL,{
            "method":"GET"
        })

        json_data=await response.json();
        
        //Error de login
        if (json_data.require_login){
            throw new Error("not auth")
        }
        
        //Errro de baneo (lo generamos)
        if (json_data.bann_error){
            let err=new Error();
            err.type="invalid-json";
            throw err;
        }
        
        //Error unknown
        if (json_data.unknown_error){
            throw new Error();
        }
    }

    catch(e){
        igRequest_errorHandler(e);
    }
    
    let isPrivate=json_data.data.isPrivate;
    let id=json_data.data.user_id;
    let cant_followers=json_data.data.cant_followers;

    return {isPrivate:isPrivate, id:id, cant_followers:cant_followers};

    
  
}

//-------------------- FOLLOWERS RESQUEST -------------------------
async function test_followers_igRequest(user_id,cursor){
    
    if(!cursor){cursor=0};

    let URL=FAKEAPI_BASEURL+`FAKE_followers/${user_id}/${cursor}`;

    let response,json_data;

    try{
        response=await fetch(URL,{
            "method":"GET"
        })

        json_data=await response.json();
        
        //Error de login
        if (json_data.require_login){
            throw new Error("not auth")
        }

        //Errro de baneo (lo generamos)
        if (json_data.bann_error){
            let err=new Error();
            err.type="invalid-json";
            throw err;
        }
        
        //Error unknown
        if (json_data.unknown_error){
            throw new Error();
        }
    }

    catch(e){
        igRequest_errorHandler(e);
    }

    let next_cursor=json_data.data.next_cursor;
    let next_followers=json_data.data.next_followers;

    return {followers:next_followers,cursor:next_cursor};



}

//-------------------- LOGIN RESQUEST ----------------------------

async function test_login_igRequest(username,password){
    
    let URL=FAKEAPI_BASEURL+`FAKE_login/${username}/${password}`;
    
    let cookies;
    try{
        let response=await fetch(URL,{
            "method":"GET"
        })

        let json_data=await response.json();
        
        //Si tira error de login
        if (json_data.status=="fail"){
            throw new Error("bad login");
        }
        else{
            cookies=json_data.data;
        }
    }
    catch(e){
        igRequest_errorHandler(e);
    }
    
    return cookies;
}


const TEST_REQUESTS={
    userInfo:test_userInfo_igRequest,
    followers:test_followers_igRequest,
    login:test_login_igRequest
};

module.exports={
    TEST_REQUESTS
}