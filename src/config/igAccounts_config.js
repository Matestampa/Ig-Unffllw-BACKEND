const dotenv=require("dotenv");
const {join}=require("path")

let env_absPath=join(__dirname,`../../.env.${process.env.APP_ENV}`)
dotenv.config({path:env_absPath});


const IG_ACCOUNTS_VARS={
    accounts_file:process.env.IG_ACCOUNTS_FILE
}


module.exports={IG_ACCOUNTS_VARS};