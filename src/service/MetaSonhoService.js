import axios from 'axios';

const API_URL = '/api/metas-sonho';


const api = axios.create({
  baseURL: 'http://localhost:8080', 
});


const handleError = (error, context) => {
  console.error(`Erro ao ${context}:`, error);
  throw error; 
};


const getMetasSonho = async (usuarioId) => {
  try {
    const token = localStorage.getItem('token'); 
    const response = await api.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
      params: { usuarioId },
    });
    return response.data; 
  } catch (error) {
    handleError(error, 'buscar metas de sonho');
  }
};


const createMetaSonho = async (metaSonho) => {
  try {
    const token = localStorage.getItem('token'); 
    const response = await api.post(API_URL, metaSonho, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data; 
  } catch (error) {
    handleError(error, 'criar meta de sonho');
  }
};


const updateMetaSonho = async (id, metaSonho) => {
  try {
    const token = localStorage.getItem('token'); 
    const response = await api.put(`${API_URL}/${id}`, metaSonho, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data; 
  } catch (error) {
    handleError(error, 'atualizar meta de sonho');
  }
};

const deleteMetaSonho = async (id) => {
  try {
    const token = localStorage.getItem('token'); 
    await api.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
  } catch (error) {
    handleError(error, 'deletar meta de sonho');
  }
};


const adicionarValorMeta = async (id, valorAdicional) => {
  try {
    const token = localStorage.getItem('token'); 
    const response = await api.patch(`${API_URL}/${id}/adicionar-valor`, null, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
      params: { valorAdicional },
    });
    return response.data; 
  } catch (error) {
    handleError(error, 'adicionar valor à meta de sonho');
  }
};

export { getMetasSonho, createMetaSonho, updateMetaSonho, deleteMetaSonho, adicionarValorMeta };
