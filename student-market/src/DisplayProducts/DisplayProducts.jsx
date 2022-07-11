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
        setproductDetails('')
       async function fetch_Products(){
           const K = null;
           let url = `http://localhost:1000/product/${selectedProduct}/${null}`;
           console.log("the url is ", url);
           let response =  await fetch(url)
           let record = await response.json();
           // setting the values
           setproductDetails(record);
           setErrorFlag(false)
           console.log("the record is ", record);
       }
       fetch_Products();
    },
    [selectedProduct]
    )

    // useEffect(() => {
    //     setproductDetails('')
    //     fetchPrdDetails(selectedProduct)
    //     .then((output) => {
    //         setproductDetails(output);
    //         setErrorFlag(false)
    //     })
    //     .catch((error) => {setErrorFlag(true)})
    // },
    // [selectedProduct]
    // )
    function toBase64(data) {
        //arr = new Uint8Array(arr) if it's an ArrayBuffer
        return Buffer.from(data).toString('base64')
     }

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
                    console.log("the image data is >>> ", e.imageData)
                    // let base64String = Buffer.from(e.imageData[0],'base64')
                    // console.log("the base64String is ::: ", base64String);
                    
                  
                //    let binary = Buffer.from(e.imageData[0]);
                //    console.log("the data is ", e.imageData[0])
                //    let imgData = new Blob([binary.buffer],{type:'image/png'})
                // //    type: 'image/bmp'
                //    let link = URL.createObjectURL(imgData);
                //    let f_link = URL.revokeObjectURL(link)
                //    console.log("the link is ::::::: ", link)
                // // let type = "image/jpeg"
                // // let link = (`data:${type};base64,${Buffer.from(e.imageData[0]).toString('base64')}`)
                // // console.log("the link is ", link)
                    return( 
                        <li key={e._id} className='product_section'>
                            <a  className = 'product_link' href='#'>
                                {/* <img src={e.imageData[0]} alt = {e.sellPrdName}></img> */}
                                <img src={`imageUrl`} alt = {e.sellPrdName} width="300"></img>
                                <div className = 'each_prd_details'>
                                    <span className='product_price'>{e.sellPrdPrice}</span>
                                    <span className='product_title'>{e.sellPrdName}</span>
                                    <span className='product_description'>{e.sellPrdDescrpt}</span>
                                    <span className='product_email'>{e.Email}</span>
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