import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MetaSonhoList = () => {
  const [metas, setMetas] = useState([]);
  const [valorAdicional, setValorAdicional] = useState({});
  const usuarioId = '32300000-0000-0000-0000-000000000000'; // UUID do usuário

  // Função para buscar as metas do usuário
  const fetchMetas = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/metas-sonho`, {
        params: { usuarioId }
      });
      setMetas(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Carregar as metas quando o componente é montado
  useEffect(() => {
    fetchMetas();
  }, []);

  // Handle change do input de valor adicional para cada meta
  const handleInputChange = (metaId, value) => {
    setValorAdicional({
      ...valorAdicional,
      [metaId]: value
    });
  };

  // Função para adicionar valor à meta
  const handleAdicionarValor = async (metaId) => {
    try {
      const valor = parseFloat(valorAdicional[metaId] || 0);
      if (isNaN(valor) || valor <= 0) {
        alert('Por favor, insira um valor válido.');
        return;
      }

      await axios.patch(`http://localhost:8080/api/metas-sonho/${metaId}/adicionar-valor`, null, {
        params: { valorAdicional: valor }
      });

      const metaAtualizada = metas.find(meta => meta.id === metaId);
      if (metaAtualizada.valorEconomizado + valor >= metaAtualizada.valorAlvo) {
        alert('Parabéns! Você atingiu sua meta!');
      }

      alert('Valor adicionado com sucesso!');
      setValorAdicional({ ...valorAdicional, [metaId]: '' }); // Limpa o campo após adicionar o valor
      fetchMetas(); // Atualiza a lista de metas após adicionar o valor
    } catch (error) {
      console.error('Erro ao adicionar valor à meta:', error);
      alert('Erro ao adicionar valor.');
    }
  };

  return (
    <div>
      <h2>Metas dos Sonhos</h2>
      <ul className="list-group">
        {metas.map(meta => (
          <li key={meta.id} className={`list-group-item d-flex justify-content-between align-items-center ${meta.valorEconomizado >= meta.valorAlvo ? 'bg-success text-white' : ''}`}>
            <div>
              <strong>{meta.titulo}</strong>: {meta.descricao} 
              <br />
              (Alvo: R$ {meta.valorAlvo}, Economizado: R$ {meta.valorEconomizado})
            </div>
            {/* Formulário para adicionar valor */}
            <div>
              <input
                type="number"
                className="form-control"
                placeholder="Valor adicional"
                value={valorAdicional[meta.id] || ''}
                onChange={(e) => handleInputChange(meta.id, e.target.value)}
              />
              <button className="btn btn-primary mt-2" onClick={() => handleAdicionarValor(meta.id)}>
                Adicionar Valor
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MetaSonhoList;
