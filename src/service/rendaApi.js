
import api from './api';

export const getAllRendas = async () => {
  try {
    const response = await api.get('/rendas');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar rendas:', error);
    throw error;
  }
};

export const createRenda = async (renda) => {
    try {
      const response = await fetch('http://localhost:8080/api/rendas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(renda),
      });
  
      if (!response.ok) {
        throw new Error('Erro ao criar renda');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Erro ao criar renda:', error);
    }
  };

export const deleteRenda = async (id) => {
  await api.delete(`/rendas/${id}`);
};

export const updateRenda = async (id, renda) => {
  await api.put(`/rendas/${id}`, renda);
};
