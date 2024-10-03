
import React from 'react';
import { useLocation } from 'react-router-dom';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faXTwitter, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <footer className={`footer ${isHomePage ? 'home-footer' : 'app-footer'}`}>
      {isHomePage ? (
        <div className="home-footer-content">
          <div className="links"> 
          <div className="app-footer-content">
          <p>&copy; 2024 Controle Fácil</p>
        </div>
        
          </div>

          <div className="social-media">
  <a href="https://www.facebook.com/yourprofile" target="_blank" rel="noopener noreferrer">
    <FontAwesomeIcon icon={faFacebookF} />
  </a>
  <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer">
    <FontAwesomeIcon icon={faXTwitter} />
  </a>
  <a href="https://www.linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">
    <FontAwesomeIcon icon={faLinkedinIn} />
  </a>
</div>

        </div>
      ) : (
        <div className="app-footer-content">
          <p>&copy; 2024 Controle Fácil</p>
        </div>
      )}
    </footer>
  );
};

export default Footer;
