
import axios from 'axios';


const api = axios.create({
  baseURL: 'http://localhost:8080/api', 
});

export const getSaldo = async (usuarioId) => {
  try {
    const response = await api.get(`/saldos/${usuarioId}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar o saldo:', error);
    throw error; 
  }
};
