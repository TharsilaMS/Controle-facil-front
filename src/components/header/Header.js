import React, { useEffect, useState } from 'react'; 
import { useLocation, Link } from 'react-router-dom';
import './Header.css';
import images from '../../assets/images/logo-principal.png';

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    let lastScrollTop = 0;
    const handleScroll = () => {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      setScrolling(currentScroll > lastScrollTop);
      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; 
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isHomePage ? 'home-header' : 'app-header'} ${scrolling ? 'hidden' : ''}`}>
      <div className="header-container">
        <div className="logo-container">
          <Link to="/" className="link">
            <img src={images} alt="Logo da empresa" className="logo" />
          </Link>
        </div>

        <div className="nav-container">
          <nav>
            <ul className="nav-list">
              {isAuthPage ? null : isHomePage ? (
                <>
                  <li className="nav-item">
                    <Link to="/" className={`nav-link ${location.hash === '' ? 'active' : ''}`}>Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="#features" className={`nav-link ${location.hash === '#features' ? 'active' : ''}`}>Recursos</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="#contatos" className={`nav-link ${location.hash === '#contatos' ? 'active' : ''}`}>Planos e Preços</Link>
                  </li> 
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to="/home" className={`nav-link ${location.pathname === '/home' ? 'active' : ''}`}>Visão Geral</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/despesas" className={`nav-link ${location.pathname === '/despesas' ? 'active' : ''}`}>Despesas</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/rendas" className={`nav-link ${location.pathname === '/rendas' ? 'active' : ''}`}>Rendas</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/previsao-gastos-page" className={`nav-link ${location.pathname === '/previsao-gastos-page' ? 'active' : ''}`}>Previsão de Gastos</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/metas" className={`nav-link ${location.pathname === '/metas' ? 'active' : ''}`}>Metas</Link>
                  </li>
                  
                </>
              )}
            </ul>
          </nav>
        </div>

        <div className="auth-buttons">
          {isAuthPage ? null : isHomePage ? (
            <>
              <Link to="/register">
                <button className="button">Criar conta</button>
              </Link>
              <Link to="/login">
                <button className="button">Entrar</button>
              </Link>
            </>
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default Header;
