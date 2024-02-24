const {IgAccounts_LoginControl}=require("./loginControl_class.js");
const {get_IgAccountsManager}=require("../IgAccounts_Managment");

console.log(get_IgAccountsManager);

let AccountsLoginControl;

//Inicializar clase
function initialize_IgAccountsLoginControl(){
    
    //Traer la de AccountsManager
    let AccountsManager=get_IgAccountsManager();

    //Instanciar la clase pasandole el manager
    AccountsLoginControl=new IgAccounts_LoginControl(AccountsManager);
    
    //Aplicarle al manager esta clase
    AccountsManager.set_loginControl(AccountsLoginControl);
    return AccountsLoginControl;
}


//Funcion para el scheduler, para chequear la expiracion de las cuentas
async function check_accountsExpire(){
    await AccountsLoginControl.check_expire();
}

module.exports={initialize_IgAccountsLoginControl,check_accountsExpire};
