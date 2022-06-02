import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './TipsToSell.css';
import Foot from '../Footer/Footer';
import HeadComponent from '../Header/Header';
import { category } from '../fake-services/services_data';
import { db } from '../firebase-config';
import { collection, getDocs } from 'firebase/firestore';

// want to do
// upload images fromlocal


function TipsToSell({ details, setdetails, accessFlag, setaccessFlag, selectedProduct, setSelectedProduct }) {

    const [openTab, SetOpenTab] = useState({
        'tip': " ",
        'description': " ",
        'expanded': false
    });
    const [errorFlag, setErrorFlag] = useState(false);
    const [tips, setTips] = useState([]);
    const [selectedImages, setSelectedImages] = useState(null);

    const [sellprddetails, setSellPrddetails] = useState({
        'sellPrdname': null,
        'sellPrdDescrpt': null,
        'SellPrdPrice': null,
        'sellPrdCategory': null,
        'sellPrdImages': null
    });


    // connecting to the database
    const tipCollectionRef = collection(db, 'tips');

    useEffect(() => {
        const getTips = async () => {
            const tips_data = await getDocs(tipCollectionRef);
            console.log(" the tppppppp :: ", tips_data.docs.map((doc) => ({ ...doc.data() })));
            setTips(tips_data.docs.map((doc) => ({ ...doc.data() })));
        }
        getTips()
    }, [])

    // async function tp add products 
    async function post_user_products(e) {
        const formData = new FormData()

        formData.append( 'Email', details.Email);
        formData.append( 'university', details.university);
        formData.append( 'sellPrdImages', selectedImages);
        formData.append( 'sellPrdName',e.target.sellPrdname.value);
        formData.append(  'sellPrdDescrpt', e.target.sellPrdDescrpt.value);
        formData.append(  'SellPrdPrice', e.target.sellPrdPrice.value);
        formData.append(  'sellPrdCategory', e.target.sellPrdCategory.value);

        // formData.append("imageFile",selectedImages);

        console.log("the formadata is ", formData);

        console.log(" the image files are :" , selectedImages);
        const response = await fetch("http://localhost:1000/sellProducts", {
            method: "POST",
            body: formData
        });

        console.log(" the response is ....", response);

    }


    // on form submit add details o user profilr
    function getToSellProductDetails(e) {
        e.preventDefault();
        if (e.target.sellPrdCategory.value !== 'Choose a category') {
            // setSellPrddetails({
            //     'sellPrdname': e.target.sellPrdname.value,
            //     'sellPrdDescrpt': e.target.sellPrdDescrpt.value,
            //     'SellPrdPrice': e.target.SellPrdPrice.value,
            //     'sellPrdCategory': e.target.sellPrdCategory.value,
            //     'sellPrdImages' : selectedImages
            // });

            // calling async function
            post_user_products(e);
            setErrorFlag(false);
        } else {
            setErrorFlag(true);
        }
    };

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
            {console.log("the selected images are", selectedImages)}
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
                        <form onSubmit={getToSellProductDetails} enctype= 'multipart/form-data'>
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
                            <label>Upload image : <input type='file' required name='sellPrdImages' multiple accept="image/*" onChange={(e) => { setSelectedImages(e.target.files[0]) }}></input></label>

                            <button type='submit' className='loadImage'>Submit </button>

                            {errorFlag && <div className='sell_error'>Please choose a category !!</div>}

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