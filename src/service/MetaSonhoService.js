import axios from 'axios';

const API_URL = '/api/metas-sonho';

// Função para obter as metas do usuário
const getMetasSonho = async (usuarioId) => {
    const response = await axios.get(API_URL, { params: { usuarioId } });
    return response.data;
};

// Função para criar uma nova meta
const createMetaSonho = async (metaSonho) => {
    const response = await axios.post(API_URL, metaSonho);
    return response.data;
};

// Função para atualizar uma meta existente
const updateMetaSonho = async (id, metaSonho) => {
    const response = await axios.put(`${API_URL}/${id}`, metaSonho);
    return response.data;
};

// Função para deletar uma meta
const deleteMetaSonho = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};

// Função para adicionar valor à meta
const adicionarValorMeta = async (id, valorAdicional) => {
    const response = await axios.patch(`${API_URL}/${id}/adicionar-valor`, null, {
        params: { valorAdicional }
    });
    return response.data;
};

export { getMetasSonho, createMetaSonho, updateMetaSonho, deleteMetaSonho, adicionarValorMeta };
