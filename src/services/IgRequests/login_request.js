const fetch=require("node-fetch");
const {HttpsProxyAgent}=require("https-proxy-agent");

const {igRequest_errorHandler,BadLoginIgAccount_Error}=require("./error_handler.js");

const GEN_HEADERS={
    "accept": "*/*",
    "accept-language": "es-ES,es;q=0.9,en;q=0.8",
    "content-type": "application/x-www-form-urlencoded",
    "dpr": "1.25",
    "sec-ch-prefers-color-scheme": "dark",
    "sec-ch-ua": "\"Google Chrome\";v=\"119\", \"Chromium\";v=\"119\", \"Not?A_Brand\";v=\"24\"",
    "sec-ch-ua-full-version-list": "\"Google Chrome\";v=\"119.0.6045.123\", \"Chromium\";v=\"119.0.6045.123\", \"Not?A_Brand\";v=\"24.0.0.0\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-model": "\"\"",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-ch-ua-platform-version": "\"10.0.0\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "viewport-width": "883",
    "x-asbd-id": "129477",
    //"x-csrftoken": "S1AxxwmK6vELI6wZYW9LOHqqgUED04qy",
    "x-ig-app-id": "936619743392459",
    //"x-ig-www-claim": "hmac.AR2JrhvB4_BR3rGd-1BJ25qqoiTnl4r1qREu-l1wIlA648sc", //este?
    //"x-instagram-ajax": "1009801970", //este?
    "x-requested-with": "XMLHttpRequest",
    //"cookie": "dpr=1.25; mid=ZS9YAAALAAEPQ9J4B5KogcXM2dV8; ig_did=FFB31CBE-2C82-4530-BB46-8ABCDD1DAA33; ig_nrcb=1; datr=_FcvZQD7cNcxWD1FnGfUbCTI; shbid=\"11295\\05457045489311\\0541730928166:01f765f0cb96a87bd1d948afc6f434687d7068f09e3283e67cc7389758f7db7329feacde\"; shbts=\"1699392166\\05457045489311\\0541730928166:01f74c78d0a61e2fe8f0e6f58036ff466d8ace2c87411e4951abf2c24edf077a1167c13f\"; rur=\"NCG\\05457045489311\\0541731102785:01f79aee4f70724d7f2f9eb9b1d5df2191acbe04d64997ed966d1bcb6349fbd0d1d5630c\"; csrftoken=S1AxxwmK6vELI6wZYW9LOHqqgUED04qy",
    "Referer": "https://www.instagram.com/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
};

const URL="https://www.instagram.com/api/v1/web/accounts/login/ajax/";


async function login_igRequest(username,password,login_cookies,login_headers,proxyUrl){
    
    let headers={
        "cookie":login_cookies,
        ...login_headers,
        ...GEN_HEADERS,
    }

    let body=`enc_password=%23PWD_INSTAGRAM_BROWSER%${password}&optIntoOneTap=false&queryParams=%7B%7D&trustedDeviceRecords=%7B%7D&username=${username}`;
    
    const proxyAgent=new HttpsProxyAgent(proxyUrl);
    
    let cookies;
    try{
        let response=await fetch(URL,{
            "agent":proxyAgent,
            "headers":headers,
            "body": body,
            "method":"POST"
        })

        //accedemos a primer symbol, que es el que tiene los headers
        let first_symbol=response[Object.getOwnPropertySymbols(response)[1]]
        
        //accedemos a otro symbol, dentro de la prop headers; y ese nos termina dando los headers
        let res_headers=first_symbol.headers[Object.getOwnPropertySymbols(first_symbol.headers)[0]]
        
        //y accedemos a las cookies con "set-cookie"
        cookies=res_headers['set-cookie']

        let data=await response.json();

        if (data.status=="fail"){
            throw new Error("bad login");
        }
    }
    catch(e){
        igRequest_errorHandler(e);
    }
    
    return cookies;
};

module.exports={login_igRequest};