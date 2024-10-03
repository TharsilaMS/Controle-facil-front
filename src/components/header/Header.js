import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './Header.css';
import images from '../../assets/images/logocf.png';

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
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
      <div className="container d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <img src={images} alt="Logo da empresa" className="img-fluid me-2" style={{ height: '40px' }} />
          <h1 className="title m-0">Controle Fácil</h1>
        </div>

        <nav>
          <ul className="navbar-nav d-flex flex-row">
            {isHomePage ? (
              <>
                <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
                <li className="nav-item"><Link to="/sobre" className="nav-link">Sobre</Link></li>
                <li className="nav-item"><Link to="/contato" className="nav-link">Contato</Link></li>
                <div className="auth-buttons d-flex">
                  <Link to="/register" className="me-2">
                    <button className="btn btn-primary">Criar conta</button>
                  </Link>
                  <Link to="/login">
                    <button className="btn btn-primary">Entrar</button>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <li className="nav-item"><Link to="/home" className="nav-link">Home</Link></li>
                <li className="nav-item"><Link to="/despesas" className="nav-link">Despesas</Link></li>
                <li className="nav-item"><Link to="/nova-despesa" className="nav-link">Adicionar Despesa</Link></li>
                <li className="nav-item"><Link to="/rendas" className="nav-link">Rendas</Link></li>
                <li className="nav-item"><Link to="/create-renda" className="nav-link">Adicionar Renda</Link></li>
                <li className="nav-item"><Link to="/create-previsao-gastos-page" className="nav-link">Criar Previsão de Gastos</Link></li>
                <li className="nav-item"><Link to="/previsao-gastos-page" className="nav-link">Ver Previsão de Gastos</Link></li>
                <li className="nav-item"><Link to="/metas" className="nav-link">Metas dos Sonhos</Link></li>
                <li className="nav-item"><Link to="/nova-meta" className="nav-link">Nova Meta dos Sonhos</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
