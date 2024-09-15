// src/components/Footer.js
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
            <nav>
              <ul>
                <li><a href="#inicio">Início</a></li>
                <li><a href="#quem-somos">Quem somos</a></li>
                <li><a href="#recursos">Recursos</a></li>
              </ul>
            </nav>
          </div>
          <div className="social-media">
            <a href="#facebook">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="#twitter">
              <FontAwesomeIcon icon={faXTwitter} />
            </a>
            <a href="#linkedin">
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
