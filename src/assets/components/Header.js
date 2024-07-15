import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src="path/to/logo.png" alt="logo" />
        <h1 className="title">Controle Fácil</h1>
      </div>
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
