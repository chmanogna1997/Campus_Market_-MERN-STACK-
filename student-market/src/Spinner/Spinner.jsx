import React from "react";
import spinner_image from './spinner-icon-29.jpg'
import './Spinner.css'

function Spinner() {

    return(
        <React.Fragment>
            <div className="spinner_container">
                
                    <img alt="spinner" src= {spinner_image} className = "spinner"></img>
                
            </div>
        </React.Fragment>
    )
}

export default Spinner;