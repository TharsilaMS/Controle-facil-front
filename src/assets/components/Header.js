import React from 'react';
import './Header.css';
import images from '../images/logocf.png'
const Header = () => {
  return (
    <header className="header">
      <div className="logo">
      <img src={images} alt="Logo da empresa" />
       
      </div>
       <div className="title"><h1>Controle Fácil</h1> </div>
      <nav>
        <ul>
          <li><a href="#quem-somos">Quem somos</a></li>
          <li><a href="#recursos">Recursos</a></li>
        </ul>
      </nav>
      <div className="auth-buttons">
        <button>Criar conta</button>
        <button>Entrar</button>
      </div>
    </header>
  );
}

export default Header;
