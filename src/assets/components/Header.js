import React from 'react';
import './Header.css';
import images from '../images/logocf.png'
const Header = () => {
  return (
    <header className="header">
      <div className="logo">
      <img src={images} alt="Logo da empresa" className="img-fluid"/>
       
      </div>
       <div className="title"><h1>Controle Fácil</h1> </div>
      <nav>
        <ul>
          <li><a href="#quem-somos">Quem somos</a></li>
          <li><a href="#recursos">Recursos</a></li>
        </ul>
      </nav>
      <div className="auth-buttons">
      <button class="btn btn-primary">Criar conta</button>
      <button class="btn btn-primary">Entrar</button>
      </div>
    </header>
  );
}

export default Header;
