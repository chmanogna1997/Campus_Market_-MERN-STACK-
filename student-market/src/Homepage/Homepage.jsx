import React, { Fragment, useState } from 'react';
import './Homepage.css';
import Foot from '../Footer/Footer';
import HeadComponent from '../Header/Header';
import { Link } from 'react-router-dom';
import mainimage from '../images/mainImage.jpg';
const images = require.context('../images', true);

let N = 0;

function Homepage({details, setdetails, accessFlag, setaccessFlag, selectedProduct, setSelectedProduct}){

    const  [CarouselImg, SetCarouselImg] = useState({
        'img' : images('./buyRentSell.jpg'),
        'alt' : 'buy used books'
    })

    function  changeSlide(a){
        //  for key house image ::  student-market\src\images\keys_house.png = 1
        // for 2 bed image : student-market\src\images\2bedimage.jfif = 2
        N = N + a;
        if(N === 1 ){ 
              SetCarouselImg({ 
                  'img' : images('./usedFurniture.jfif'),
                  'alt' : 'buy or sell used furniture'
                })  
               }
        else if(N === 2 ){  
             SetCarouselImg({
                  'img' : images('./2bedimage.jfif'),
                  'alt' : 'Rent an appartment'
                })  
             }
        else if(N > 2){ 
             SetCarouselImg({
                 'img' : images('./buyRentSell.jpg'),
                 'alt' : 'buy used books'
                 });  N = 0; 
            }
        else if(N < 0) { 
            SetCarouselImg({
                'img' : images('./2bedimage.jfif'),
                'alt' : 'Rent an appartment'
            }); N = 2; 
        }
        else{
            SetCarouselImg({
                'img' : images('./buyRentSell.jpg'),
                'alt' : 'buy used books'
            });
        }       
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
            <main>
            {/* {selectedProduct === null && <div className='homepage'> */}
         <div className='homepage'>
            {/* <div> */}
            <div className='WhatWeDo_section'>
            <div className='Homepage_image'>
            <div className='homepage_header'>
                <ul className='homepage_header_items'>
                    <li><a href='#features'>Our Features</a></li>
                    <li><a href='#disclaimer'>Disclaimer</a></li>
                </ul>
            </div> 

            <div className='Homepage_maintext'>
                 <p>Buy, Sell and Rent with Campus Market </p>
                 <p> Helping Students to plan their stay around the university</p>
                 <Link to = '/SigninLogin'>Signup now and plan your stay </Link>
                 {/* <a href='#'>Signup now and plan your stay </a> */}
                 </div>

                <img  alt= "for all students" src={mainimage}></img>
                {/* https://unsplash.com/photos/ZWD3Dx6aUJg */}
            </div>
            </div>
            <div id='features'> 
                <h4> Our features </h4>
                <div className='features_sub_section'>
                    <div className='features_section_text'>
                <p> Free and easy to use website to help international students plan their stay around their university in USA just by searching it.
                    To rent a house, buy furniture or elctronics and house hold items. You are also free to post your add accordingly.</p>

                    <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam blanditiis, commodi inventore
                   facere quod est aut atque molestiae voluptates accusamus consectetur eos, omnis provident, arc
                   hitecto velit iusto beatae! Odio, ea.Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                   Nam eligendi tempore cum magnam officiis! Modi facere nostrum nam quae odio exercitationem nobis. Necess
                   itatibus sapiente doloribus quidem beatae labore laborum similique.Lorem ipsum dolor sit amet conse
                
                </p>
                </div>
                <div className='feature_carousel'
                     aria-roledescription="carousel"
                     aria-label="Features of Campus Market"
                 >
                <button
                 className="prev" onClick={() => changeSlide(-1)}
                 aria-label="Previous Slide"
                 >&#10094;</button>
                <button className="next" onClick={() => changeSlide(+1)}
                 aria-label="Next Slide"
                >&#10095;</button>
                   <img  alt={CarouselImg.alt} src= {CarouselImg.img}></img>
                </div>
                </div>
            </div>
            <div id='disclaimer'>
            <h4> Disclaimer </h4>
              <p> Please note this a platform only an information site. WE neither decide nor verify the price stated in the website. This is upto
                  the seller. We are not responsible for any transaction issues nor your saftey .  </p>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis corporis aut facere in vel,
                 numquam error similique eos, praesentium enim adipisci, maiores sequi accusamus! Excepturi quisquam totam repellendus eaque temporibus? Lo
                 rem ipsum dolor sit amet consectetur adipisicing elit. Fugit dolor, amet odio eaque, perspiciatis tenetur 
                 magni deserunt officiis repellat iusto, accusantium soluta esse sint rem cum nemo temporibus earum enim!</p>
            </div> 
        </div>
        </main>
        <footer>
            <Foot />
        </footer>
        </Fragment>
       
    )
};

export default Homepage;