import React, { useState } from 'react';
import { createRenda } from '../../service/RendasApi';
import 'bootstrap/dist/css/bootstrap.min.css';

const NovaRenda = () => {
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [data, setData] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const usuarioId = localStorage.getItem('usuarioId'); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess('');
        setError('');
        
        try {
            await createRenda({ descricao, valor, data, usuarioId });
            setSuccess('Renda salva com sucesso!');
            setDescricao('');
            setValor('');
            setData('');
        } catch (err) {
            setError('Erro ao salvar a renda. Por favor, tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5" style={{ paddingTop: '80px' }}>
            <h1 className="mb-4">Nova Renda</h1>
            {loading && (
                <div className="d-flex justify-content-center mb-4">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}
            {success && <div className="alert alert-success" role="alert">{success}</div>}
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            <form onSubmit={handleSubmit}>
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
                <button type="submit" className="btn btn-primary">Salvar</button>
            </form>
        </div>
    );
};

export default NovaRenda;
