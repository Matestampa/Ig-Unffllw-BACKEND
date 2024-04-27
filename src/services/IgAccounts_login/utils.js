function day_diference(date1,date2){
    let ms_diff=date1.getTime()-date2.getTime();
    
    return Math.abs(ms_diff / (1000*60*60*24));
}

//Toma un arr de cookies (con todas sus props expire,path,etc)
//Y devuelve un string que contiene solo los key=value de todas.
function clean_cookies(cookies_arr){
    let cleaned_cookies="";
    
    cookies_arr.forEach(cookie=>{
        let key_value="";
    
        for (let char of cookie){
            key_value+=char;
            if (char==";"){
                break;
            }
        }
        cleaned_cookies+=key_value+" "

    })
    return cleaned_cookies;
}

function get_cookiesExpireDate(maxAge_seconds){
    
    let now=new Date();

    let date=new Date(now.setSeconds(now.getSeconds()+maxAge_seconds));

    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`

}

module.exports={
    day_diference,
    clean_cookies,
    get_cookiesExpireDate,
}