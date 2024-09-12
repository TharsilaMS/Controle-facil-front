import React from 'react';
import { Link } from 'react-router-dom'; // Importe o Link do react-router-dom
import './Header.css';
import images from '../assets/images/logocf.png';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={images} alt="Logo da empresa" className="img-fluid"/>
      </div>
      <div className="title"><h1>Controle Fácil</h1></div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/despesas">Despesas</Link></li>
          <li><Link to="/nova-despesa">Nova Despesa</Link></li>
        </ul>
      </nav>
      <div className="auth-buttons">
        <button className="btn btn-primary">Criar conta</button>
        <button className="btn btn-primary">Entrar</button>
      </div>
    </header>
  );
};

export default Header;
