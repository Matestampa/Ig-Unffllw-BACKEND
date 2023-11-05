//Aca irian las 2 requests que necesitamos para traer los followers

const fetch=require("node-fetch");

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
    //"cookie": "csrftoken=5DwuoOdCyAYGcUagOGSFQ4GFF2MDJ6pp; rur=\"NCG\\05457045489311\\0541728800934:01f73d8329b6122979500563659cbbe19512eb80e27ce2456d8d108d509773b30401edea\"; ds_user_id=57045489311; sessionid=57045489311%3AViXa8Sxe6DXbLf%3A6%3AAYeiEM50jf0eQ9o-q-jp8iNaTTu8AVGLIDDW43XYMg;dpr=1.25; mid=ZSDkpwALAAEmG72iKKm10MwXYJEq; ig_did=AC513E2C-DCA4-48E6-B5E0-520266D0A4AA; ig_nrcb=1;datr=pOQgZYy-1iUojs7JTmk8c_Jz;shbid=\"11295\\0543407050365\\0541728190514:01f7945b98edb371cda80f24bc248bc9db7fb876645d3f781b751b6d2c21ffe18a34204b\"; shbts=\"1696654514\\0543407050365\\0541728190514:01f7feeaefc26212369dc803e95ee74bb28e666cf2680354149e863ec4e1a25d7d0b0f50\"",
    //"cookie":"csrftoken=QPFqBGmMz7JyPGhBRCrgBxU3Pj6JtvLQ; rur=\"NCG\\05457045489311\\0541729055325:01f7c08434a6a81787bd8c5e775a106657f2aa74abe4713f81dad2e064e4ad074679a214\"; ds_user_id=57045489311; sessionid=57045489311%3AKzSo9lC6qZyuec%3A23%3AAYf8a-1aAqj02IkNk7Bn0dLfAI5XC7uB4Y7CMxp-4g;",//dpr=1.25; mid=ZSDkpwALAAEmG72iKKm10MwXYJEq; ig_did=AC513E2C-DCA4-48E6-B5E0-520266D0A4AA; ig_nrcb=1;datr=pOQgZYy-1iUojs7JTmk8c_Jz;shbid=\"11295\\0543407050365\\0541728190514:01f7945b98edb371cda80f24bc248bc9db7fb876645d3f781b751b6d2c21ffe18a34204b\"; shbts=\"1696654514\\0543407050365\\0541728190514:01f7feeaefc26212369dc803e95ee74bb28e666cf2680354149e863ec4e1a25d7d0b0f50\"",
    //"Referer": "https://www.instagram.com/manugalarzaa/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
}


const BASE_URL="https://www.instagram.com/api/v1/users/web_profile_info/?username=";



//Return {user_info:{isPrivate,id}, error}
async function userInfo_igRequest(account_cookies,username){
    
    let URL=BASE_URL+username

    let headers={
        "cookie":account_cookies,
        ...GEN_HEADERS
    }
    
    let response,json_data;
    try{
        response=await fetch(URL,{
            "headers":headers,
            "body":null,
            "method":"GET"
        })


        json_data=await response.json(); //handlear el error aca para ver q onda*/

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

    return {user_info:{isPrivate:isPrivate,id:id}};

}



module.exports={userInfo_igRequest};
