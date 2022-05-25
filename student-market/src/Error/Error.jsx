import React, { Fragment, useState } from 'react';
import './Error.css'

function Error() {
    return(
        <Fragment>
            <div className='error_page'>
                <div className='error_div'>
                <span className='emoji'> &#128542; </span>
               <span className='error_code'> 404 </span>
               <span className='error_message'> Sorry Page not found </span>
            </div>
            </div>
        </Fragment>
    )
}

export default Error;
