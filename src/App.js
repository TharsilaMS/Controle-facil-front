import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HeaderHome from './components/header/Header'; 
import FooterHome from './components/footer/Footer'; 
import Feature from './components/feature/Feature';
import DespesasPage from './home/despesa/DespesasPages'; 
import NovaDespesaForm from './home/despesa/NovaDespesaForm'; 
import NovaRenda from './home/renda/NovaRenda'; 
import RendaPage from './home/renda/RendaPage'; 
import './assets/styles/App.css';
import revenueBro from './assets/images/Revenue-bro.png';
import Home from './home/Home'; 
import PrevisaoGastosPage from './home/previsao/PrevisaoGastosPage';
import CreatePrevisaoGastosPage from './home/previsao/NovaPrevisaoGastosPage';
import MetaSonhoList from './home/meta/MetaSonhoPage'; 
import CriarMetaSonho from './home/meta/NovaMetaSonho';
import Login from './components/Login';
import Register from './components/Register';

const Layout = ({ children }) => (
  <>
    <HeaderHome />
    <main>{children}</main>
    <FooterHome /> 
  </>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <Layout>
              <div className="App">
                <section className="hero text-center py-5">
                  <div className="container">
                    <h1 className="hero-title">
                      Controle suas finanças, de uma forma <span className="highlight">simples</span> para uma vida financeira mais inteligente.
                    </h1>
                    <img 
                      src={revenueBro} 
                      alt="Descrição da Imagem" 
                      className="hero-image" 
                      style={{ width: '50%', maxWidth: '300px' }} 
                    />
                  </div>
                </section>

                <section className="features" id="features">
                  <div className="features-container">
                    <div className="features-title">
                      <h2>Nossos principais recursos</h2>
                    </div>
                    <div className="features-list">
                      <div className="feature-card">
                        <Feature 
                          title="Limite de gastos" 
                          description="Defina o quanto você pode gastar e economize sem esforço." 
                          icon="fas fa-money-bill-wave" 
                        />
                      </div>
                      <div className="feature-card">
                        <Feature 
                          title="Controle por Categoria" 
                          description="Organize seus gastos em diferentes categorias para facilitar o acompanhamento e controle das despesas." 
                          icon="fa-th-list" 
                        />
                      </div>
                      <div className="feature-card">
                        <Feature 
                          title="Metas" 
                          description="Estabeleça metas financeiras claras para ajudá-lo a alcançar seus objetivos de economia." 
                          icon="fa-bullseye" 
                        />
                      </div>
                      <div className="feature-card">
                        <Feature 
                          title="Dashboard" 
                          description="Dashboard para o controle de gastos e acompanhamento de metas, garantindo uma gestão financeira eficaz." 
                          icon="fas fa-chart-pie" 
                        />
                      </div>
                      <div className="feature-card">
                        <Feature 
                          title="Saldo" 
                          description="Monitore seu saldo atual para ter maior controle do seu dinheiro." 
                          icon="fa-wallet" 
                        />
                      </div>
                      <div className="feature-card">
                        <Feature 
                          title="Notificações" 
                          description="Receba lembretes diários para registrar suas despesas." 
                          icon="fa-bell" 
                        />
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </Layout>
          }
        />
        <Route path="/despesas" element={<Layout><DespesasPage /></Layout>} />
        <Route path="/home" element={<Layout><Home /></Layout>} />
        <Route path="/nova-despesa" element={<Layout><NovaDespesaForm /></Layout>} />
        <Route path="/rendas" element={<Layout><RendaPage /></Layout>} />
        <Route path="/create-renda" element={<Layout><NovaRenda /></Layout>} />
        <Route path="/rendas/:id" element={<Layout><NovaRenda /></Layout>} />
        <Route path="/create-previsao-gastos-page" element={<Layout><CreatePrevisaoGastosPage /></Layout>} />
        <Route path="/previsao-gastos-page" element={<Layout><PrevisaoGastosPage /></Layout>} />
        <Route path="/metas" element={<Layout><MetaSonhoList /></Layout>} /> 
        <Route path="/nova-meta" element={<Layout><CriarMetaSonho /></Layout>} /> 
        <Route path="/register" element={<Layout><Register /></Layout>} />
        <Route path="/login" element={<Layout><Login /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
