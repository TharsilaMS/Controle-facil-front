import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { useNavigate } from 'react-router-dom'; 

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
            const response = await axios.post('http://localhost:8080/auth/login', {
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
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2 className="text-center">Login</h2>
                    <form onSubmit={handleSubmit} className="border p-4 shadow-sm rounded">
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
                        <button type="submit" className="btn btn-primary w-100">Entrar</button>
                    </form>
                    {error && <p className="text-danger mt-3">{error}</p>}
                    {success && <p className="text-success mt-3">{success}</p>}
                </div>
            </div>
        </div>
    );
};

export default Login;
