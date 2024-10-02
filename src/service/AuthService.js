import axios from 'axios';

const API_URL = 'http://localhost:8080'; // Ajuste a URL do backend conforme necessário

export const login = async (loginData) => {
    try {
        // Adiciona o cabeçalho Content-Type para a requisição
        const response = await axios.post(`${API_URL}/auth/login`, loginData, {
            headers: {
                'Content-Type': 'application/json', // Certifique-se de que o tipo de conteúdo está correto
            },
        });
        return response.data; // Retorna o nome do usuário e o token
    } catch (error) {
        console.error("Erro ao fazer login:", error); // Log do erro
        throw new Error(error.response?.data?.message || 'Erro ao fazer login');
    }
};
