const dotenv=require("dotenv");
const {join}=require("path")

let env_absPath=join(__dirname,`../../.env.${process.env.APP_ENV}`);
dotenv.config({path:env_absPath});


//Variables generales
const APP_GEN_VARS={
    main_mode:process.env.APP_ENV,
    alpha_mode:process.env.ALPHA_MODE,
    secure_mode:process.env.SECURE_MODE
}

console.log(APP_GEN_VARS);

//Variables de conexion
const APP_CONN_VARS={
    host:process.env.HOST,
    port:process.env.PORT,
}

//Variables de acceso
const APP_ACCESS_VARS={
    allow_requests:true,
    admin_pwd:process.env.ADMIN_PWD,
    exclusive_req_pwd:process.env.EXCL_REQ_PWD
}

function enable_requests(){
    APP_ACCESS_VARS.allow_requests=true;
}

function disable_requests(){
    APP_ACCESS_VARS.allow_requests=false;
}

module.exports={APP_GEN_VARS,APP_CONN_VARS,
               APP_ACCESS_VARS,
               enable_requests,disable_requests};