import React, { useState } from 'react'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './Auth.css'; 
import images from '../assets/images/logo-principal.png'; 
const Register = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [genero, setGenero] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [ramoAtuacao, setRamoAtuacao] = useState('');
    const [faixaSalarial, setFaixaSalarial] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('https://controle-facil-backend-production-a348.up.railway.app/api/usuarios', {
                nome,
                email,
                senha,
                genero,
                dataNascimento,
                ramoAtuacao,
                faixaSalarial,
            });

            navigate('/login'); 
        } catch (error) {
            const mensagemErro = error.response?.data?.message || 'Erro ao criar conta. Verifique os dados.';
            setErrorMessage(mensagemErro);
        }
    };

    return (
        <div className="register-container">
            <div className="register-wrapper"> 
                <div className="register-border"> 
                    
                    <form 
                        onSubmit={handleSubmit} 
                        className="register-form" 
                    > <img src={images} alt="Logo da Empresa" className="logo centered-logo" /> 
                        <h2 className="text-center mb-4">Criar conta</h2> 
                        <div className="mb-3">
                            <label className="form-label">Nome:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                required
                            />
                        </div>
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
                        <div className="mb-3">
                            <label className="form-label">Gênero:</label>
                            <select
                                className="form-select"
                                value={genero}
                                onChange={(e) => setGenero(e.target.value)}
                                required
                            >
                                <option value="">Selecione</option>
                                <option value="MASCULINO">Masculino</option>
                                <option value="FEMININO">Feminino</option>
                                <option value="OUTRO">Outro</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Data de Nascimento:</label>
                            <input
                                type="date"
                                className="form-control"
                                value={dataNascimento}
                                onChange={(e) => setDataNascimento(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Ramo de Atuação:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={ramoAtuacao}
                                onChange={(e) => setRamoAtuacao(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Faixa Salarial:</label>
                            <select
                                className="form-select"
                                value={faixaSalarial}
                                onChange={(e) => setFaixaSalarial(e.target.value)}
                                required
                            >
                                <option value="">Selecione</option>
                                <option value="ABAIXO_DE_2K">Abaixo de R$ 2.000</option>
                                <option value="DE_2K_A_5K">De R$ 2.000 a R$ 5.000</option>
                                <option value="DE_5K_A_10K">De R$ 5.000 a R$ 10.000</option>
                                <option value="ACIMA_DE_10K">Acima de R$ 10.000</option>
                            </select>
                        </div>
                        {errorMessage && <p className="text-danger">{errorMessage}</p>}
                        <button type="submit" className="btn-criar-conta w-100">Criar conta</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
