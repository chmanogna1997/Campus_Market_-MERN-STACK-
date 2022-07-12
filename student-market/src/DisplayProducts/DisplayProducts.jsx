import React, { Fragment, useState, useEffect } from 'react';
import './DisplayProducts.css';
import { fetchPrdDetails } from '../fake-services/services';
import Spinner from '../Spinner/Spinner'
import HeadComponent from '../Header/Header';
import Foot from '../Footer/Footer';
import { useNavigate } from 'react-router-dom';
import { async } from '@firebase/util';



function DisplayProducts({details, setdetails, accessFlag, setaccessFlag,selectedProduct,setSelectedProduct}){

    const[productDetails, setproductDetails] = useState(null);

    const [errorFlag, setErrorFlag] = useState(false);
    //const [bookmarkFlag, setBookmarkFlag] = useState(null);

    const [bookmarks, setBookmarks] = useState([]);

    let navigate = useNavigate();
   

    function likeFlag(e){
        // console.log("in bookmarks flag", e)
        if(details.Email === null){
            navigate('/SigninLogin');
        }else{
            // console.log("in else");
            if(bookmarks.includes(e._id)){  
                // console.log("in removing items")
                setBookmarks(bookmarks.filter(item => item !== e._id))
                }
            else{ 
                // console.log("In elese of bookmarks flag")
                setBookmarks(arr => [...arr,e._id]); 
        }   
        }
        
        setdetails(details => ({
            ...details, bookmarks
        }))
    }

    // useffect to make a async call : conditional rerender
    useEffect(() => {

    
        setproductDetails('');
        console.log("the details are in display prd section ....", details)
        let searchItem = null;
        if(details.searchFlag && details.searchItem !== null){ searchItem = details.searchItem}
      
       async function fetch_Products(){
          let url = null;
           if(selectedProduct === null){   url = `http://localhost:1000/product/books/${searchItem}` }
           else{  url = `http://localhost:1000/product/${selectedProduct}/${searchItem}`;}

             // resetting the search flags, items
        // setdetails(details => ({...details, searchItem : null, searchFlag : false}));
           
           console.log("the url is ", url);
           let response =  await fetch(url)
           let record = await response.json();
           // setting the values
          // console.log("the record is ", record);
           setproductDetails(record);
           setErrorFlag(false)
           
       }
       fetch_Products();
    },
    [selectedProduct]
    )

    

return(
    <Fragment>
        <header>
        <HeadComponent details = {details}
                               setdetails = {setdetails}
                               accessFlag = {accessFlag}
                               setaccessFlag = {setaccessFlag}
                               selectedProduct = {selectedProduct}
                               setSelectedProduct = {setSelectedProduct}
                               />
        </header>
        {
        errorFlag && <div className='no_data'> NO DATA !!! </div>
    }
        {!productDetails && !errorFlag && <div> <Spinner></Spinner></div>}
     { productDetails && !errorFlag && <div className='display_products'>
        <ul className='product_list'>
        {/* {console.log(bookmarks)} */}
        {/* {console.log("the details are", details)} */}
            { productDetails.map(e =>             
                {
                    // ------------------------------------------------------------------------------------------

                    let bookmark_style = false;
                    if(bookmarks.includes(e._id)){bookmark_style = true; }
                    // --------------------------------------------------------------------------------------------
                   
                    var productTime = "";
                    var insert_date = new Date(e.insertionDate);
                    var diffDays = (Math.abs(new Date() - insert_date))
                     if((diffDays/ (1000 * 60 * 60)) <= 24){ productTime  = "Today";}
                     else if(((diffDays/ (1000 * 60 * 60)) > 24) && ((diffDays/(1000 * 60 * 60* 24)) <= 7)){
                         productTime = Math.floor((diffDays/(1000 * 60 * 60 *24)),10) + " days ago";
                     }
                     else if(((diffDays/(1000 * 60 * 60* 24)) > 7)  && ((diffDays/(1000 * 60 * 60 *24 * 7)) <= 4) ){
                        productTime = Math.floor((diffDays/(1000 * 60 * 60 *24 * 7)),10) + " weeks ago";
                     }
                     else{
                       productTime = Math.floor((diffDays/(1000 * 60 * 60 *24 * 7 * 4)),10) + " months ago"
                     }
                     //------------------------------------------------------------------------------------------------
                    return( 
                        <li key={e._id} className='product_section'>
                            <a  className = 'product_link' href='#'>
  
                                <img src={e.imageFile[0]} alt = {e.sellPrdName} width="300"></img>
                                <div className = 'each_prd_details'>
                                    <span className='product_price'> $ {e.sellPrdPrice}</span>
                                    <span className='product_title'>{e.sellPrdName}</span>
                                    <span className='product_university'>{e.university}</span>
                                    <div className='user_details'>
                                    <span className='product_email'>{e.Email}</span>
                                    <span> {productTime}</span>
                                    <span>{bookmarks}</span> 
                                    </div>
                                </div>
                            </a>
                            <span className='bookmark_section'>
                                <button className='bookmark_button' id={e._id}  onClick={() => likeFlag(e)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" id={e._id} className={bookmark_style ? 'bookmarked' : 'no_bookmark'}>
                                <path d="M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 
                                55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 
                                300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z"/></svg>
                                </button>
                                </span>
                        </li>
                    )
                }
                )}
            
        </ul>

        <button className='load_more_Btn'>Load More</button>

    </div>}
    <footer>
            <Foot />
        </footer>
         </Fragment>
);
}

export default DisplayProducts;