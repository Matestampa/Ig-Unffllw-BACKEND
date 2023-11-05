/*const {inititalize_IgAccountsManager}=require("./src/services/IgAccounts_Managment");
const {getFollowers_service}=require("./src/services/Get_Followers");




async function dale(){
    let {followers,error}=await getFollowers_service()

    console.log(followers)
    console.log(error);
}


inititalize_IgAccountsManager();
dale();*/


//Probar si try-catch es async     |podemos usar el handler sin problema ya que es sync.
//Probar si se propagan los errroes  | si se propgan


const {DEF_API_ERRORS}=require("./src/error_handling");

throw DEF_API_ERRORS.BAD_REQ("putooo");