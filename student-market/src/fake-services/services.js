import { rented_houses, household_items, mobiles, books } from './services_data.js';
import {collection, getDocs, addDoc} from 'firebase/firestore';
import {db} from '../firebase-config.js';

const RESOLVE_TIMEOUT_MSEC = 1000;

 // connecting to the User database
 const userCollectionRef = collection(db, 'users');

// sessionStorage.setItem("users", JSON.stringify(initial_users) );

// let users = JSON.parse(sessionStorage.getItem("users"));

//getting user Data
const db_users_data = async () => {
   console.log("in async function");
const db_users = await getDocs(userCollectionRef);
   console.log("the db_users are :: ", db_users);
  return db_users.docs.map((doc)=> ({...doc.data()}))
}

export function signup_service(b) {
   let signIn_flag = 0;

   let resolve;
   let reject;

   const promise = new Promise( (res, rej) => { resolve = res; reject = rej; })
   db_users_data().catch((e)=> {reject({error:"Sorry not able to fetch the data"})})
   .then((users) => {
      console.log("the users are ::: ", users);

      users.find(function(e) {
         console.log("the values re in ", e.Email, b.Email)
       if(e.Email === b.Email){
          signIn_flag = signIn_flag + 1;
        }
        return signIn_flag;
     });
   });
setTimeout(() =>{
   if(signIn_flag === 0){
      const addUser = async ()=>{await addDoc(userCollectionRef, b);}
      addUser();
   //   sessionStorage.setItem("users", users );
      resolve("User added");
   }else{reject({error : "User already exsists"})}
},
RESOLVE_TIMEOUT_MSEC
);
return promise;
}

// checking login credentials 

export function login_service(b) {
   console.log("the value of b is ", b);
   let login_flag = 0;
   let resolve;
   let reject;
   const promise = new Promise( (res, rej) => {resolve = res; reject = rej});
   let user_data;
   db_users_data().catch((e)=> {reject({error: "Sorry not able to fetch data "})})
                  .then((data) => {
                     console.log( " the db data is ", data);
                     data.find(function(d){
                        console.log(" in find ", d.Email,b.email,d.pwd,b.pwd);
                        if(d.Email === b.email && d.pwd === b.pwd){
                           login_flag = login_flag + 1
                           if(login_flag === 1){user_data = d}
                        }
                        return login_flag;
                  })})
setTimeout(() => {
   if(login_flag === 0){ reject({error : "Invalid Credentials"})}
   else{
      resolve(user_data);
   }  
},RESOLVE_TIMEOUT_MSEC );
return promise;   
}

// getting the details

export function fetchPrdDetails(b){

   console.log("in fetch details service ", b);

   let resolve;
   let reject;

   const promise = new Promise( (res, rej) => {
    resolve = res;
    reject = rej
})

setTimeout(() => {
   console.log("the value of bbbb in set time out is ", b);
   switch (b) {
      case "For Rent : Houses & Apartments": resolve(rented_houses); break;
      case "Books": resolve(books); break;
      case "Household  Items": resolve(household_items) ; break;
      case "Mobiles & Electronics": resolve(mobiles); break;
      default: reject({error: " no data found"});
         break;
   }
},RESOLVE_TIMEOUT_MSEC );
return promise;
}