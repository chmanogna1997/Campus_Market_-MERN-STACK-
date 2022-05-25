import './UserProfile.css';
import React, { Fragment }  from 'react';

function UserProfile({details, setdetails}){
return(
    <Fragment>
     <div className='user_profile_section'>
         <div className='profile_section'>
         <div className='account'>
         <div className='details'>
         <h3>Manage your profile</h3>
         <div> <span>First Name : </span> <span className='fName'>{details.Fname}</span> </div>
         <div> <span>Last Name : </span> <span className='lName'>{details.LName}</span> </div>
         <div> <span>Email :</span> <span className='email'>{details.Email}</span> </div>
         <div> <span>University :</span> <span className='university'>{details.university}</span> </div>
         </div>
         <div className='ad_edit'>
         <i class="fa-solid fa-pencil"></i>
         </div>
         </div>
         <div className='bookmarks'>
             <h3>Bookmarks</h3>
         </div>
         <div className='sell_history'>
             <h3> Sell History </h3>
         </div>
         <div className='buy_history'>
             <h3> Buy History</h3>
         </div>
         </div>
     </div>
      
    </Fragment>
)
}

export default UserProfile;