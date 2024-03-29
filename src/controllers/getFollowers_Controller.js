const {normal_response}=require("../middlewares/response.js");

//------------------- importar servicios --------------------------
const {get_userInfo,get_followers}=require("../services/Get_Followers");

//-------------------- importar parte de errors --------------------
const {apiError_handler,DEF_API_ERRORS}=require("../error_handling");


//GET "followers/user_info/:username"
async function user_info(req,res){
   let username=req.params.username;
   
   let {error,user_info}=await get_userInfo(username);

   if (error){
      apiError_handler(error,res);return;
   }
   
   normal_response(res,"",{
      user_id:user_info.id,
      cant_followers:user_info.cant_followers
   });




}

//GET "followers/nexts/"   body:{user_id, last_cursor}
async function next_followers(req,res){
    let {user_id,last_cursor}=req.body;
    
    
    let {error,data}=await get_followers(user_id,last_cursor);

    if (error){
      apiError_handler(error,res);return;
    }

    normal_response(res,"",{
      followers:data.followers,
      cursor:data.cursor
    });
}

module.exports={user_info,next_followers}