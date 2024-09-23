// src/service/previsaoGastosService.js

import axios from 'axios';

const API_URL = "http://localhost:8080/api/previsao-gastos";

export const createPrevisaoGastos = (previsaoGastos) => {
  return axios.post(API_URL, previsaoGastos);
};

export const updatePrevisaoGastos = (usuarioId, previsaoGastos) => {
  return axios.put(`${API_URL}/${usuarioId}`, previsaoGastos);
};

export const getPrevisaoGastos = (usuarioId) => {
  return axios.get(`${API_URL}/${usuarioId}`);
};


