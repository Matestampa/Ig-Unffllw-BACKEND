
//Copiar valores del obj de la session anterior, al obj de ahora (para cuando borran la cookie)
function copy_prevSessionAttrs(emptySession, prevSession){
    emptySession["avail_mainReq"]=prevSession["avail_mainReq"];
    emptySession["remain_foll"]=prevSession["remain_foll"];
    emptySession["auth_follReq"]=prevSession["auth_follReq"];
    emptySession["usId_follReq"]=prevSession["usId_follReq"];
    emptySession["createdDate"]=prevSession["createdDate"];
}

module.exports={
    copy_prevSessionAttrs,
}
