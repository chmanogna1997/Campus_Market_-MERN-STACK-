import React, { Fragment, useState, useEffect } from 'react';
import './DisplayProducts.css';
import { fetchPrdDetails } from '../fake-services/services';
import Spinner from '../Spinner/Spinner'
import i from '../images/h1.jpg'
import HeadComponent from '../Header/Header';
import Foot from '../Footer/Footer';
import { useNavigate } from 'react-router-dom';
import {Buffer} from 'buffer'
import { async } from '@firebase/util';



function DisplayProducts({details, setdetails, accessFlag, setaccessFlag,selectedProduct,setSelectedProduct}){

    const[productDetails, setproductDetails] = useState(null);

    const [errorFlag, setErrorFlag] = useState(false);

    let navigate = useNavigate();

    function bookmark(e){
        console.log("in bookmark flag", e)
        if(details.Email === null){
            navigate('/SigninLogin');
        }else{
            console.log("in else");

            var old_bookmarks = [];
            console.log("the details are", details);
            old_bookmarks = details.bookmarks
            console.log("the old bokmarks are ", old_bookmarks)
            console.log("adding ", e._id )
            // old_bookmarks[0] = e._id;

            console.log("after adding the bookmarks ", old_bookmarks )
            console.log("The details are", details.Email);
            setdetails({...details, bookmarks : old_bookmarks.push(e._id)})

            console.log("the detaisl are after adding ..", details)
            
        }
    }

    // useffect to make a async call : conditional rerender
    useEffect(() => {
        setproductDetails('')
       async function fetch_Products(){
           const K = null;
           let url = `http://localhost:1000/product/${selectedProduct}/${null}`;
           console.log("the url is ", url);
           let response =  await fetch(url)
           let record = await response.json();
           // setting the values
           console.log("the record is ", record);
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
            { productDetails.map(e =>             
                {
                    //console.log("the  data is >>> ", e)
                    //console.log("the todays date is ", new Date());
                    //console.log("inserion date is ", new Date(e.insertionDate) )
                    var diffDays = parseInt((new Date() - new Date(e.insertionDate)) / (1000 * 60 * 60 * 24), 10); 
                    //console.log("the diff1 date is ", diffDays);
                    var productTime = "";
                    if(diffDays === 0 ){
                        productTime  = "Today"
                    }
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
                                    </div>
                                </div>
                            </a>
                            <span className='bookmark_section'>
                                <button className='bookmark_button'  onClick={() => bookmark(e)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
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