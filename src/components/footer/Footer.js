import React from 'react';
import { useLocation } from 'react-router-dom';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/register';
  const isPlanosPrecosPage = location.pathname === '/planos-precos';

  if (isLoginPage || isRegisterPage|| isPlanosPrecosPage) {
    return null;
  }

  return (
    <footer className={`rodape ${isHomePage ? 'rodape-inicial' : 'rodape-aplicativo'}`} >
      {isHomePage ? (
        <div className="conteudo-rodape-inicial">
          <div className="links-rodape">
            <div className="conteudo-rodape-aplicativo">
              <p>&copy; 2024 Controle Fácil</p>
            </div>
          </div>
          <div className="redes-sociais">
            <a href="https://www.facebook.com/yourprofile" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="https://www.instagram.com/yourprofile" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="https://www.linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
          </div>
        </div>
      ) : (
        <div className="conteudo-rodape-aplicativo">
          <p>&copy; 2024 Controle Fácil</p>
        </div>
      )}
    </footer>
  );
};

export default Footer;
