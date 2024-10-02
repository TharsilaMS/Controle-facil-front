import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HeaderHome from './components/header/Header'; 
import FooterHome from './components/footer/Footer'; 
import Feature from './components/feature/Feature';
import DespesasPage from './pages/DespesasPages'; 
import NovaDespesaForm from './components/despesa/NovaDespesaForm'; 
import NovaRenda from './components/renda/NovaRenda'; 
import RendaPage from './pages/RendaPage'; 
import './assets/styles/App.css';
import revenueBro from './assets/images/Revenue-bro.png';
import Home from './pages/home/Home'; 
import PrevisaoGastosPage from './pages/PrevisaoGastosPage';
import CreatePrevisaoGastosPage from './pages/CriarPrevisaoGastosPage';
import MetaSonhoList from './pages/MetaSonhoList'; 
import CriarMetaSonho from './pages/CriarMetaSonho'; 
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
    <h1 className="display-4">
      Controle suas finanças, de uma forma <span className="text-primary">simples</span> para uma vida financeira mais inteligente.
    </h1>
    <img 
      src={revenueBro} 
      alt="Descrição da Imagem" 
      className="hero-image img-fluid" 
      style={{ width: '50%', maxWidth: '300px' }} 
    />
  </div>
</section>

                <section className="features py-5">
                  <div className="container">
                    <div className="subtitle text-center mb-4">
                      <h2>Nossos principais recursos</h2>
                    </div>
                    <div className="row">
                      <div className="col-md-4 mb-4">
                        <Feature 
                          title="Limite de gastos" 
                          description="Defina o quanto você pode gastar em cada categoria e economize sem esforço." 
                          icon="fa-bullseye"
                        />
                      </div>
                      <div className="col-md-4 mb-4">
                        <Feature 
                          title="Controle por Categoria" 
                          description="Organize seus gastos por categoria, para maior controle." 
                          icon="fa-tag"
                        />
                      </div>
                      <div className="col-md-4 mb-4">
                        <Feature 
                          title="Controles futuros" 
                          description="Marque futuras despesas ou recebimentos no calendário." 
                          icon="fa-calendar-alt"
                        />
                      </div>
                    </div>
                  </div>
                </section>
                <section className="shortcuts py-5">
                  <div className="container">
                    <h2 className="text-center mb-4">Atalhos</h2>
                    <ul className="list-inline text-center">
                      <li className="list-inline-item"><Link to="/home" className="btn btn-link">Home</Link></li>
                    </ul>
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
        <Route path="/previsao-gastos/create" element={<Layout><CreatePrevisaoGastosPage /></Layout>} />
        <Route path="/previsao-gastos/:usuarioId" element={<Layout><PrevisaoGastosPage /></Layout>} />
        <Route path="/metas" element={<Layout><MetaSonhoList /></Layout>} /> 
        <Route path="/nova-meta" element={<Layout><CriarMetaSonho /></Layout>} /> 
        <Route path="/register" element={<Layout><Register /></Layout>} />
        <Route path="/login" element={<Layout><Login /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
