import api from './api';
export const getAllDespesas = async () => {
  try {
    const response = await api.get('/despesas');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar despesas:', error);
    throw error;
  }
};


export const createDespesa = async (despesa) => {
  try {
    const response = await fetch('http://localhost:8080/api/despesas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(despesa),
    });

    if (!response.ok) {
      throw new Error('Erro ao criar despesa');
    }

    return await response.json();
  } catch (error) {
    console.error('Erro ao criar despesa:', error);
  }
};




export const deleteDespesa = async (id) => {
  await api.delete(`/despesas/${id}`);
};

export const updateDespesa = async (id, despesa) => {
  await api.put(`/despesas/${id}`, despesa);
};

