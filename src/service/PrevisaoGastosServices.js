

import axios from 'axios';


const api = axios.create({
  baseURL: 'http://localhost:8080', 
});


const handleError = (error, context) => {
  console.error(`Erro ao ${context}:`, error);
  throw error; 
};

export const createPrevisaoGastos = async (previsaoGastos) => {
  try {
    const token = localStorage.getItem('token'); 
    const response = await api.post('/api/previsao-gastos', previsaoGastos, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data; 
  } catch (error) {
    handleError(error, 'criar previsão de gastos');
  }
};

export const updatePrevisaoGastos = async (usuarioId, previsaoGastos) => {
  try {
    const token = localStorage.getItem('token'); 
    const response = await api.put(`/api/previsao-gastos/${usuarioId}`, previsaoGastos, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data; 
  } catch (error) {
    handleError(error, 'atualizar previsão de gastos');
  }
};

export const getPrevisaoGastos = async (usuarioId) => {
  try {
    const token = localStorage.getItem('token'); 
    const response = await api.get(`/api/previsao-gastos/${usuarioId}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data; 
  } catch (error) {
    handleError(error, 'buscar previsão de gastos');
  }
};
