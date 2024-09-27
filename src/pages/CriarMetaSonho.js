import React, { useState } from 'react';

const CriarMetaSonho = () => {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [valorAlvo, setValorAlvo] = useState('');
    const [prazo, setPrazo] = useState('');
    const [mensagem, setMensagem] = useState('');

    const formatarData = (data) => {
        const partes = data.split('-');
        return `${partes[2]}/${partes[1]}/${partes[0]}`; 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const novaMeta = {
            titulo,
            descricao,
            valorAlvo: parseFloat(valorAlvo),
            valorEconomizado: 0.00,  
            prazo: formatarData(prazo), 
            usuarioId: '20a1c5b0-5ef1-4440-9910-3db411cc7f6e', 
            status: 'ATIVA',         
        };

        try {
            const response = await fetch('/api/metas-sonho', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(novaMeta),
            });

            if (response.ok) {
                const result = await response.json();
                setMensagem(`Meta criada com sucesso: ${result.titulo}`);
                setTitulo('');
                setDescricao('');
                setValorAlvo('');
                setPrazo('');
            } else {
                setMensagem('Erro ao criar a meta. Verifique os dados e tente novamente.');
            }
        } catch (error) {
            setMensagem('Erro ao se conectar ao servidor.');
        }
    };

    return (
        <div>
            <h1>Criar Nova Meta de Sonho</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="titulo">Título:</label>
                    <input
                        type="text"
                        id="titulo"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="descricao">Descrição:</label>
                    <textarea
                        id="descricao"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="valorAlvo">Valor Alvo:</label>
                    <input
                        type="number"
                        id="valorAlvo"
                        value={valorAlvo}
                        onChange={(e) => setValorAlvo(e.target.value)}
                        step="0.01"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="prazo">Prazo:</label>
                    <input
                        type="date"
                        id="prazo"
                        value={prazo}
                        onChange={(e) => setPrazo(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Criar Meta</button>
            </form>
            {mensagem && <p>{mensagem}</p>}
        </div>
    );
};

export default CriarMetaSonho;
