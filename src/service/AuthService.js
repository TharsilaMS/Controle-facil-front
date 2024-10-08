import axios from 'axios';

const API_URL = 'https://controle-facil-backend-production-a348.up.railway.app'; 

export const login = async (loginData) => {
    try {
   
        const response = await axios.post(`${API_URL}/auth/login`, loginData, {
            headers: {
                'Content-Type': 'application/json', 
            },
        });
        return response.data; 
    } catch (error) {
        console.error("Erro ao fazer login:", error); 
        throw new Error(error.response?.data?.message || 'Erro ao fazer login');
    }
};
