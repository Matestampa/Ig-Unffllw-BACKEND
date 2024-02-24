const {IgAccounts_LoginControl}=require("./loginControl_class.js");
const {get_IgAccountsManager}=require("../IgAccounts_Managment");
const {sleep}=require("../Get_Followers/utils.js");

console.log(get_IgAccountsManager);

let AccountsLoginControl;


//Inicializar clase
function initialize_IgAccountsLoginControl(){
    
    //Traer la de AccountsManager
    let AccountsManager=get_IgAccountsManager();

    //Instanciar la clase pasandole el manager
    AccountsLoginControl=new IgAccounts_LoginControl(AccountsManager);
    
    
    /*check_accountsExpire=()=>{
        console.log(AccountsLoginControl);
        AccountsLoginControl.dale();
    }*/

    //Aplicarle al manager esta clase
    AccountsManager.set_loginControl(AccountsLoginControl);
    return AccountsLoginControl;

}

//Funcion para el scheduler, para chequear la expiracion de las cuentas
async function check_accountsExpire(){
    AccountsLoginControl.check_expire();
}

//Funcion para entregarle la funcion de arriba al scheduler
//(Sino la detecta como undefined)
function get_checkAccountsExpire_func(){
    return check_accountsExpire;
}

module.exports={initialize_IgAccountsLoginControl,get_checkAccountsExpire_func};
