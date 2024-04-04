const fetch=require("node-fetch");

const FAKEAPI_BASEURL="http://localhost:2000/"

async function test_userInfo_igRequest(username){
      
    let URL=FAKEAPI_BASEURL+`FAKE_user_info/${username}`;

    let response,json_data;

    try{
        response=await fetch(URL,{
            "method":"GET"
        })

        json_data=await response.json();
    }

    catch(e){
        throw e;
    }
    
    let isPrivate=json_data.data.isPrivate;
    let id=json_data.data.user_id;
    let cant_followers=json_data.data.cant_followers;

    return {isPrivate:isPrivate, id:id, cant_followers:cant_followers};

    
  
}

async function test_followers_igRequest(user_id,cursor){
    
    if(!cursor){cursor=0};

    let URL=FAKEAPI_BASEURL+`FAKE_followers/${user_id}/${cursor}`;

    let response,json_data;

    try{
        response=await fetch(URL,{
            "method":"GET"
        })

        json_data=await response.json();
    }

    catch(e){
        throw e;
    }

    let next_cursor=json_data.data.next_cursor;
    let next_followers=json_data.data.next_followers;

    return {followers:next_followers,cursor:next_cursor};



}

async function test_auth_igRequest(){
     return;
}


const TEST_REQUESTS={
    userInfo:test_userInfo_igRequest,
    followers:test_followers_igRequest,
    auth:test_auth_igRequest
};

module.exports={
    TEST_REQUESTS
}