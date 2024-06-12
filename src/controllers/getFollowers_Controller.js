const uuid=require("uuid");

//--------------------- middlewares -------------------------------------------
const {normal_response}=require("../middlewares/response.js");

//------------------- importar servicios --------------------------
const {check_userExistence,get_userInfo,
       get_followers}=require("../services/Get_Followers");

//-------------------- importar parte de errors --------------------
const {apiError_handler,FOLLOWERS_ERRORS}=require("../error_handling");



//GET "followers/user_info/:username"  params:{username}
async function user_info(req,res){
   
   if (req.session["avail_mainReq"]<=0){
      apiError_handler(FOLLOWERS_ERRORS.NOMORE_REQ(),res);return;

   }

   let username=req.params.username;

   let error;
   
   //Chequear primero si existe
   ({error}=await check_userExistence(username));
   
   //Si no tirar error.
   if (error){apiError_handler(error,res);return;}
   
   //Luego traer info
   ({error,user_info}=await get_userInfo(username));

   if (error){
      apiError_handler(error,res);return;
   }
   

   //Disminuir las mainRequests
   req.session["avail_mainReq"]-=1;

   //Setear remain followers
   req.session["remain_foll"]=user_info.cant_followers

   //Setear el token en la cookie y la session, para hacer las req a followers
   let authToken=uuid.v4();

   res.cookie("auth_follReq",authToken,{
      secure:true,
      sameSite:"none"
   });
   req.session["auth_follReq"]=authToken;
   
   //Setear en la session el user_id, del que deben traerse los followers
   req.session["usId_follReq"]=user_info.id;
   
   //Dar response
   normal_response(res,"",{
      user_id:user_info.id,
      cant_followers:user_info.cant_followers
   });


}

//POST "followers/nexts/"   body:{user_id, last_cursor}
async function next_followers(req,res){
    let {user_id,last_cursor}=req.body;
    
    console.log(last_cursor);

    //Control de session, para verificar token, y para no pasar limites
    if (req.session["auth_follReq"]!=req.cookies["auth_follReq"]  
       || req.session["remain_foll"]<=0 || req.session["usId_follReq"] != user_id){
      
      apiError_handler(FOLLOWERS_ERRORS.NOMORE_REQ(),res); return;
    }
    
    
    let {error,data}=await get_followers(user_id,last_cursor);

    if (error){
      apiError_handler(error,res);return;
    }
    
    //Disminuir en la session cant de followers restantes por traer
    req.session["remain_foll"]-=Object.keys(data.followers).length;
    
    //Dar response
    normal_response(res,"",{
      followers:data.followers,
      cursor:data.cursor
    });

}

module.exports={user_info,next_followers}