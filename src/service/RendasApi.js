import axios from 'axios';


const api = axios.create({
  baseURL: 'https://controle-facil-backend-production-a348.up.railway.app', 
});


const handleError = (error, context) => {
  console.error(`Erro ao ${context}:`, error);
  throw error; 
};

export const getRendasByUsuarioId = async (usuarioId) => {
  try {
    const token = localStorage.getItem('token'); 
    const response = await api.get(`/api/rendas/usuario/${usuarioId}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    handleError(error, 'buscar rendas');
  }
};

export const createRenda = async (renda) => {
  try {
    const token = localStorage.getItem('token'); 
    const response = await api.post('/api/rendas', renda, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data; 
  } catch (error) {
    handleError(error, 'criar renda');
  }
};

export const deleteRenda = async (id) => {
  try {
    const token = localStorage.getItem('token');
    await api.delete(`/api/rendas/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
  } catch (error) {
    handleError(error, 'deletar renda');
  }
};

export const updateRenda = async (id, renda) => {
  try {
    const token = localStorage.getItem('token'); 
    await api.put(`/api/rendas/${id}`, renda, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
  } catch (error) {
    handleError(error, 'atualizar renda');
  }
};


