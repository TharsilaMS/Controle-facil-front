import React, { useEffect, useState } from 'react'; 
import { useLocation, Link } from 'react-router-dom';
import './Header.css';
import images from '../../assets/images/logocf.png';

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
          <Link to="/"> 
            <img src={images} alt="Logo da empresa" className="logo" />
            <h1 className="title">Controle Fácil</h1>
          </Link>
        </div>

        <nav>
          <ul className="nav-list">
            {isAuthPage ? ( 
              <li className="nav-item">
                <h1 className="page-title">{location.pathname === '/login' ? 'Login' : 'Registro'}</h1>
              </li>
            ) : isHomePage ? (
              <>
                <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
                <li className="nav-item"><Link to="#features" className="nav-link">Sobre</Link></li>
                <li className="nav-item"><Link to="/contato" className="nav-link">Contato</Link></li>
                <div className="auth-buttons">
                  <Link to="/register">
                    <button className="button">Criar conta</button>
                  </Link>
                  <Link to="/login">
                    <button className="button">Entrar</button>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <li className="nav-item"><Link to="/home" className="nav-link">Home</Link></li>
                <li className="nav-item"><Link to="/despesas" className="nav-link">Despesas</Link></li>
                <li className="nav-item"><Link to="/rendas" className="nav-link">Rendas</Link></li>
                <li className="nav-item"><Link to="/previsao-gastos-page" className="nav-link">Previsão de Gastos</Link></li>
                <li className="nav-item"><Link to="/metas" className="nav-link">Metas</Link></li>
                <li className="nav-item"><Link to="/create-previsao-gastos-page" className="nav-link">Criar Previsão</Link></li>
                <li className="nav-item"><Link to="/nova-meta" className="nav-link">Nova Meta</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
