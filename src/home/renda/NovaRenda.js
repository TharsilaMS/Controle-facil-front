import React, { useState } from 'react'; 
import { createRenda } from '../../service/RendasApi';
import { Link, useNavigate } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './Renda.css';
import '../../components/Button.css';

const NovaRenda = () => {
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [data, setData] = useState('');
    const [tipo, setTipo] = useState('SALARIO'); 
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const usuarioId = localStorage.getItem('usuarioId'); 
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess('');
        setError('');
        
        if (!descricao || !valor || !data) {
            setError('Todos os campos devem ser preenchidos.');
            setLoading(false);
            return;
        }

        try {
            await createRenda({ descricao, valor: parseFloat(valor), data, tipo, usuarioId }); 
            setSuccess('Renda salva com sucesso!');
            setDescricao('');
            setValor('');
            setData('');
            setTipo('SALARIO'); 
            
            setTimeout(() => {
                navigate('/home');
            }, 1500);
        } catch (err) {
            setError('Erro ao salvar a renda. Por favor, tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="header-title">Nova Receita</h2>
            {loading && (
                <div className="d-flex justify-content-center mb-4">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}
            {success && <div className="alert alert-success" role="alert">{success}</div>}
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            <form onSubmit={handleSubmit} className="renda-border">
                <div className="mb-3">
                    <label htmlFor="descricao" className="form-label">Descrição:</label>
                    <input
                        type="text"
                        id="descricao"
                        className="form-control"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="valor" className="form-label">Valor:</label>
                    <input
                        type="number"
                        id="valor"
                        className="form-control"
                        step="0.01"
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="data" className="form-label">Data:</label>
                    <input
                        type="date"
                        id="data"
                        className="form-control"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="tipo" className="form-label">Tipo de Renda:</label>
                    <select
                        id="tipo"
                        className="form-select"
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                    >
                        <option value="SALARIO">Salário</option>
                        <option value="FREELANCE">Freelance</option>
                        <option value="INVESTIMENTO">Investimento</option>
                        <option value="OUTRO">Outro</option>
                    </select>
                </div>
                <div className="card-body-buttons">
                    <button type="submit" className="custom-button ">Salvar</button> 
                    
                </div>
            </form>
            <Link to="/home" className="btn-voltar">Página Principal</Link> 
        </div>
    );
};

export default NovaRenda;
