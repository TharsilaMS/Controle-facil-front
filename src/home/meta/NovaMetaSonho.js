import React, { useState, useEffect } from 'react';
import { createMetaSonho, getMetasSonho } from '../../service/MetaSonhoService';
import { Form, Container, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './MetaSonho.css';
import '../../components/Button.css';
import { formatarSaldo } from '../../utils';

const CriarMetaSonho = () => {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [valorAlvo, setValorAlvo] = useState('');
    const [prazo, setPrazo] = useState('');

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState('');
    const [metaAtiva, setMetaAtiva] = useState(false);

    const usuarioId = localStorage.getItem('usuarioId');

    useEffect(() => {
        const verificarMetaAtiva = async () => {
            try {
                const metas = await getMetasSonho(usuarioId);
                const ativa = metas.some(meta => meta.status === 'ATIVA');
                setMetaAtiva(ativa);
            } catch (error) {
                console.error('Erro ao verificar metas ativas:', error);
                setError('Erro ao verificar metas ativas.');
            }
        };

        verificarMetaAtiva();
    }, [usuarioId]);

    const formatarData = (data) => {
        const partes = data.split('-');
        return `${partes[2]}/${partes[1]}/${partes[0]}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (metaAtiva) {
            setError('Você já possui uma meta ativa. Conclua sua meta atual antes de criar uma nova.');
            setSuccess('');
            return;
        }

        const novaMeta = {
            titulo,
            descricao,
            valorAlvo: parseFloat(valorAlvo),
            valorEconomizado: 0.00,
            prazo: formatarData(prazo),
            usuarioId,
            status: 'ATIVA',
        };

        try {
            const result = await createMetaSonho(novaMeta);
            setSuccess(`Meta criada com sucesso: ${result.titulo} com valor alvo de ${formatarSaldo(result.valorAlvo)}`); 
            setTitulo('');
            setDescricao('');
            setValorAlvo('');
            setPrazo('');
            setError(null);
            setMetaAtiva(true);
        } catch (error) {
            setError('Erro ao criar a meta. Verifique os dados e tente novamente.');
            setSuccess('');
        }
    };

    return (
        <Container className="container">
            <h2 className="header-title text-center">Defina Sua Nova Meta</h2>
            <Form onSubmit={handleSubmit} className="despesa-border">
                {success && <Alert variant="success">{success}</Alert>}
                {error && <Alert variant="danger">{error}</Alert>}

                <Form.Group controlId="formTitulo">
                    <Form.Label>Título</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Digite o título da meta"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formDescricao">
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Digite a descrição da meta"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formValorAlvo">
                    <Form.Label>Valor Alvo</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Digite o valor alvo da meta"
                        value={valorAlvo}
                        onChange={(e) => setValorAlvo(e.target.value)}
                        step="0.01"
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formPrazo">
                    <Form.Label>Prazo</Form.Label>
                    <Form.Control
                        type="date"
                        value={prazo}
                        onChange={(e) => setPrazo(e.target.value)}
                        required
                    />
                </Form.Group>

                <div className="card-body-buttons">
                    <button type="submit" className="custom-button">Salvar</button>
                </div>
            </Form>
            <div>
                <Link to="/home" className="btn-voltar">
                    Página Principal
                </Link>
            </div>
        </Container>
    );
};

export default CriarMetaSonho;
