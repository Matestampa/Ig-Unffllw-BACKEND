const dotenv=require("dotenv");
const {join}=require("path")

let env_absPath=join(__dirname,`../../.env.${process.env.APP_ENV}`)
dotenv.config({path:env_absPath});


const REDIS_CONN_VARS={
    host:process.env.REDIS_HOST,
    port:process.env.REDIS_PORT,
    password:process.env.REDIS_PASSWORD,
};
module.exports={REDIS_CONN_VARS};