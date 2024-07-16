import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faXTwitter, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="footer">
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
    </footer>
  );
}

export default Footer;
