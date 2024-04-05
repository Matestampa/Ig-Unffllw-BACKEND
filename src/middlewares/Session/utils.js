
//Copiar valores del obj de la session anterior, al obj de ahora (para cuando borran la cookie)
function copy_prevSessionAttrs(emptySession, prevSession){
    emptySession["u_id"]=prevSession["u_id"];
    emptySession["avail_mainReq"]=prevSession["avail_mainReq"];
    emptySession["remain_foll"]=prevSession["remain_foll"];
    emptySession["auth_follReq"]=prevSession["auth_follReq"];
    emptySession["createdDate"]=prevSession["createdDate"];
}


//Util function
function day_diference(date1,date2){
    let ms_diff=date1.getTime()-date2.getTime();
    
    return Math.abs(ms_diff / (1000*60*60*24));
}

module.exports={
    copy_prevSessionAttrs,
    day_diference
}
