import React, { Fragment, useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom'
import ReactTooltip from "react-tooltip";
import { useNavigate } from 'react-router-dom';

// Want to do 
//   1.edit button
//   2. user sell history
//   3. user bookmarks

function Header({details, setdetails, accessFlag, setaccessFlag, setSelectedProduct}){
    const [mobile_menu, setMobile_menu_flag] = useState(false);
    const [searchItem, setSearchItem] = useState(null);

      // selected product

    let navigate = useNavigate();
    const Header_data = [  
        'Books',
         'Mobiles & Electronics',
          'For Rent : Houses & Apartments' , 
          'Events' , 
          'Household  Items' , 
          'Food Market'
        ]
    function displayMenu(){
        setMobile_menu_flag (!mobile_menu);  
    }

    function logout(){
        setaccessFlag(false);
        setdetails({
    'pwd': null,
    'Fname' : null,
    'LName' : null,
    'Email' : null,
    'university' : null
  });
  navigate('/Home');
    }
    function updateProduct(e){
       setSelectedProduct(e.target.name);
       navigate('/DisplayProducts');
    }

    function search(e){
        e.preventDefault()
        //console.log("the search is ", e)
        //console.log("the search item is ")
        setdetails(details => ({...details, searchItem : searchItem, searchFlag : true}));
        navigate('/DisplayProducts');
        //console.log("in header the details are ", details);
    }
    function showProfile(){ navigate('/Profile'); }
    return(
        <Fragment>
            <div className='logo_section'>
                <Link onClick={()=> {setSelectedProduct(null)}}  to = '/' className='logo link_to'> Campus Market </Link>
                <div className='search_container'>
                <form  className='search_section'>
                <input type="text" placeholder="Search for university ..." className='search_input'  onChange={(e) => {setSearchItem(e.target.value)}} />
                    <button type='submit' className='search_button' onClick={search}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='search_icon_svg'>
                        <path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 
                        166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128
                         128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z"/></svg>
                    </button>
                    
                </form>
                </div>
                <div className='login_section'>
                    {accessFlag && <div className='details_section'>
                        <span className='user_email'>Hello, {details.Email}</span>
                        <button className='Account_btn' onClick={showProfile} > Account  </button>
                        {/* <button className='Account_btn'  data-tip data-for="userdata_Tip" > Profile  </button> */}
                        {/* <ReactTooltip id="userdata_Tip" place="bottom" effect="solid">
                        <div> <span>First Name : </span> <span>{details.Fname}</span> </div>
                        <div> <span>Last Name: </span> <span>{details.LName}</span> </div>
                       <div> <span>Email :</span> <span>{details.Email}</span> </div>
                        <div> <span>University :</span> <span>{details.university}</span> </div>
                        </ReactTooltip> */}
                    </div>}
                    {!accessFlag && <button><Link 
                    className='link_to' 
                    to = '/SigninLogin' 
                    >Login</Link></button>}
                    {accessFlag && <button className='logout_btn' onClick={ logout} >Logout</button>}
                    <button><Link className='link_to' to = '/Sell' >Sell</Link></button>
                    <button onClick={displayMenu} className='mobile_menubar'>&#9776;</button>
                </div>
            </div>
                  <nav className={mobile_menu ? 'menubar_open' : 'menubar_close'}>
                     <ul className='nav_items'>
                     {Header_data.map(e => {
                          return(
                              <li key={e}>
                                  <button onClick={updateProduct} name= {e} className='link_to' >{e} </button>
                            </li>   
                          );
                     }
                        )}
                        </ul>
                 </nav>
                 
        </Fragment>
    )
};      

export default Header;