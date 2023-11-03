/*const {inititalize_IgAccountsManager}=require("./src/services/IgAccounts_Managment");
const {getFollowers_service}=require("./src/services/Get_Followers");




async function dale(){
    let {followers,error}=await getFollowers_service()

    console.log(followers)
    console.log(error);
}


inititalize_IgAccountsManager();
dale();*/


class InternalError extends Error{
    constructor(message,attachedError){
      super(message);
      this.message=message;
      this.attachedError=attachedError;
      this.critic;
    }
}

class BannedAccountError extends InternalError{
  constructor(message,attachedError){
    super(message,attachedError);
    this.critic=false;
  }
}


class Error4User extends Error{
    constructor(message,data){
      super(message);
      this.message=message;
      this.data=data;
      this.default_message;
      this.status_code;
    }
}


/*try{
  throw new BannedAccountError()
}
catch(e){
  e.message="la cuenta baneada es la de tu vieja"
  console.log(e);
}

//throw new Error4User();*/

const {dirname}=require("path");

console.log(__filename+"hola");

