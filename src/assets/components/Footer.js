import React from 'react';
import './Footer.css';


const Footer = () => {
  return (
    <footer className="footer">
      <nav>
        <ul>
          <li><a href="#inicio">Início</a></li>
          <li><a href="#quem-somos">Quem somos</a></li>
          <li><a href="#recursos">Recursos</a></li>
        </ul>
      </nav>
      <div className="social-media">
        <a href="#facebook">Facebook</a>
        <a href="#twitter">Twitter</a>
        <a href="#linkedin">LinkedIn</a>
      </div>
    </footer>
  );
}

export default Footer;
