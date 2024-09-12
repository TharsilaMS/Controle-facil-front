import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import HeaderHome from './components/Header'; // Importando o header da página inicial
import HeaderOther from './components/HeaderOther'; // Importando o header das páginas internas
import FooterHome from './components/Footer'; // Importando o footer da página inicial
import FooterOther from './components/FooterOther'; // Importando o footer das páginas internas
import Feature from './components/Feature';
import DespesasPage from './pages/despesasPage';
import NovaDespesaForm from './components/NovaDespesaForm'; // Importando o formulário de nova despesa
import './assets/styles/App.css';
import revenueBro from './assets/images/Revenue-bro.png';

const Layout = ({ children }) => {
  const location = useLocation();
  
  // Determina qual header e footer renderizar com base na rota
  const isHomePage = location.pathname === '/';
  
  return (
    <>
      {isHomePage ? <HeaderHome /> : <HeaderOther />}
      <main>{children}</main>
      {isHomePage ? <FooterHome /> : <FooterOther />}
    </>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <Layout>
              <div className="App">
                <section className="hero container">
                  <div className="row align-items-center">
                    <div className="col-md-6">
                      <h1>Controle suas finanças, de uma forma <span>simples</span> para uma vida financeira mais inteligente.</h1>
                    </div>
                    <div className="col-md-6">
                      <img src={revenueBro} alt="Descrição da Imagem" className="img-fluid" />
                    </div>
                  </div>
                </section>
                <section className="features">
                  <div className="subtitle">
                    <h2>Nossos principais recursos</h2>
                  </div>
                  <div className="feature-list">
                    <Feature 
                      title="Limite de gastos" 
                      description="Defina o quanto você pode gastar em cada categoria e economize sem esforço." 
                      icon="fa-bullseye"
                    />
                    <Feature 
                      title="Controle por Categoria" 
                      description="Organize seus gastos por categoria, para maior controle." 
                      icon="fa-tag"
                    />
                    <Feature 
                      title="Controles futuros" 
                      description="Marque futuras despesas ou recebimentos no calendário." 
                      icon="fa-calendar-alt"
                    />
                  </div>
                </section>
              </div>
            </Layout>
          }
        />
        <Route 
          path="/despesas" 
          element={
            <Layout>
              <DespesasPage />
            </Layout>
          }
        />
        <Route 
          path="/nova-despesa" 
          element={
            <Layout>
              <NovaDespesaForm />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
