import React, { Fragment, useEffect, useState } from 'react';
import './SignIn_login.css';
import Foot from '../Footer/Footer';
import HeadComponent from '../Header/Header';

import { useParams, useNavigate } from 'react-router-dom';


function SignIn_login({ details, setdetails, accessFlag, setaccessFlag, selectedProduct, setSelectedProduct }) {
    let navigate = useNavigate();
    const params = useParams();

    // setting value to open a modal
    const [pwdModal_flag, setPwdModal_flag] = useState(false);

    // @signIn defining the states:
    const [terms_check, set_terms_check] = useState(false);
    const [errorFlag, setErrorFlag] = useState({
        'signup_has_error' : false,
        'login_user_invalid' :false,
        'email_validation_error' : false,
        'pwd_updated' :false,
        'resetPwd_invalid_acc' : false
    });
    const [invalidLogin , setInvalidLogin] = useState(false);

    // this is to show signin UI on page load and when set true login UI will be shown.
    const [showLogin_Flag, set_showLogin_Flag] = useState(false);

    // UseEffect 
    

    // definng change i state function:
    function termscheck() { set_terms_check(true) }

    // @signIn validating the email 
    function validateEmail(e) {
        const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
        const result = pattern.test(e.target.value);
        if(result){ setErrorFlag({ 'email_validation_error': false });}
        else{ e.target.value = ''; setErrorFlag({ 'email_validation_error': true });} 
    }

    // @signIn async function : POST ( to add new user)

    async function addUser_post(e) {
        setErrorFlag({ 'signup_has_error': false });
        console.log("the e is ", e);
        const response = await fetch("http://localhost:1000/adduser",{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                pwd: e.target.password.value,
                Fname: e.target.fname.value,
                LName: e.target.lname.value,
                Email: e.target.email.value,
                university: e.target.university.value,
                userProducts : [],
                userBookmarks : []
            }),
          })

        if (!response.ok) {
            console.log(response)
        }
        else {
            const record = await response.json();
            if (record.userExist === true) {
                setErrorFlag({ 'signup_has_error': true });
            }
            else { 
                setErrorFlag({ 'signup_has_error': false });
                // user signed in, setting flag to show login ui
                set_showLogin_Flag(true);
             }
        }
    }

    // @siginIn :: on form submit setting up the state values
      function addUser(e) {
        e.preventDefault();

        // validating the email and setting up error
        if (!errorFlag.email_validation_error) {
        //     setdetails( {
        //         pwd: e.target.password.value,
        //         Fname: e.target.fname.value,
        //         LName: e.target.lname.value,
        //         Email: e.target.email.value,
        //         university: e.target.university.value
        // });
        // @remember : though we set the details here, putting console after that shows the previous values( it updates only when the page rerenders)
        // console.log("the details at time of setting",e.target.email.value, details);
            // calling the post reqest
           addUser_post(e); 
        } 
    }


    // @signIn defining UI for signIn section
    const siginIn_ui = < div className='sigin_section'>
        <div className='form_head'>
            <h1>Create account</h1>
            <h5>Already have a account ? <button className='button_as_link' onClick={() => { set_showLogin_Flag(true); }}>Login</button></h5>
        </div>
        <form onSubmit={addUser} >
            <label>First Name : <input required name='fname' className='fname'></input></label>
            <label>Last Name : <input required name='lname' className='lname'></input></label>
            <label>Email : <input required name='email' className='email' onBlur={validateEmail}></input></label>
            <label>University :<input required name='university' className='university'></input></label>
            <label>Password:<input required name='password' type='password' className='password'></input></label>
            <div className='terms_services_section'>
                <input
                    required value='TermsAndConditions'
                    type="checkbox" role="checkbox"
                    aria-checked={terms_check}
                    aria-labelledby='Terms_chk'
                    onClick={termscheck}
                >
                </input>
                <p id='Terms_chk' > I have read and agree to the <a href='#'>Terms of Service</a> </p>
            </div>
            <button className='signup_button' type='submit' >Sign Up</button>
        </form>
        {errorFlag.signup_has_error && <div className='error'> Account already exsists !! please Login </div>}
        {errorFlag.email_validation_error && <div className='error'>Invalid Email !!</div>}
    </div>
    
    
     //@login On login form submit : checking for credential matchng

    async function check_login_credentials(e){
        e.preventDefault();
        setErrorFlag({ 'signup_has_error': false });

        let email = e.target.login_email.value ;
        let pwd = e.target.login_pwd.value;

        const response = await fetch(`http://localhost:1000/checkLogin/${email}`)
        let record = await response.json();

        console.log("the logged in user records are ", record)

        if(record === null){setErrorFlag({'login_user_invalid' : true});}
        else{
            if(record.Email=== email && record.pwd === pwd){
                setdetails( {
                    pwd: record.pwd,
                    Fname: record.FName,
                    LName: record.LName,
                    Email: record.Email,
                    university: record.university
            });
                setaccessFlag(true);
                navigate('/Home');
                setInvalidLogin(false);
            }else{
                setInvalidLogin(true);
                e.target.login_pwd.value = ""
            }
  
           setErrorFlag({'login_user_invalid' : false});
        }
    }

    // @ reset password : making async call

    async function update_pwd(e){
        e.preventDefault()
        let email = e.target.reset_email.value;
        let pwd = e.target.reset_pwd.value;

        const response = await fetch("http://localhost:1000/resetPwd", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Email : email,
                pwd : pwd
            }),
          })
          if (!response.ok) {
            console.log(response)
        }
        else {
            const record = await response.json();
            if(record.output){
                setErrorFlag({'pwd_updated' : true, 'resetPwd_invalid_acc' : false });
                // setErrorFlag({'resetPwd_invalid_acc' : false});
            }
            else{
                setErrorFlag({'pwd_updated' : false, 'resetPwd_invalid_acc' : true});
                // setErrorFlag({'resetPwd_invalid_acc' : true});
            }
        }


    }


    //@ Inlogin Reset password : UI for the modal
    const pwdModal_ui = <div className='reset_pwd_modal'>
    <div className='modal_container'>
        <div className='modal_box'>
        <button className='close_button' onClick={() => setPwdModal_flag(false) }>X</button>
    <h1>Reset your Password</h1>
    <form className='reset_pwd_form' onSubmit={update_pwd} >
        <input required name='reset_email' placeholder='Enter Email' onBlur={validateEmail}></input>
        <input required name='reset_pwd' type="password" placeholder='Enter new Password'></input>
        <button type='submit'
            aria-label='reset password'
            className='resetBtn'
        >Reset password</button>
        {errorFlag.email_validation_error && <div className='error'>Invalid Email !!</div>}
        {errorFlag.pwd_updated && <div className='success'>Password updated sucessfully</div>}
        {errorFlag.resetPwd_invalid_acc && <div className='error'>Account do not exists. Please <button className='button_as_link' onClick={() => { set_showLogin_Flag(false); }} >Signup now</button> </div> }
    </form>
