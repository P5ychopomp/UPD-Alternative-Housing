import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <div className='footer-container'>
      <div class='footer-links'>

        <div className='footer-link-wrapper link-main'>
          <div class='footer-link-items'>
            <h4>UPD Alternative Housing Database</h4>
            <Link to='/TermsOfService'>Terms of Service</Link>
            <Link to='/Privacy'>Privacy</Link>
            <Link to='/ContactUs'>Contact Us</Link>
          </div>
        </div>

        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h4>Landlord</h4>
            <Link to='/PostingGuides'>Posting Guides</Link>
          </div>
        </div>

        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
          <h4>Student</h4>
            <Link to='/SearchGuides'>Search Guides</Link>
            <Link to='/Safety'>Safety</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;