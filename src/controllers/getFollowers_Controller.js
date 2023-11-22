//------------------- importar servicios --------------------------
const {getFollowers_service}=require("../services/Get_Followers");

//-------------------- importar parte de errors --------------------
const {apiError_handler,DEF_API_ERRORS}=require("../error_handling");


//GET "followers/:username"
async function get_followers(req,res){
    let username=req.params.username;
    
    let followers;
    
    try{
       followers=await getFollowers_service(username);
       //throw DEF_API_ERRORS.BAD_REQ("tu viejaaaa")
       res.status(200).json({status:200,data:{followers:followers}});
    }
    
    catch(e){
       apiError_handler(e,res);
    }
}

module.exports={get_followers}