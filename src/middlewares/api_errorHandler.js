const API_ERRORS=Object.freeze({
        BAD_REQ: (descr)=>{return {type:"bad_request", status_code:400, descr:descr}},
        NOT_AUTH:(descr)=>{return {type:"not_authenticated", status_code:401, descr:descr}},
        NOT_FOUND:(descr)=>{return {type:"not found", status_code:404, descr:descr}},
        RETRY:(descr)=>{return {type:"retry request", status_code:503, descr:descr}},
        SERVER:(descr)=>{return {type:"server", status_code:500, descr:descr}},
        DB:(descr)=>{return {type:"db", tatus_code:500, descr:descr}},
});




function api_errorHandler(error){}





module.exports={API_ERRORS,api_errorHandler};