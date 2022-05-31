import React, { Fragment, useEffect, useState } from 'react';
import './SignIn_login.css';
import Foot from '../Footer/Footer';
import HeadComponent from '../Header/Header';
import {signup_service, login_service} from '../fake-services/services'
import { useNavigate } from 'react-router-dom';
import {initial_users} from '../fake-services/services_data';
import {collection, getDocs, addDoc} from 'firebase/firestore';
import {db} from '../firebase-config';


// Want to do

// 1. add validations to email, input elememts
// 2. on signup send an email
// 3.forgot password ==> function for this



function SignIn_login({details, setdetails, accessFlag, setaccessFlag, selectedProduct, setSelectedProduct}){

    let navigate = useNavigate();

     // connecting to the database
    const userCollectionRef = collection(db, 'users');

    const [loginFlag, setloginFlag] = useState(false);
    const [errorFlag, setErrorFlag] = useState({
        'signup_has_error' : false,
        'login_has_error' : false,
        'email_validation_error' : false
    });
    const [SigninFlag, setSigninFlag] = useState({
        'terms_check' : false,
    });
    const [userdata,setUserdata] = useState(initial_users)

function  termscheck() {
    setSigninFlag({'terms_check' : true}); 
}
function  validateEmail(email){
    const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
    const result = pattern.test(email);
    return result;
  }
function signup(e){
   
    e.preventDefault();
    if( validateEmail(e.target.email.value)){
        setErrorFlag({ 'email_validation_error' : false});
    setdetails( {
   'pwd': e.target.password.value,
   'Fname' : e.target.fname.value,
   'LName' : e.target.lname.value,
   'Email' : e.target.email.value,
   'university' :e.target.university.value
 } );

}else{
setErrorFlag({ 'email_validation_error' : true});
}
 }

 useEffect(() => {
if(details.Email !== null && !loginFlag){
    signup_service(details)
    .then(output => {
        setloginFlag(true);
        setUserdata(output);
        setErrorFlag({'signup_has_error' : false});
    })
    .catch(error => {
        setErrorFlag({'signup_has_error' : true});
    })
}
},
  [details, setdetails, loginFlag, userdata]
  );


// ********   code for checking user has given correct login credentials *****************

const [login_details, setlogin_details] = useState(
    {
  'email' : null,
  'pwd': null,
  'has_error':false
});

function check_login_credentials(e){
    e.preventDefault();
    setlogin_details(
        {
            'email' : e.target.login_email.value ,
            'pwd': e.target.login_pwd.value ,
       }
    )
}

useEffect(() => {
    if(login_details.email !== null && login_details.pwd !== null && loginFlag){
    login_service(login_details)
    .then((output) => {
        setdetails({
    'pwd': output.pwd,
    'Fname' : output.Fname,
    'LName' : output.LName,
    'Email' : output.Email,
    'university' : output.university
        });
        setaccessFlag(true);
        navigate('/Home');
        setErrorFlag({'login_has_error' : false});
    })
    .catch((error) => {       
        setErrorFlag({'login_has_error' : true});
    })  
    }
},
[login_details,setlogin_details]
);
    return( 
        <Fragment>
            {/* {selectedProduct(null)} */}
        <header>
        <HeadComponent details = {details}
                               setdetails = {setdetails}
                               accessFlag = {accessFlag}
                               setaccessFlag = {setaccessFlag}
                               selectedProduct = {selectedProduct}
                               setSelectedProduct = {setSelectedProduct}
                               />
        </header>
        <main>
              <div className=  'signin_page'  >
              {  !loginFlag &&  < div className='sigin_section'>
                    <div className='form_head'>
                    <h1>Create account</h1>
                   <h5>Already have a account ? <button className='button_as_link' onClick={()=> { setloginFlag(true);}}>Login</button></h5>
                    </div>  
                {/* <form action='/' method='POST'>   */}
                <form onSubmit={signup} >  
                <label>First Name : <input required name='fname' className='fname'></input></label>
                <label>Last Name : <input required name='lname' className='lname'></input></label>
                <label>Email : <input required name='email' className='email'></input></label>
                <label>University :<input required name='university' className='university'></input></label>
                <label>Password:<input required name='password' type='password' className='password'></input></label>
                <div className='terms_services_section'>
               <input  
                  required value ='TermsAndConditions' 
                  type="checkbox" role="checkbox" 
                  aria-checked= {SigninFlag.terms_check} 
                  aria-labelledby= 'Terms_chk'
                  onClick={termscheck}
                  >
                  </input>
               <p id = 'Terms_chk' > I have read and agree to the <a href='#'>Terms of Service</a> </p>
               </div>
                <button className='signup_button' type='submit' >Sign Up</button>
                </form>
                {errorFlag.signup_has_error && <div className='error'> Account already exsists !! please Login </div>}
                {errorFlag.email_validation_error && <div className='error'>Invalid Email !!</div>}
                </div> }

                { loginFlag && <div className='login_sec'>
                    <h1 className='login_header'>Login</h1>
                <form onSubmit={check_login_credentials} >
                     <input required name = 'login_email' placeholder='Enter Email'></input>
                     <input required name = 'login_pwd' type = "password" placeholder='Enter Password'></input>
                    <a  className='forgotPWD' href='#'>Forgot Password?</a>
                    <button className='LoginBtn' type='submit'
                    aria-label='login'
                    >Login</button>
                </form>
                 <p><span>Not a member  </span><button className='button_as_link' onClick={()=> { setloginFlag(false);}} >Signup now</button></p>
                 {errorFlag.login_has_error && <div className='error'> Invalid credentials </div>}
                </div>
                }
                
            </div>
            {/* {selectedProduct !== null &&
                     <DisplayProducts
                     selectedProduct = {selectedProduct}
                     setSelectedProduct = {setSelectedProduct}
                      />
        }   */}
            </main>
        <footer>
            <Foot />
        </footer>
        </Fragment>
        
    )
};

export default SignIn_login;
