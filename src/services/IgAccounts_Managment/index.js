//
const {IgAccounts_Manager}=require("./accountsManager_class.js")


let IgAccountsManager;

//Funcion que debe llamarse al iniciar el server.
//instancia la clase para el manejo de las cuentas de IG.
function inititalize_IgAccountsManager(){
    IgAccountsManager=new IgAccounts_Manager();
}


//Provee la clase para que otros servicios la puedan usar ya instanciada.
function get_IgAccountsManager(){
     return IgAccountsManager;
}

inititalize_IgAccountsManager();

module.exports={inititalize_IgAccountsManager, get_IgAccountsManager};
