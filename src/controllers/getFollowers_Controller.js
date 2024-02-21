//------------------- importar servicios --------------------------
const {get_userInfo,get_followers}=require("../services/Get_Followers");

//-------------------- importar parte de errors --------------------
const {apiError_handler,DEF_API_ERRORS}=require("../error_handling");


//GET "followers/user_info/:username"
async function user_info(req,res){
   let username=req.params.username;
   
   let {error,user_info}=get_userInfo(username);

   if (error){
      apiError_handler(error,res);
   }

   res.status(200).json({
      user_id:user_info.id,
   })



}

//GET "followers/nexts/"   body:{user_id, last_cursor}
async function next_followers(req,res){
    let {user_id,last_cursor}=req.body;
    
    
    let {error,followers}=get_followers(user_id,last_cursor);

    if (error){
      apiError_handler(error,res);
    }

    res.status(200).json({
      followers:followers
    });
}

module.exports={user_info,next_followers}