const dotenv=require("dotenv");
const {join}=require("path")

let env_absPath=join(__dirname,`../../.env.${process.env.APP_ENV}`)
dotenv.config({path:env_absPath});


const MAIL_VARS={
    user:process.env.MAIL_USER,
    password:process.env.MAIL_PASSWORD,
    
    destination_acc:process.env.MAIL_DESTINATION_ACC,
}

module.exports={MAIL_VARS};