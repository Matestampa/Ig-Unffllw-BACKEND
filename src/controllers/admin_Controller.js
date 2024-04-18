
const {get_IgAccountsManager}=require("../services/IgAccounts_Managment");

//-------------------- importar parte de errors --------------------
const {DEF_API_ERRORS,apiError_handler}=require("../error_handling");


async function get_accounts(req,res){
     
    //traer accounts con el IgAccountsManager
    let AccountsManager=get_IgAccountsManager();
    
    //let accounts=//AccountsManager.algo...()

    //Mandarlas en la resp
}


async function save_account(req,res){
    let {key,data}=req.body

    //Guardar data con el IgAccountsManger
    let AccountsManager=get_IgAccountsManager();

    //await AccountsManager.algo...()

    //Dar response de ok

}