/*
Clase encargada de manejar el uso de las cuentas para las req, e
ir entregando las que esten disponibles cuando se solicite alguna.
*/
class IgAccountsUse_Manager{
    constructor(accounts_keys){
        this.accounts=[]; //arr con las keys
        this.accounts_data={}; //obj con las keys y su "data de uso"

        [this.accounts,this.accounts_data]=this.__initialize(accounts_keys);

        this.account_iterator=this.__iterator(this.accounts);

        this.NOAVAIL_DELAY=100; //ms de delay, para cuando la cuenta no esta disponible x
                                //tiempo y empieza a rotar para conseguir una.
        
    }

    __initialize(accounts_keys){
        //Esto deberia crear el obj con la data de las cuentas,
        //pero solo la data q tenga q ver con el uso.

        //ademas deberia crear el carrousel q usemos.
        //llenaer accounts_data y accounts
        accounts_keys.forEach(key=>{
            this.accounts.push(key);

            //Crear el obj si fuera necesario
            this.accounts_data[key]={last_time:undefined};
        })

        return [this.accounts,this.accounts_data];
    }
    
    //Return key de la cuenta.
    async get_availAccount(){
        let nextAcc;
        let nextAcc_data;
        let availAcc=false; 
        do{
           nextAcc=this.account_iterator.next();
           if (!nextAcc){return undefined};
           
           nextAcc_data=this.accounts_data[nextAcc];
           
           //Si ya existe
           if (nextAcc_data.last_time){
              
              //chequear los segundos
              if (is_availByTime(nextAcc_data.last_time)){
                 availAcc=true;
                 break
              }
              else{
                 console.log(`${nextAcc} is not avail by time`)
              }
           }
           else{
             break;
           }
           await sleep(this.NOAVAIL_DELAY);
        }
 
        while(availAcc==false)
        
        nextAcc_data["last_time"]=new Date();
        return nextAcc;
    }
    
    //
    enable_account(key){
        this.accounts.push(key);
        this.accounts_data[key]={last_time:undefined};
    }
    
    //saca accounts de las posibles avail, y return cuantas avail quedan
    disable_account(key){
        //Sacar la key de la cuenta del array.

        for (let i=0;i<this.accounts.length;i++){
            if (this.accounts[i]==key){
                this.accounts.splice(i,1);
                this.accounts_data[key]={};
                break;
            }
        }

        return this.accounts.length;

    }

    __iterator(accounts){
        let index=0;
        return{
            next:function(){
                if(index>=accounts.length){
                    index=0;
                }
                return accounts[index++];
            }
        }
    }
}

const SECONDS_SPACE=3;

function is_availByTime(last_time){
     
    if (get_diffInSeconds(last_time,new Date())>=SECONDS_SPACE){
        return true;
     }
     else{
        return false;
     }
}


function get_diffInSeconds(date1,date2){
    
    // Calcular la diferencia en milisegundos
    let diffInMilliseconds = Math.abs(date2 - date1);

    // Convertir la diferencia a segundos
    let diffInSeconds = Math.floor(diffInMilliseconds / 1000);

    return diffInSeconds;
}


module.exports={IgAccountsUse_Manager};