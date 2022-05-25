import React from 'react';
import './Footer.css';
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer" />

function Footer(){
    const footer_data = {
        about_us: ['Student Market Group', 'careers', 'contact Us'],
        student_market: ['Help','Sitemap', 'Legal & Privacy information', 'Blog']
      };
    return(
        <footer>
            <div className='footer_about_us'>
                <div className='about_us_griding'>
                <ul> <p className='li_heading'> About Us </p>
                    {footer_data.about_us.map( e => {
                        return(
                                <li key={e}><button className='footer_links' href=''>{e}</button></li>
                            )
                    }    
                    )}
                    </ul>
                    <ul> <p className='li_heading'> Student Market </p>
                        {footer_data.student_market.map(e => {
                            return(
                                <li key={e}><button className='footer_links' href=''>{e}</button></li>
                            )
                        })}
                    </ul>
                    <div>
                       <p className='li_heading' >Follow us</p> 
                       <div>
                       <a className='facebook'>
                       </a>
                       <a className='instagram'>
                       </a>
                       <a className='twitter'>
                       </a>
                       </div>
                    </div>
                </div>
            </div>
            <div className='footer_classified_section'>
            <div className='footer_classified'>
                <p>Other Countries Pakistan - South Africa - Indonesia</p>
                <p>Free Classifieds in USA. © 2022-2024 Student Market</p>
            </div>
            </div>
        </footer>
    )
}

export default Footer;
