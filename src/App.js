import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HeaderHome from './components/Header'; // Importando o header da página inicial
import FooterHome from './components/Footer'; // Importando o footer da página inicial
import Feature from './components/Feature';
import DespesasPage from './pages/DespesasPages'; // Corrigido para capitalização
import NovaDespesaForm from './components/NovaDespesaForm'; // Importando o formulário de nova despesa
import NovaRenda from './components/NovaRenda'; // Corrigido para NovaRenda
import RendaPage from './pages/RendaPage'; // Confirme o caminho e o nome do arquivo
import './assets/styles/App.css';
import revenueBro from './assets/images/Revenue-bro.png';
import Home from './pages/Home'; // Importando a página inicial
import PrevisaoGastosPage from './pages/PrevisaoGastosPage' ;
import CreatePrevisaoGastosPage from './pages/CreatePrevisaoGastosPage';
import MetaSonhoList from './pages/MetaSonhoList'; // Importando a página de listagem de metas
import CriarMetaSonho from './pages/CriarMetaSonho'; // ajuste o caminho conforme necessário


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
                <section className="hero">
                  <div className="hero-content">
                    <h1>Controle suas finanças, de uma forma <span>simples</span> para uma vida financeira mais inteligente.</h1>
                    <img src={revenueBro} alt="Descrição da Imagem" className="hero-image" />
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
                <section className="shortcuts">
                  <h2>Atalhos</h2>
                  <ul>
                    <li><Link to="/despesas">Despesas</Link></li>
                    <li><Link to="/nova-despesa">Nova Despesa</Link></li>
                    <li><Link to="/rendas">Rendas</Link></li>
                    <li><Link to="/create-renda">Nova Renda</Link></li>
                    <li><Link to="/home">Home</Link></li>
                  </ul>
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
        {/* Rotas para Previsão de Gastos */}
        <Route path="/previsao-gastos/create" element={<Layout><CreatePrevisaoGastosPage /></Layout>} />
        <Route path="/previsao-gastos/:usuarioId" element={<Layout><PrevisaoGastosPage /></Layout>} />
        {/* Rotas para Metas dos Sonhos */}
        <Route path="/metas" element={<Layout><MetaSonhoList /></Layout>} /> {/* Página de listagem de metas */}
        <Route path="/nova-meta" element={<Layout><CriarMetaSonho /></Layout>} /> {/* Formulário para nova meta */}
       
      </Routes>
    </Router>
  );
}

export default App;
