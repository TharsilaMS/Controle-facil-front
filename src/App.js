import Header from './assets/components/Header';
import Footer from './assets/components/Footer';
import Feature from './assets/components/Feature';
import './assets/styles/App.css';
import revenueBro from './assets/images/Revenue-bro.png'; 


function App() {
  return (
    <div className="App">
      <Header />
      <main>
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
      </main>
      <Footer />
    </div>
  );
}

export default App;
