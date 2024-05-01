
const {get_IgAccountsManager}=require("../services/IgAccounts_Managment");
const {enable_requests}=require("../config/app_config.js");

//-------------------- importar parte de errors --------------------
const {DEF_API_ERRORS,apiError_handler}=require("../error_handling");

//--------------------- middlewares -------------------------------------------
const {normal_response}=require("../middlewares/response.js");


//Traer toda la data de las cuentas.
async function get_accounts(req,res){
     
    //Traer accounts con el IgAccountsManager
    let AccountsManager=get_IgAccountsManager();
    
    let accounts=AccountsManager.get_allAccountsData();

    //Mandarlas en la resp
    normal_response(res,"",accounts)

}

//Guardar data de una cuenta. Por Agregar una nueva, o por activarla.
async function save_account(req,res){
    let {key,data,action}=req.body
    
    let resp_message="Account saved in PRODUCTION";

    let AccountsManager=get_IgAccountsManager();
    
    //Primero si o si guardar la data.
    AccountsManager.set_accountData(key,"ALL",data);

    //Si el cambio de data es para activar la cuenta, o simplemente q "active" sea "true",
    //(ya que puede ser la primera vez q se agrega cuenta):
    if (action=="enable" || data.active==true){
        
        AccountsManager.enable_account(key,true);//actualizamos interno de Account Manager tmb
                                                 //(para q la reconozca como activa en tiempo real y
                                                 //ya la pueda usar.)
        resp_message+=" & Account Enabled";
    }
    
    //Dar response de ok
    normal_response(res,resp_message)
}

//Volver a activar las requests a la App.
async function re_enable_requests(req,res){
    enable_requests();

    normal_response(res,"Requests enabled")
}

module.exports={get_accounts,save_account,re_enable_requests}