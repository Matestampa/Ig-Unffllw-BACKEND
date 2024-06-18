const session=require("express-session");

const {apiError_handler,DEF_API_ERRORS}=require("../../error_handling");

const {redisStore,SessionStorageAccess}=require("./storage.js");

const {copy_prevSessionAttrs}=require("./utils.js")


const StorageAccess=new SessionStorageAccess(redisStore);

const SessionMiddleware=session({
    secret:"forrooo",
    store:redisStore,
    
    genid:(req,res)=>{return get_combo_IpUserAgent(req,res)},

    saveUninitialized:false, //si no se modifico no se guarda nada
    resave:false, //no guardamos de nuevo si no hubo cambios
    cookie:{
      sameSite:"none",
      secure:true,
      maxAge:1000 *60*60*24, //le damos 1 dia
      httpOnly:false}, //si se puede ver en el front
})


async function authentication(req,res,next){
    
   console.log(req.ip);
    
    let comboId=get_combo_IpUserAgent(req,res); //hacemos combo
    console.log(comboId);
   
    let prevSession=await StorageAccess.get(comboId)
    
    if (prevSession){ //revisar si ya existe la session con ese id.
       
      if (!req.session["createdDate"]){ //si no tiene ese campo quiere decir q se modifico o borro la cookie
                                 //y hay q linkear el obj de session actual, al que estaba guardado
         
         copy_prevSessionAttrs(req.session,prevSession);

      }
    
    }
    
    else{ //Si no existe seteamos los datos default
       console.log("No existe")
       req.session["avail_mainReq"]=2;
       req.session["remain_foll"]=null;
       req.session["auth_follReq"]=null;
       req.session["createdDate"]=new Date();

    }
    //res.status(200).send("Tu viejaaa");
    next();

}


//Hacer combo para el id de la session
function get_combo_IpUserAgent(req,res){
   let ip=get_ip(req);
   let userAgent=req.get("User-Agent");

   if (!ip || !userAgent){
      apiError_handler(DEF_API_ERRORS.BAD_REQ(),res);return;
   }

   return ip+userAgent;
}

function get_ip(req){
   let forwarded_header=req.headers["forwarded"];
   let origin_ip=forwarded_header.match(/for=([^;]*)/)[1];;

   return origin_ip;
}


module.exports={
    SessionMiddleware,
    authentication,
}