</div>
</div>
    </div>
    


    // @login defining UI for login section

    const login_ui = <div className='login_sec'>
        <h1 className='login_header'>Login</h1>
        <form onSubmit={check_login_credentials} >
            <input required name='login_email' placeholder='Enter Email' onBlur={validateEmail}></input>
            <input required name='login_pwd' type="password" placeholder='Enter Password'></input>
            <button className='forgotPWD' onClick={() => setPwdModal_flag(true)}>Forgot Password?</button>
            <button className='LoginBtn' type='submit'
                aria-label='login'
            >Login</button>
        </form>
        <p><span>Not a member  </span><button className='button_as_link' onClick={() => { set_showLogin_Flag(false); }} >Signup now</button></p>
        {invalidLogin && <div className='error'> Invalid credentials </div>}
        {errorFlag.email_validation_error && <div className='error'> Invalid Email </div>}
        {errorFlag.login_user_invalid && <div className='error'> Account do not exist please signup !!!</div>}
    </div>

    return (
        <Fragment>
            <header>
                <HeadComponent details={details}
                    setdetails={setdetails}
                    accessFlag={accessFlag}
                    setaccessFlag={setaccessFlag}
                    selectedProduct={selectedProduct}
                    setSelectedProduct={setSelectedProduct}
                />
            </header>
            <main>
            {pwdModal_flag && pwdModal_ui}
                <div className='signin_page'>
                    {!showLogin_Flag && siginIn_ui}
                    {!pwdModal_flag && showLogin_Flag && login_ui} 
                  
                </div>
            </main>
            <footer>
                <Foot />
            </footer>

        </Fragment>
    )
}

export default SignIn_login;