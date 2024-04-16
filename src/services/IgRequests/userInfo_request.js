//Aca irian las 2 requests que necesitamos para traer los followers

const fetch=require("node-fetch");
const {HttpsProxyAgent}=require("https-proxy-agent");

const {igRequest_errorHandler}=require("./error_handler.js");

//-------------------------- REQUEST DE USER INFO------------------------------------
const GEN_HEADERS={
    "accept": "*/*",
    "accept-language": "es-ES,es;q=0.9,en;q=0.8",
    "dpr": "1.25",
    "sec-ch-prefers-color-scheme": "dark",
    "sec-ch-ua": "\"Chromium\";v=\"118\", \"Google Chrome\";v=\"118\", \"Not=A?Brand\";v=\"99\"",
    "sec-ch-ua-full-version-list": "\"Chromium\";v=\"118.0.5993.70\", \"Google Chrome\";v=\"118.0.5993.70\", \"Not=A?Brand\";v=\"99.0.0.0\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-model": "\"\"",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-ch-ua-platform-version": "\"10.0.0\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36",
    "viewport-width": "883",
    "x-asbd-id": "129477",
    "x-csrftoken": "5DwuoOdCyAYGcUagOGSFQ4GFF2MDJ6pp",
    "x-ig-app-id": "936619743392459",
    "x-ig-www-claim": "hmac.AR3eCCGBUzr8zDNp3e3GgRImPDGr4m9EUyUBTIKOg9bGIXdB",
    "x-requested-with": "XMLHttpRequest",
    "Referrer-Policy": "strict-origin-when-cross-origin"
}


const BASE_URL="https://www.instagram.com/api/v1/users/web_profile_info/?username=";



//Return {user_info:{isPrivate,id}, error}
async function userInfo_igRequest(username,account_authCookies,account_authHeaders,proxyUrl){
    
    let URL=BASE_URL+username

    let headers={
        "cookie":account_authCookies,
        ...account_authHeaders,
        ...GEN_HEADERS
    }
    
    //Crear agente de proxy
    const proxyAgent=new HttpsProxyAgent(proxyUrl);

    let response,json_data;
    try{
        response=await fetch(URL,{
            "agent":proxyAgent,
            "headers":headers,
            "body":null,
            "method":"GET"
        })


        json_data=await response.json(); //handlear el error aca para ver q onda

        if (json_data.require_login){
            throw new Error("not auth")
        }
    }

    catch(e){
        //llamar al error handler o lo q sea
        igRequest_errorHandler(e);
    }

    let isPrivate=json_data.data.user.is_private;
    let id=json_data.data.user.id;
    let cant_followers=json_data.data.user.edge_followed_by.count;

    return {isPrivate:isPrivate, id:id, cant_followers:cant_followers};

}



module.exports={userInfo_igRequest};
