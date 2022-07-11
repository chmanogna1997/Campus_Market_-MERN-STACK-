import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './TipsToSell.css';
import Foot from '../Footer/Footer';
import HeadComponent from '../Header/Header';
import { category } from '../fake-services/services_data';
import { db } from '../firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import { storage } from '../firebase/firebase';
import {ref, uploadBytes, getDownloadURL, getStorage} from 'firebase/storage'
import {v4} from "uuid";

// want to do
// upload images fromlocal


function TipsToSell({ details, setdetails, accessFlag, setaccessFlag, selectedProduct, setSelectedProduct }) {

    const [openTab, SetOpenTab] = useState({
        'tip': " ",
        'description': " ",
        'expanded': false
    });
    const [errorFlag, setErrorFlag] = useState(false);
    const [fileLimitError, setfileLimitError] = useState(false);
    const [record_added, setrecord_added] = useState(false);
    const [tips, setTips] = useState([]);
    // const [selectedImages, setSelectedImages] = useState(null);
    const [sellprddetails, setSellPrddetails] = useState({
        'sellPrdname': null,
    });


    // connecting to the database
    const tipCollectionRef = collection(db, 'tips');

    useEffect(() => {
        const getTips = async () => {
            const tips_data = await getDocs(tipCollectionRef);
            // console.log(" the tppppppp :: ", tips_data.docs.map((doc) => ({ ...doc.data() })));
            setTips(tips_data.docs.map((doc) => ({ ...doc.data() })));
        }
        getTips()
    }, [])

    // async function tp add products 
    async function post_user_products(e,url) {
   console.log("In post , the url is ", url);
        var obj = JSON.stringify({
            Email: details.Email,
            university: details.university,
            sellPrdName: e.target.sellPrdname.value,
            sellPrdDescrpt: e.target.sellPrdDescrpt.value,
            SellPrdPrice: e.target.sellPrdPrice.value,
            sellPrdCategory :e.target.sellPrdCategory.value,
            imageFile : url
        });
        console.log("the sell obj is ", obj);
        const response = await fetch("http://localhost:1000/sellProducts", {
            method: "POST",
            headers: {"Content-Type": "application/json",},
            body: obj,
        });
        if (!response.ok) {
            console.log(response)
        }
        else{
            const res = await response.json();
            console.log("the record res is ", res)
            if(res){
                setrecord_added(true);
                e.target.sellPrdname.value = '';
                e.target.sellPrdDescrpt.value = '';
                e.target.sellPrdPrice.value = '';
                e.target.sellPrdCategory.value = '';
                e.target.files.value = ''
            }else{
                setrecord_added(false);
            }
        }
    }


    //loading images to firesbase storage

    function addImages(imagefile){
        return new Promise(resolve => {
            const imageRef = ref(storage,`images/${imagefile.name + v4()}`);
            uploadBytes(imageRef, imagefile).then((response) => {
                console.log("the reference is ", response);
                console.log("the image is uploaded", response.ref);
                console.log("the values are ", response.metadata.name);
                 var full_path = response.metadata.fullPath;
                 console.log("the full path is ::: ", full_path)
                 var get_storage = getStorage();
                 getDownloadURL(ref(get_storage, full_path))
                 .then((url) => {
                     resolve( url)        
             })
               })
        })
      

           
    }

    // on form submit add details o user profilr
      async function getToSellProductDetails(e) {
        e.preventDefault();
        setrecord_added(false);
        if (e.target.sellPrdCategory.value !== 'Choose a category') {
            // setting product name
            setSellPrddetails({'sellPrdname' : e.target.sellPrdname.value})
            // calling firebase storage and storing images
              // loading bulk of images :
           
             let url_arr = []
            for(let i = 0; i < e.target.files.files.length ; i++){
              console.log("in for function the i is", i)
             var imagefile = e.target.files.files[i];
             console.log(" now the image file is ..", imagefile);
             console.log('the name of the file is ', imagefile.name);

           
            // we made reference need to upload it now using uploadbytes
            let url = await addImages(imagefile)
            console.log("the url is ", url)
            url_arr.push(url)
            }
            console.log("the url array is ", url_arr);
            post_user_products(e,url_arr);
            
            setErrorFlag(false);
        } else {
            setErrorFlag(true);
        }
    };

    // to limit the selction of the file 
    function limit_selection(e){
        if(e.target.files.length > 5){
            e.target.value = ''
            setfileLimitError(true);
        }else{
            setfileLimitError(false);
        }
       
    }

    // @ Tips to sell fast : this for tab selection 
    function showSubEle(e) {
        SetOpenTab({
            'tip': e.tip,
            'description': e.description,
            'expanded': true
        });
    };


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

                {!accessFlag &&
                    <div className='popup'>
                        <div className='popup_box'>Need to be a member <Link className='tipsToSell_link' to='/SigninLogin' >Sign up here </Link>  </div>
                    </div>
                }
                {accessFlag && < div className='sell_page'>
                    <div className='sell_section'>
                        <h2 className='Sell_header'>Sell on Campus Market</h2>
                        <form onSubmit={getToSellProductDetails}>
                            <label>Choose a category
                                <select className='category_dropdown' required name='sellPrdCategory'>
                                    {category.map(e => {
                                        return (
                                            <option key={e} value={e}>{e}</option>
                                        );
                                    })
                                    }
                                </select>
                            </label>
                            <label>Product Name: <input required name='sellPrdname' className='PrdName'></input></label>
                            <label>Description: <input required name='sellPrdDescrpt' className='description'></input></label>
                            <label>Price ($): <input required name='sellPrdPrice' className='price'></input> </label>
                          
                            <label>Upload image : <input type='file' required name='files' multiple accept="image/*"  onChange={limit_selection} ></input></label>

                            <button type='submit' className='loadImage'>Submit </button>

                            {errorFlag && <div className='sell_error'>Please choose a category !!</div>}
                            {fileLimitError && <div className='sell_error'> Cannot choose more than 5 images !!</div> }
                            {console.log("is record added ", record_added)}
                            {record_added && <div className='sucess_msg'>Sucessfully added product to market !! </div>}

                        </form>
                    </div>
                    <div className='tips'>
                        <h2>Tips to Sell your items fast</h2>
                        <ul className='tips_list'>
                            {tips.map((e, i) => {
                                var btn_control = 'tip_description_' + i;
                                var btn_id = 'tip_' + i;
                                return (
                                    <li key={e.tip}>
                                        <button
                                            aria-expanded={openTab.expanded}
                                            aria-controls={btn_control}
                                            id={btn_id}
                                            className='each_tip' onClick={() => showSubEle(e)} >  {e.tip}
                                        </button>
                                        <div
                                            id={btn_control}
                                            aria-labelledby={btn_id}
                                            className='tab_description'>
                                            {(e.tip === openTab.tip) ? openTab.description : " "}
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>}
            </main>
            <footer>
                <Foot />
            </footer>
        </Fragment>
    )
}

export default TipsToSell;