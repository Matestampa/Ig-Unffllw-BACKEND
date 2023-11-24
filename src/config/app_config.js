const CONFIG_VARS={
    allow_requests:true
}

function disable_requests(){
    CONFIG_VARS.allow_requests=false;
}

module.exports={CONFIG_VARS,disable_requests};