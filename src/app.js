const express=require("express");
const App=express();

//---------------------- importacion de middlewares ---------------------
const {entry_point}=require("./middlewares");

//----------------------- importacion de rutas ------------------------
const getFollowers_Routes=require("./routes/getFollowers_Routes.js");

//--------------------- importacion de utils de logica iniciales -------------
const {inititalize_IgAccountsManager}=require("./services/IgAccounts_Managment");






//-------------------- config general express ---------------------

App.use(express.json());
App.use(entry_point);

//-------------------- ENDPOINTS ----------------------------

App.use("/followers",getFollowers_Routes);


//------------------ activar logica inicial ------------------------

inititalize_IgAccountsManager();


module.exports={App};