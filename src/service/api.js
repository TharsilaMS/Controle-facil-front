import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
});


const handleError = (error, context) => {
  console.error(`Erro ao ${context}:`, error);
  throw error; 
};

export const createDespesa = async (despesa) => {
  try {
    const token = localStorage.getItem('token'); 
    const response = await api.post('/api/despesas', despesa, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data; 
  } catch (error) {
    handleError(error, 'criar despesa');
  }
};

export const deleteDespesa = async (id) => {
  try {
    const token = localStorage.getItem('token'); 
    await api.delete(`/api/despesas/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
  } catch (error) {
    handleError(error, 'deletar despesa');
  }
};

export const updateDespesa = async (id, despesa) => {
  try {
    const token = localStorage.getItem('token'); 
    const response = await api.put(`/api/despesas/${id}`, despesa, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data; 
  } catch (error) {
    handleError(error, 'atualizar despesa');
  }
};

export const getDespesasByUsuarioId = async (usuarioId) => {
  try {
    const token = localStorage.getItem('token'); 
    const response = await api.get(`/api/despesas/usuario/${usuarioId}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data; 
  } catch (error) {
    handleError(error, 'buscar despesas por usuário');
  }
};

export default api;
