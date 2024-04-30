
const {get_IgAccountsManager}=require("../services/IgAccounts_Managment");
const {enable_requests}=require("../config/app_config.js");

//-------------------- importar parte de errors --------------------
const {DEF_API_ERRORS,apiError_handler}=require("../error_handling");

//--------------------- middlewares -------------------------------------------
const {normal_response}=require("../middlewares/response.js");

async function get_accounts(req,res){
     
    //traer accounts con el IgAccountsManager
    let AccountsManager=get_IgAccountsManager();
    
    let accounts=AccountsManager.get_allAccountsData();

    //Mandarlas en la resp
    normal_response(res,"",accounts)

}


async function save_account(req,res){
    let {key,data}=req.body

    //Guardar data con el IgAccountsManger
    let AccountsManager=get_IgAccountsManager();

    AccountsManager.set_accountData(key,"ALL",data);

    //Dar response de ok
    normal_response(res,"Account saved in PRODUCTION")

}

async function enable_account(req,res){
    let {key}=req.body;
    let AccountsManager=get_IgAccountsManager();

    AccountsManager.enable_account(key);
    
    normal_response(res,"Account active again");
}


async function re_enable_requests(req,res){
    enable_requests();

    normal_response(res,"Requests enabled")
}

module.exports={get_accounts,save_account,enable_account,re_enable_requests}