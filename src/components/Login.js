import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import images from '../assets/images/logo-principal.png'; 

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const response = await axios.post('https://controle-facil-backend-production-a348.up.railway.app/auth/login', {
                email,
                senha,
            });

            console.log(response.data);

            if (response.data) {
                localStorage.setItem('token', response.data.token);

                if (response.data.usuarioId) {
                    localStorage.setItem('usuarioId', response.data.usuarioId);
                } else {
                    setError('ID do usuário não recebido.');
                }

                setSuccess('Login bem-sucedido!');
                navigate('/home');
            } else {
                setError('Token não recebido.');
            }
        } catch (err) {
            setError('Falha ao fazer login. Verifique suas credenciais.');
            console.error(err);
        }
    };

    return (
        <div className="login-container"> {/* Adiciona uma nova classe para a centralização */}
            <div className="wrapper">
                <div className="border">
                    <img src={images} alt="Logo da Empresa" className="logo centered-logo" /> {/* Adiciona uma nova classe para centralização do logo */}
                    <h2>Acesse sua conta</h2>
                    <form onSubmit={handleSubmit} id="formContent">
                        <div className="mb-3">
                            <label className="form-label">Email:</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Senha:</label>
                            <input
                                type="password"
                                className="form-control"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn-criar-conta w-100">Entrar</button>
                    </form>
                    {error && <p className="text-danger">{error}</p>}
                    {success && <p className="text-success">{success}</p>}
                </div>
            </div>
        </div>
    );
};

export default Login;
