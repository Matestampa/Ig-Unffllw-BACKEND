const express=require("express");
const App=express();

//---------------------- importacion de middlewares ---------------------
const {entry_point}=require("./middlewares");

//----------------------- importacion de rutas ------------------------
const getFollowers_Routes=require("./routes/getFollowers_Routes.js");

//--------------------- importacion de utils de logica iniciales -------------
const {inititalize_IgAccountsManager}=require("./services/IgAccounts_Managment");
const {initialize_IgAccountsLoginControl,
       check_accountsExpire}=require("./services/IgAccounts_login");
const { sleep } = require("./services/Get_Followers/utils.js");






//-------------------- config general express ---------------------

App.use(express.json());
App.use(entry_point);

//-------------------- ENDPOINTS ----------------------------

App.use("/followers",getFollowers_Routes);


//------------------ activar logica inicial ------------------------

inititalize_IgAccountsManager();
inititalize_IgAccountsManager();

/*async function test(){
    inititalize_IgAccountsManager();
    
    await sleep(2000);
    let loginControl=initialize_IgAccountsLoginControl();

    check_accountsExpire();

}

test();*/

module.exports={App};