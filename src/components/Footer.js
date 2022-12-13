import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Footer.css';

function Footer() {
  return (
    <div className='footer-container'>
      <div className='footer-links'>

        <div className='footer-link-wrapper link-main'>
          <div className='footer-link-items'>
            <h4>UPD Alternative Housing Database</h4>
            <Link to='/TermsOfService'>Terms of Service</Link>
            <Link to='/Privacy'>Privacy</Link>
            <Link to='/ContactUs'>Contact Us</Link>
          </div>
        </div>

        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h4>Landlord</h4>
            <Link to='/PostingGuides'>Posting Guides</Link>
          </div>
        </div>

        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
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