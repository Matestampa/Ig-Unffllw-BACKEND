const {APP_GEN_VARS}=require("../../config/app_config.js");


//Copiar valores del obj de la session anterior, al obj de ahora (para cuando borran la cookie)
function copy_prevSessionAttrs(emptySession, prevSession){
    emptySession["avail_mainReq"]=prevSession["avail_mainReq"];
    emptySession["remain_foll"]=prevSession["remain_foll"];
    emptySession["auth_follReq"]=prevSession["auth_follReq"];
    emptySession["usId_follReq"]=prevSession["usId_follReq"];
    emptySession["createdDate"]=prevSession["createdDate"];
}

function set_initialSessionAttrs(session){
    session["avail_mainReq"]=2;
    session["remain_foll"]=null;
    session["auth_follReq"]=null;
    session["createdDate"]=new Date();
}

//Hacer combo para el id de la session
function get_combo_IpUserAgent(req,res){
    let ip=get_ip(req);
    let userAgent=req.get("User-Agent");
 
    if (!ip || !userAgent){
       apiError_handler(DEF_API_ERRORS.BAD_REQ(),res);return;
    }
 
    return ip+userAgent;
}

//Obtener ip del header "forwarded" de la api gateway.
function get_ip(req){

    if (APP_GEN_VARS.main_mode!="PROD"){
        return req.ip;
    }
    else{
        let forwarded_header=req.headers["forwarded"];
        let origin_ip=forwarded_header.match(/for=([^;]*)/)[1];

        return origin_ip;
    }
    
}

module.exports={
    copy_prevSessionAttrs,
    set_initialSessionAttrs,
    get_combo_IpUserAgent
}
