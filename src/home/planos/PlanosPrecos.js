import React from 'react';
import './PlanosPrecos.css';

const PlanosPrecos = () => {
  const planos = [
    {
      nome: 'Plano Grátis',
      preco: 'Gratuito por 30 dias.',
      descricao: 'Ideal para iniciantes.',
    },
    {
      nome: 'Plano Básico',
      preco: 'R$ 9,99 por mês.',
      descricao: 'Perfeito para usuários frequentes.',
    },
    {
      nome: 'Plano Intermediário',
      preco: 'R$ 29,99 por mês.',
      descricao: 'Para quem quer o máximo de recursos.',
      maisVendido: true, 
    },
  ];

  const funcionalidades = [
    {
      nome: 'Classificação de Despesas e Receitas',
      planoGratis: '✓',
      planoBasico: '✓',
      planoIntermediario: '✓',
    },
    {
      nome: 'Controle de Saldo',
      planoGratis: '✓',
      planoBasico: '✓',
      planoIntermediario: '✓',
    },
    {
      nome: 'Notificações Diárias',
      planoGratis: '✓',
      planoBasico: '✓',
      planoIntermediario: '✓',
    },
    {
      nome: 'Previsão de Gastos',
      planoGratis: '✗',
      planoBasico: '✗',
      planoIntermediario: '✓',
    },
    {
      nome: 'Metas Financeiras',
      planoGratis: '✗',
      planoBasico: '✗',
      planoIntermediario: '✓',
    },
    {
      nome: 'Lembrete de Vencimento via email e Push',
      planoGratis: '✗',
      planoBasico: '✗',
      planoIntermediario: '✓',
    },
  ];

  return (
    <div className="planos-precos container mt-5">
      <h1 className="text-center mt-5 plano-titulo">Planos e Preços</h1>
      <div className="row">
        {planos.map((plano, index) => (
          <div className={`col-md-4 mb-4 ${plano.maisVendido ? 'mais-vendido' : ''}`} key={index}>
            <div className="plano card">
              {plano.maisVendido && <span className="badge badge-vendido">Mais Vendido</span>}
              <div className="card-body">
                <h2 className="card-title text-center titulo-plano">{plano.nome}</h2>
                <p className="card-text text-center preco-plano">{plano.preco}</p>
                <p className="card-text text-center descricao-plano">{plano.descricao}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-center mt-5 plano-titulo">Compare os Planos</h2>
      <table className="table table-bordered mt-4">
        <thead>
          <tr>
            <th>Funcionalidades</th>
            <th>Plano Grátis</th>
            <th>Plano Básico</th>
            <th>Plano Intermediário</th>
          </tr>
        </thead>
        <tbody>
          {funcionalidades.map((funcionalidade, index) => (
            <tr key={index}>
              <td>{funcionalidade.nome}</td>
              <td>{funcionalidade.planoGratis}</td>
              <td>{funcionalidade.planoBasico}</td>
              <td>{funcionalidade.planoIntermediario}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlanosPrecos;
