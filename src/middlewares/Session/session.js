const session=require("express-session");
//const cookieParser=require("cookie-parser");


const MemStorage=new session.MemoryStore();

const SessionMiddleware=session({
    secret:"forrooo",
    store:MemStorage,
    
    genid:(req,res)=>{return get_combo_IpUserAgent(req,res)},

    saveUninitialized:false, //si no se modifico no se guarda nada
    resave:false, //no guardamos de nuevo si no hubo cambios
    cookie:{
      maxAge:1000 *60*60*24, //le damos 1 dia
      httpOnly:false}, //si se puede ver en el front
})


function authentication(req,res,next){
    
    let comboId=get_combo_IpUserAgent(req,res); //hacemos combo
   
    if (MemStorage.sessions[comboId]){ //verificamos que exista
       
      if (!req.session["u_id"]){ //si no tiene ese campo quiere decir q se modifico o borro la cookie
                                 //y hay q linkear el obj de session actual, al que estaba guardado
         
         //res.status(200).send("OK");
         //console.log("Borro o modifico la cookie");
         
         copy_prevSessionAttrs(req.session,JSON.parse(MemStorage.sessions[comboId]));

       }
    
    }
    
    else{ //Si no existe seteamos los datos default
       console.log("No existe")
       req.session["u_id"]=comboId; //lo dejamos marcado con algo, por lo de borrar la cookie
       req.session["avail_mainReq"]=2;
       req.session["avail_follReq"]=null;
       req.session["auth_follReq"]=null;
       req.session["createdDate"]=Date();

       //res.status(400).send("NO EXISTE. SE CREA LA SESSION");
    }

    next();

}


//Hacer combo para el ip de la session
function get_combo_IpUserAgent(req,res){
   let ip=req.ip;
   let userAgent=req.get("User-Agent");

   if (!ip || !userAgent){
      //DAR ERROR
   }

   return ip+userAgent;
}


//Copiar valores del obj de la session anterior, al obj de ahora (para cuando borran la cookie)
function copy_prevSessionAttrs(emptySession, prevSession){
   emptySession["u_id"]=prevSession["u_id"];
   emptySession["avail_mainReq"]=prevSession["avail_mainReq"];
   emptySession["avail_follReq"]=prevSession["avail_follReq"];
   emptySession["auth_follReq"]=prevSession["auth_follReq"];
   emptySession["createdDate"]=prevSession["createdDate"];
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


//Util function
function day_diference(date1,date2){
   let ms_diff=date1.getTime()-date2.getTime();
   
   return Math.abs(ms_diff / (1000*60*60*24));
}


module.exports={
    SessionMiddleware,
    authentication,
    check_expiredSessions
}