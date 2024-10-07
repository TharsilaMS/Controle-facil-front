// src/App.js

import React, { useState } from 'react';
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
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      pergunta: "O que é o Controle Fácil?",
      resposta: "O Controle Fácil é um site projetado para ajudar jovens e profissionais a gerenciar suas finanças pessoais, organizando despesas e receitas, além de estabelecer metas financeiras."
    },
    {
      pergunta: "Como posso criar uma conta no Controle Fácil?",
      resposta: "Você pode criar uma conta clicando no botão 'Criar conta' na página inicial e seguindo as instruções para preencher suas informações."
    },
    {
      pergunta: "Quais funcionalidades estão disponíveis no Controle Fácil?",
      resposta: "O Controle Fácil oferece funcionalidades como: Cadastro de despesas e receitas, Previsão de gastos, Relatórios de gastos mensais, Metas de economia, Notificações para lembrar de registrar suas despesas."
    },
    {
      pergunta: "Posso editar ou excluir despesas já registradas?",
      resposta: "Sim! Você pode editar ou excluir despesas na seção de despesas, selecionando a despesa que deseja modificar e escolhendo a opção correspondente."
    },
    {
      pergunta: "O site é seguro para registrar minhas informações financeiras?",
      resposta: "Sim, o Controle Fácil adota medidas de segurança para proteger suas informações pessoais e financeiras. Todos os dados são armazenados de forma segura."
    }
  ];

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <Layout>
              <div className="App">
                <section className="hero text-center py-5">
                  <div className="container-principal">
                    <h1 className="hero-title">
                  <span className='destaque'>  Controle</span>  suas finanças de maneira prática, inteligente e eficiente, tornando sua vida financeira mais organizada e  <span className='destaque'>fácil.</span>                    </h1>
                    <img 
                      src={revenueBro} 
                      alt="Descrição da Imagem" 
                      className="hero-image" 
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
                          description="Defina um limite de gastos e receba um alerta quando ultrapassar o valor , ajudando a economizar e evitar excessos." 
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
                          description="Acompanhe seu saldo atual e tenha mais controle sobre suas finanças para tomar decisões conscientes." 
                          icon="fa-wallet" 
                        />
                      </div>
                      <div className="feature-card">
                        <Feature 
                          title="Notificações" 
                          description="Receba lembretes diários para registrar suas despesas, garantindo um controle contínuo e atualizado do seu orçamento." 
                          icon="fa-bell" 
                        />
                      </div>
                    </div>
                  </div>
                </section>

                <section className="perguntas-frequentes">
                  <h2>Perguntas Frequentes</h2>
                  <div className="perguntas-container">
                    {faqData.map((item, index) => (
                      <div key={index}>
                        <div className="perguntas" onClick={() => toggleAccordion(index)}>
                          <h3>{item.pergunta}</h3>
                        </div>
                        {activeIndex === index && (
                          <div className="respostas">
                            <p>{item.resposta}</p>
                          </div>
                        )}
                      </div>
                    ))}
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
