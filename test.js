/*const {inititalize_IgAccountsManager}=require("./src/services/IgAccounts_Managment");
const {getFollowers_service}=require("./src/services/Get_Followers");




async function dale(){
    let {followers,error}=await getFollowers_service()

    console.log(followers)
    console.log(error);
}


inititalize_IgAccountsManager();
dale();*/


//Probar si try-catch es async     |podemos usar el handler sin problema ya que es sync con el await.
//Probar si se propagan los errroes  | si se propgan

/*function action(e){
    setTimeout(()=>{
        console.log("La action desencadenane putoo");
    },2000);
};

async function handler(e){
   action(e);
   throw new Error("ole ole ole");
}

async function level1(){
   try{
     throw new Error("Manu se la come");
   }
   catch(e){
     await handler(e);
     console.log("Listo");
   }
}

async function level0(){
    try{
        await level1();
        console.log("hola level 0");
    }
    catch(e){
        console.log(e);
        console.log("Retornamos el err en la response nashe");
    }
}

level0();*/

/*const nodemailer=require("nodemailer");

const transporter=nodemailer.createTransport({
    service:"gmail",
    host:"smtp.gmail.com",
    auth:{
        user:"smikeljordan@gmail.com",
        pass:"vpcu sbkf scrf yqoa"
    }
})

let messageData={
   from:{
    name:"IgUnfollowApp",
    address: "smikeljordan@gmail.com"
   },
   to:"paredpiso5@gmail.com",

   subject:"Prueba del mail en node",
   text:"hola desde nodeeeee",
}

async function dale(){
    await transporter.sendMail(messageData);
    console.log("Mail enviado");
}

dale();*/

class NormalError extends Error{
    constructor(message){
        super(message)
        this.name="NormalError"
        this.message=message;
    }
}

function dale(){
    try{
        throw new NormalError("putto");
    }

    catch(e){
        console.log(e.name);
    }
}


dale();


