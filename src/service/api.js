import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',  
});

export const deleteDespesa = async (id) => {
  await api.delete(`/despesas/${id}`);
};

export const updateDespesa = async (id, despesa) => {
  await api.put(`/despesas/${id}`, despesa);
};

export const getAllDespesas = async () => {
  try {
    const response = await api.get('/despesas');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar despesas:', error);
    throw error;
  }
};
export default api; 