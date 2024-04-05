const session=require("express-session");

const {apiError_handler,DEF_API_ERRORS}=require("../../error_handling");

const {copy_prevSessionAttrs,day_diference}=require("./utils.js")

const MemStorage=new session.MemoryStore();

const SessionMiddleware=session({
    secret:"forrooo",
    store:MemStorage,
    
    genid:(req,res)=>{return get_combo_IpUserAgent(req,res)},

    saveUninitialized:false, //si no se modifico no se guarda nada
    resave:false, //no guardamos de nuevo si no hubo cambios
    cookie:{
      maxAge:1000 *60*60*24, //le damos 1 dia
      httpOnly:true}, //si se puede ver en el front
})


function authentication(req,res,next){
    
    let comboId=get_combo_IpUserAgent(req,res); //hacemos combo
   
    if (MemStorage.sessions[comboId]){ //verificamos que exista
       
      if (!req.session["createdDate"]){ //si no tiene ese campo quiere decir q se modifico o borro la cookie
                                 //y hay q linkear el obj de session actual, al que estaba guardado
         
         copy_prevSessionAttrs(req.session,JSON.parse(MemStorage.sessions[comboId]));

      }
    
    }
    
    else{ //Si no existe seteamos los datos default
       console.log("No existe")
       req.session["avail_mainReq"]=2;
       req.session["remain_foll"]=null;
       req.session["auth_follReq"]=null;
       req.session["createdDate"]=new Date();

    }

    next();

}


//Hacer combo para el id de la session
function get_combo_IpUserAgent(req,res){
   let ip=req.ip;
   let userAgent=req.get("User-Agent");

   if (!ip || !userAgent){
      apiError_handler(DEF_API_ERRORS.BAD_REQ(),res);return;
   }

   return ip+userAgent;
}


//Funcion para chequear las sessions expiradas
function check_expiredSessions(){
     let sessions=MemStorage.sessions;

     for (let id of Object.keys(sessions)){
         let data=JSON.parse(sessions[id]);
         let createdDate=data["createdDate"];

         let day_diff=day_diference(new Date(createdDate),new Date())
      
         if (day_diff>=1){ //si la dif es mayor a 1 dia, borrar la session
            console.log("Se destruye la session", id)
            MemStorage.destroy(id);
         }
     }

}



module.exports={
    SessionMiddleware,
    authentication,
    check_expiredSessions
}