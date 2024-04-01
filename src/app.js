const express=require("express");
const App=express();

//---------------------- importacion de middlewares ---------------------
const {entry_point}=require("./middlewares/entry_point.js");

//##### Session #####
const cookieParser=require("cookie-parser");
const {SessionMiddleware,authentication}=require("./middlewares/Session/session.js");

//----------------------- importacion de rutas ------------------------
const getFollowers_Routes=require("./routes/getFollowers_Routes.js");


//-------------------importacion para scheduled tasks ------------------
const cron=require("node-cron");
const {scheduledTasks_data}=require("./extra_services/scheduled_tasks.js");


//--------------------- importacion de utils de logica iniciales -------------
const {inititalize_IgAccountsManager}=require("./services/IgAccounts_Managment");
const {initialize_IgAccountsLoginControl}=require("./services/IgAccounts_login");



//-------------------- config general express ---------------------

App.use(express.json());
App.use(cookieParser());


App.use(SessionMiddleware);


//------------------- middlewares de entrada --------------------
//App.use(entry_point);
App.use(authentication);


//-------------------- ENDPOINTS ----------------------------

App.use("/followers",getFollowers_Routes);


/*------------ Activacion de scheduled tasks ------------------------
for (let task of scheduledTasks_data){
    cron.schedule(task.interval,task.callback);
}*/


//------------------ activar logica inicial ------------------------

inititalize_IgAccountsManager();
initialize_IgAccountsLoginControl();


module.exports={App};