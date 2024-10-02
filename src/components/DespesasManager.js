import React, { useState, useEffect } from 'react';
import { deleteDespesa, updateDespesa } from '../service/Despesas';

const FIXED_ID = '32300000-0000-0000-0000-000000000000'; // ID fixo para teste

const DespesasManager = () => {
  const [despesas, setDespesas] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch despesas on component mount or update
    const fetchDespesas = async () => {
      try {
        const result = await getAllDespesas(); // Implement this function to fetch despesas
        setDespesas(result);
      } catch (err) {
        console.error('Erro ao buscar despesas:', err);
        setError('Erro ao buscar despesas.');
      }
    };

    fetchDespesas();
  }, []);

  const handleDelete = async () => {
    try {
      await deleteDespesa(FIXED_ID);
      setDespesas(despesas.filter(despesa => despesa.id !== FIXED_ID));
    } catch (err) {
      setError('Falha ao excluir despesa.');
    }
  };

  const handleEdit = () => {
    // Redirecionar para a página de edição com o ID fixo
    window.location.href = `/editar-despesa/${FIXED_ID}`;
  };

  return (
    <div>
      <h1>Gerenciamento de Despesas</h1>
      <button onClick={handleDelete}>Excluir Despesa</button>
      <button onClick={handleEdit}>Editar Despesa</button>
      {error && <p>{error}</p>}
      {/* Renderizar a lista de despesas ou outras informações conforme necessário */}
    </div>
  );
};

export default DespesasManager;
