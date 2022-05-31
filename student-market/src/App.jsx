import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignInLogin from './SignIn_login/SignIn_login.jsx';
import Homepage from './Homepage/Homepage';
import DisplayProducts from './DisplayProducts/DisplayProducts';
import TipsToSell from './TipsToSell/TipsToSell';
import Error from './Error/Error';
import Profile from './UserProfile/UserProfile';


function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
 // access state
  const [accessFlag, setaccessFlag] = useState(false); 
  // user details
  const [details, setdetails] = useState(
    {
    pwd: null,
    Fname : null,
    LName : null,
    Email : null,
    university : null,
    bookmarks : []
  });

  return (
    <BrowserRouter>
    <Routes> 
      <Route path='/Profile' element = {<Profile details = {details}
                                                setdetails = {setdetails}
                                                />}/>
      <Route path='/'  element = {<Homepage details = {details}
                                                setdetails = {setdetails}
                                                accessFlag = {accessFlag}
                                                setaccessFlag = {setaccessFlag}
                                                selectedProduct = {selectedProduct}
                                                setSelectedProduct = {setSelectedProduct}
                                                />} />
      <Route path='/Home'  element = {<Homepage details = {details}
                                                setdetails = {setdetails}
                                                accessFlag = {accessFlag}
                                                setaccessFlag = {setaccessFlag}
                                                selectedProduct = {selectedProduct}
                                                setSelectedProduct = {setSelectedProduct}
                                                 />} />
      <Route path='/SigninLogin'  element = {<SignInLogin
                                                details = {details}
                                                setdetails = {setdetails}
                                                accessFlag = {accessFlag}
                                                setaccessFlag = {setaccessFlag}
                                                selectedProduct = {selectedProduct}
                                                setSelectedProduct = {setSelectedProduct}
                                                />} />
      <Route path='/DisplayProducts' element= {<DisplayProducts
                                                details = {details}
                                                setdetails = {setdetails}
                                                accessFlag = {accessFlag}
                                                setaccessFlag = {setaccessFlag}
                                                selectedProduct = {selectedProduct}
                                               setSelectedProduct = {setSelectedProduct}
                                               />}/>
      <Route path='/Sell'  element = {<TipsToSell 
                                                 details = {details}
                                                 setdetails = {setdetails}
                                                 accessFlag = {accessFlag}
                                                 setaccessFlag = {setaccessFlag}
                                                 selectedProduct = {selectedProduct}
                                                setSelectedProduct = {setSelectedProduct}
                                                  />} />
      <Route path='*' element = {<Error />}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
