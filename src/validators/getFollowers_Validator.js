const Joi = require('joi');

const {apiError_handler,DEF_API_ERRORS}=require("../error_handling");

const {APP_GEN_VARS}=require("../config/app_config");


const nextFoll_Schema=Joi.object({
    user_id: Joi.number().required(),
    last_cursor: Joi.required(),
});

function validate_nextFoll(req,res,next) {
    let { error } = nextFoll_Schema.validate(req.body);
    
    if (!APP_GEN_VARS.secure_mode){
        
        if (error) {
          apiError_handler(DEF_API_ERRORS.BAD_REQ("Wrong data"),res);return;
        } 
    } 

    next();
}


module.exports={validate_nextFoll};