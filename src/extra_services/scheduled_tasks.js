const {get_checkAccountsExpire_func}=require("../services/IgAccounts_login");

//console.log(get_checkAccountsExpire_func());
const scheduledTasks_data=[
    /*{
        "interval":" * 20 * * *",
        "callback":get_checkAccountsExpire_func()
    },*/
    
]

module.exports={scheduledTasks_data};