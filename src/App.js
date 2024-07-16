import Header from './assets/components/Header';
import Footer from './assets/components/Footer';
import Feature from './assets/components/Feature';
import './assets/styles/App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <section className="hero">
          <h1>Controle suas finanças, de uma forma <span>simples</span> para uma vida financeira mais inteligente.</h1>
        </section>
        <section className="features">
          <div className="subtitle"> <h2>Nossos principais recursos</h2></div>
          <div className="feature-list">
            <Feature title="Limite de gastos" description="Defina o quanto você pode gastar em cada categoria e economize sem esforço." />
            <Feature title="Controle por Categoria" description="Organize seus gastos por categoria, para maior controle." />
            <Feature title="Controles futuros" description="Marque futuras despesas ou recebimentos no calendário." />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
