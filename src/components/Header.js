import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './Header.css';
import images from '../assets/images/logocf.png';

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [scrolling, setScrolling] = useState(false);
  
  useEffect(() => {
    let lastScrollTop = 0;
    const handleScroll = () => {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      if (currentScroll > lastScrollTop) {
        setScrolling(true); // Scroll down
      } else {
        setScrolling(false); // Scroll up
      }
      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isHomePage ? 'home-header' : 'app-header'} ${scrolling ? 'hidden' : ''}`}>
      <div className="logo">
        <img src={images} alt="Logo da empresa" className="img-fluid"/>
      </div>
      {isHomePage ? (
        <div className="home-header-content text-center">
          <h1 className="title">Controle Fácil</h1>
          <nav>
            <ul className="navbar-nav">
              <li><Link to="/" className="nav-link">Home</Link></li>
              <li><Link to="/sobre" className="nav-link">Sobre</Link></li>
              <li><Link to="/contato" className="nav-link">Contato</Link></li>
            </ul>
            <div className="auth-buttons">
              <button className="btn btn-primary">Criar conta</button>
              <button className="btn btn-primary">Entrar</button>
            </div>
          </nav>
        </div>
      ) : (
        <div className="app-header-content">
          <h1 className="title">Controle Fácil</h1>
          <nav>
            <ul className="navbar-nav">
              <li><Link to="/despesas" className="nav-link">Despesas</Link></li>
              <li><Link to="/nova-despesa" className="nav-link">Nova Despesa</Link></li>
              <li><Link to="/rendas" className="nav-link">Rendas</Link></li>
              <li><Link to="/create-renda" className="nav-link">Nova Renda</Link></li>
              <li><Link to="/home" className="nav-link">Home</Link></li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
