const dotenv=require("dotenv");
const {join}=require("path")

let env_absPath=join(__dirname,`../../.env.${process.env.APP_ENV}`);
dotenv.config({path:env_absPath});


const AWS_VARS={
    accessKeyId:process.env.AWS_ACCESS_KEYID,
    secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY,
    
    lambda_region:process.env.AWS_LAMBDA_REGION,
    lambda_name:process.env.AWS_LAMBDA_NAME
}

module.exports={AWS_VARS};