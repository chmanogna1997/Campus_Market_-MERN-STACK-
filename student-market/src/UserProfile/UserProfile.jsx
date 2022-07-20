import './UserProfile.css';
import React, { Fragment, useState, useEffect } from 'react';
import Foot from '../Footer/Footer';
import HeadComponent from '../Header/Header';



function UserProfile({ details, setdetails, accessFlag, setaccessFlag, selectedProduct, setSelectedProduct }) {

    const [userBookmarks, setUserBookmarks] = useState([]);
    const [userSellPrds, setUserSellPrds] = useState([]);
    const [recordDeleted, setRecordDeleted] = useState(false)
    const [resetPwd, setResetPwd] = useState(true)

    // useeffect to get bookmarks of products
    useEffect(() => {
        // console.log("in use effect")
        async function fetchbookmarks() {
            let url = `http://localhost:1000/bookmarks_prds/${details.Email}`
            let response = await fetch(url);
            let records = await response.json();
            setUserBookmarks(records);
        }
        if (details.Email !== null) { fetchbookmarks(); }
    },
        [details, setRecordDeleted, recordDeleted ]
    )

    useEffect(() => {
        async function fetchSellProducts() {
            // console.log("in getting sell products of the user");
            let url = `http://localhost:1000/user_sellprds/${details.Email}`
            let response = await fetch(url);
            let records = await response.json();
            setUserSellPrds(records);
            // console.log("the user sell product results are ", records);
        }
        if (details.Email !== null) { fetchSellProducts(); }
    },
        [details, setRecordDeleted, recordDeleted]
    )
    // deleteUserSellPrd

    async function deleteUserSellPrd(id, category) {
    //   console.log("the is is to delete", id, category)
      let url = `http://localhost:1000/delete_user_sellprds/${id}/${category}/${details.Email}`;
      let response = await fetch(url);
      let records = await response.json();

      console.log("the records deleted ", records)
      
      if(records.acknowledged && records.deletedCount === 1){  setRecordDeleted(true); }
      else{ setRecordDeleted(false); }
    }

    async function resetPwdfunc(){
        console.log("in reset pwd function");
        setResetPwd(true);
    }

    return (
        <Fragment>
            {/* {console.log("Boom la la la la ", details)} */}
            {/* {console.log("bookmarks are ", userBookmarks)} */}
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
                <div className='dialog_box_section' >
                    {resetPwd && 
                    <div className='dialog_box'>
                       <form>

                           <label className='dialog_resetpwd_label'>Old Password : <input required name='OldPwd'></input></label>
                           <label className='dialog_resetpwd_label' >New Password : <input required name='NewPwd'></input></label>
                           <button  type='submit' className='dialog_resetpwd_btn' >Reset Password</button>
                       </form>
                    </div>
                    }
                
               {/* { !resetPwd && */}
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
                            <div className='add_edit'>
                            <button className="resetPwd_btn" onClick={()=> resetPwdfunc()}>  Reset Password </button>
                            </div>
                        </div>
                        <div className='bookmarks'>
                            <div className='heading'>  <h3>Bookmarks</h3> </div>
                            {userBookmarks.map(e => {
                                var E = e[0];
                                if(E !== undefined ){
                                // console.log("the e is ", e[0]);
                                // console.log("the e is ", e[0], e[0]._id);
                                var price = (Number(E.sellPrdPrice)).toLocaleString(undefined, { maximumFractionDigits: 2 });
                                var price_whole_num; var price_decimal_num;

                                if (price.indexOf(".") !== -1) {
                                    price_whole_num = price.substring(0, (price.indexOf(".") - 1))
                                    // console.log("checking the index ", price.indexOf("."));
                                    price_decimal_num = (price.substring(price.indexOf(".") + 1, price.length));
                                } else {
                                    price_whole_num = price;
                                    price_decimal_num = ""
                                }
                                return (
                                   <Fragment>
                                    { E !== undefined && <div className='bookmark_prds_section' >
                                        <div className='bookmark_prds'>
                                            <div> <img src={E.imageFile[0]} alt={e.sellPrdName} className="bookmark_image"></img> </div>
                                            <div className='bookmark_prd_desc'>
                                                <div> 
                                                    {/* <span className='bookmarks_headings'> Books : </span>  */}
                                                    <a className='bookmark_heading_result' href='#'>  {E.sellPrdName} </a> </div>
                                                <div>
                                                    <span className='bookmarks_headings' >Price : </span>
                                                    <span className='bookmark_price_result'>
                                                        <span className='price_symbol'> $ </span>
                                                        <span className='price_whole_num'>{price_whole_num}</span>
                                                        <span className='price_decimal'>{price_decimal_num}</span>
                                                    </span>
                                                </div>
                                                <div> <span className='bookmarks_headings' >University : </span> <span className='bookmark_university_result'> {E.university} </span> </div>
                                                <div> <span className='bookmarks_headings' >Email : </span> <span className='bookmark_email_result'> {E.Email}  </span></div>
                                            </div>
                                        </div>
                                    </div> 
                                    }
                                    </Fragment>
                                    
                                );
                            }
                            })
                            }
                        </div>
                        <div className='sell_history'>
                            <div className='heading'><h3> Sell History </h3></div>
                            {/* {console.log("the user prds are ", userSellPrds)} */}
                            {userSellPrds.map(e => {
                                var E = e[0];
                            //   console.log("in usersell prds ", E);
                                if( E !== undefined){
                                var price = (Number(E.sellPrdPrice)).toLocaleString(undefined, { maximumFractionDigits: 2 });
                                var price_whole_num; var price_decimal_num;
                                if (price.indexOf(".") !== -1) {
                                    price_whole_num = price.substring(0, (price.indexOf(".") - 1));
                                    // console.log("checking the index ", price.indexOf("."));
                                    price_decimal_num = (price.substring(price.indexOf(".") + 1, price.length));
                                } else { price_whole_num = price; price_decimal_num = "" }
                                return (
                                    <Fragment>
                                     < div className='user_prds_section'>
                                        <div className='usersellPrds_img'> <img src={E.imageFile[0]} alt={e.sellPrdName} className="bookmark_image"></img> </div>
                                        <div className='UsersellPrds_details'>
                                            <div> <span className='bookmarks_headings'> Books : </span> <a className='bookmark_heading_result' href='#'>  {E.sellPrdName} </a> </div>   
                                            <div>
                                                <span className='bookmarks_headings' >Price : </span>
                                                <span className='bookmark_price_result'>
                                                    <span className='price_symbol'> $ </span>
                                                    <span className='price_whole_num'>{price_whole_num}</span>
                                                    <span className='price_decimal'>{price_decimal_num}</span>
                                                </span>
                                            </div>
                                            <div> <span className='bookmarks_headings' >University : </span> <span className='bookmark_university_result'> {E.university} </span> </div>
                                            <div> <span className='bookmarks_headings' >Email : </span> <span className='bookmark_email_result'> {E.Email}  </span></div>
                                        </div>
                                        <div className='userSellPrds_add_edit'> <button className="edit_btn">  <i className="fa-solid fa-pencil  "></i> </button>
                                        </div>
                                        <div className='userSellPrds_btn'> <button onClick={() => deleteUserSellPrd(E._id, E.sellPrdCategory)}>Delete</button></div>
                                    </div>
                                    </Fragment>
                                )
                                }
                            })
                            }
                        </div>
                    </div>
                </div>

                {/* } */}

                </div>
            </main>
            <footer>
                <Foot />
            </footer>
        </Fragment>
    )
}

export default UserProfile;