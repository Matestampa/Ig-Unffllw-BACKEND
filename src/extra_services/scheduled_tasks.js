const {get_checkAccountsExpire_func}=require("../services/IgAccounts_login");
const {check_expiredSessions}=require("../middlewares/Session/session.js")

//console.log(get_checkAccountsExpire_func());
const scheduledTasks_data=[
    /*{
        "interval":" * 20 * * *",
        "callback":get_checkAccountsExpire_func()
    },*/
    
    /*{
        "interval":"*(/10 * * * * *", //cada 10 sec (sacar el "(" )
        "callback":check_expiredSessions,
    }*/
]

module.exports={scheduledTasks_data};