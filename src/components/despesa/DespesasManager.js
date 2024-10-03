import React, { useState, useEffect, useCallback } from 'react';
import { deleteDespesa, getDespesasByUsuarioId } from '../../service/Api';
import { useHistory } from 'react-router-dom';

const DespesasManager = () => {
  const [despesas, setDespesas] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); 
  const history = useHistory(); 
  const usuarioId = localStorage.getItem('usuarioId'); 

  const fetchDespesas = useCallback(async () => {
    if (!usuarioId) {
      setError('Usuário não autenticado.'); 
      setLoading(false);
      return;
    }

    try {
      const result = await getDespesasByUsuarioId(usuarioId);
      setDespesas(result);
    } catch (err) {
      console.error('Erro ao buscar despesas:', err);
      setError('Erro ao buscar despesas: ' + (err.response?.data?.message || err.message)); 
    } finally {
      setLoading(false); 
    }
  }, [usuarioId]);

  useEffect(() => {
    console.log('Usuario ID:', usuarioId); 
    fetchDespesas();
  }, [fetchDespesas]); 

  const handleDelete = async (id) => {
    try {
      await deleteDespesa(id);
      setDespesas((prevDespesas) => prevDespesas.filter(despesa => despesa.id !== id));
    } catch (err) {
      setError('Falha ao excluir despesa: ' + (err.response?.data?.message || err.message)); 
    }
  };

  const handleEdit = (id) => {
   
    history.push(`/editar-despesa/${id}`);
  };

  return (
    <div>
      <h1>Gerenciamento de Despesas</h1>
      {loading && <p>Carregando despesas...</p>} 
      {error && <p>{error}</p>}
      <ul>
        {despesas.map(despesa => (
          <li key={despesa.id}>
            <p>{despesa.descricao} - {despesa.valor}</p>
            <button onClick={() => handleEdit(despesa.id)}>Editar</button>
            <button onClick={() => handleDelete(despesa.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
console.log('Usuario ID:', usuarioId);
export default DespesasManager;
