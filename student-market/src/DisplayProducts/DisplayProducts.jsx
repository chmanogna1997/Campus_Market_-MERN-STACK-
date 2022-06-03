import React, { Fragment, useState, useEffect } from 'react';
import './DisplayProducts.css';
import { fetchPrdDetails } from '../fake-services/services';
import Spinner from '../Spinner/Spinner'
import i from '../images/h1.jpg'
import HeadComponent from '../Header/Header';
import Foot from '../Footer/Footer';
import { useNavigate } from 'react-router-dom';
import { async } from '@firebase/util';



function DisplayProducts({details, setdetails, accessFlag, setaccessFlag,selectedProduct,setSelectedProduct}){

    const[productDetails, setproductDetails] = useState();

    const [errorFlag, setErrorFlag] = useState(false);

    let navigate = useNavigate();

    function bookmark(e){
        console.log("in bookmark flag", e)
        if(details.Email === null){
            navigate('/SigninLogin');
        }else{
            console.log("in else");
            
        }
    }

    // useffect to make a async call : conditional rerender
    useEffect(() => {
       async function fetch_Products(){
           const K = null;
           let url = `http://localhost:1000/product/${selectedProduct}/${null}`;
           console.log("the url is ", url);
           let response =  await fetch(url)
           let record = await response.json();
           console.log("the record is ", record);
       }
       fetch_Products();
    },
    [selectedProduct]
    )

    useEffect(() => {
        setproductDetails('')
        fetchPrdDetails(selectedProduct)
        .then((output) => {
            setproductDetails(output);
            setErrorFlag(false)
        })
        .catch((error) => {setErrorFlag(true)})
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
                    return( 
                        <li key={e.id} className='product_section'>
                            <a  className = 'product_link' href='#'>
                                <img src={i} alt = {e.title}></img>
                                <div className = 'each_prd_details'>
                                    <span className='product_price'>{e.price}</span>
                                    <span className='product_title'>{e.title}</span>
                                    <span className='product_description'>{e.description}</span>
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