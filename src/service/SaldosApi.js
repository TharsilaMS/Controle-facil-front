import axios from 'axios';
const api = axios.create({
  baseURL: 'http://localhost:8080', 
});


export const getSaldo = async (usuarioId) => {
  const token = localStorage.getItem('token'); 
  
  try {
 
    const response = await api.get(`/api/saldos/${usuarioId}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(`Erro ao buscar saldo: ${error.response?.statusText || error.message}`);
  }
};
