import React, { useEffect, useState } from 'react';
import { getRendasByUsuarioId, updateRenda, deleteRenda } from '../../service/RendasApi';
import { Container, Row, Col, Card, ListGroup, Spinner, Alert, Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './Renda.css';
import { formatarSaldo } from '../../utils'; 
import { Link } from 'react-router-dom';
const RendasPage = () => {
    const [rendas, setRendas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedRenda, setSelectedRenda] = useState(null);
    const [formData, setFormData] = useState({
        descricao: '',
        valor: '',
        data: '',
        tipo: 'SALARIO' 
    });

    
    const [filtroTipo, setFiltroTipo] = useState('');

    const usuarioId = localStorage.getItem('usuarioId'); 

    useEffect(() => {
        const fetchRendas = async () => {
            setLoading(true); 
            try {
                const data = await getRendasByUsuarioId(usuarioId); 
                if (Array.isArray(data)) {
                    setRendas(data);
                } else {
                    throw new Error('Dados recebidos não são um array.');
                }
            } catch (error) {
                console.error("Erro ao buscar rendas:", error);
                setError('Falha ao carregar rendas.');
            } finally {
                setLoading(false);
            }
        };

        if (usuarioId) { 
            fetchRendas();
        }
    }, [usuarioId]); 

    const handleEditClick = (renda) => {
        setSelectedRenda(renda);
        setFormData({
            descricao: renda.descricao,
            valor: renda.valor,
            data: new Date(renda.data).toISOString().split('T')[0],
            tipo: renda.tipo 
        });
        setShowEditModal(true);
    };

    const handleDeleteClick = async (id) => {
        if (window.confirm('Você tem certeza que deseja excluir esta renda?')) {
            try {
                await deleteRenda(id);
                setRendas(rendas.filter((renda) => renda.id !== id));
            } catch (err) {
                setError('Falha ao excluir renda.');
            }
        }
    };

    const handleSaveChanges = async () => {
        const updatedRenda = {
            ...selectedRenda,
            ...formData,
            valor: parseFloat(formData.valor),
            data: new Date(formData.data).toISOString().split('T')[0],
        };

        try {
            await updateRenda(selectedRenda.id, updatedRenda);
            
            const updatedRendas = rendas.map((r) => (r.id === selectedRenda.id ? updatedRenda : r));
            setRendas(updatedRendas);
            setShowEditModal(false);
        } catch (err) {
            setError('Falha ao atualizar renda.');
        }
    };

    
    const getFilteredRendas = () => {
        return rendas.filter(renda => {
            return filtroTipo ? renda.tipo === filtroTipo : true;
        });
    };

    if (loading) {
        return (
            <Container className="mt-4 text-center">
                <h2>Minhas Receitas</h2>
                <Spinner animation="border" variant="primary" />
                <p className="mt-3">Carregando...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-4 text-center">
                <h2>Minhas Receitas</h2>
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container className="mt-4" >
            <h2 className="mb-4 text-center">Minhas Receitas</h2>
            
          
            <Form className="mb-4">
                <Form.Group controlId="filtroTipo">
                    <Form.Label>Filtrar por Tipo</Form.Label>
                    <Form.Select 
                        value={filtroTipo}
                        onChange={(e) => setFiltroTipo(e.target.value)}
                    >
                        <option value="">Selecione um tipo</option>
                        <option value="SALARIO">Salário</option>
                        <option value="FREELANCE">Freelance</option>
                        <option value="INVESTIMENTO">Investimento</option>
                        <option value="OUTRO">Outro</option>
                    </Form.Select>
                </Form.Group>
            </Form>

            <Row>
                {getFilteredRendas().map((renda) => (
                    <Col md={4} className="mb-3" key={renda.id}>
                        <Card>
                            <Card.Body className="text-center">
                                <Card.Title>{renda.descricao}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">
                                    {new Date(renda.data).toLocaleDateString()} 
                                </Card.Subtitle>
                                <Card.Text>
                                    Valor: <strong>{formatarSaldo(renda.valor)}</strong> 
                                </Card.Text>
                                <ListGroup variant="flush">
                                    <ListGroup.Item className="text-center">
                                        Tipo: <span className={`badge ${renda.tipo === 'SALARIO' ? 'bg-success' : 'bg-warning'}`}>
                                            {renda.tipo}
                                        </span>
                                    </ListGroup.Item>
                                </ListGroup>
                                <div className="d-flex justify-content-center mt-3">
                                    <Button variant="primary" onClick={() => handleEditClick(renda)} className="me-2">Editar</Button>
                                    <Button variant="danger" onClick={() => handleDeleteClick(renda.id)}>Excluir</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Renda</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="descricao" className="form-label">Descrição</label>
                            <input
                                type="text"
                                id="descricao"
                                className="form-control"
                                value={formData.descricao}
                                onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="valor" className="form-label">Valor</label>
                            <input
                                type="number"
                                id="valor"
                                className="form-control"
                                value={formData.valor}
                                onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="tipo" className="form-label">Tipo</label>
                            <select
                                id="tipo"
                                className="form-select"
                                value={formData.tipo}
                                onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                            >
                                <option value="SALARIO">Salário</option>
                                <option value="OUTRA">Outra</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="data" className="form-label">Data</label>
                            <input
                                type="date"
                                id="data"
                                className="form-control"
                                value={formData.data}
                                onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>Fechar</Button>
                    <Button variant="primary" onClick={handleSaveChanges}>Salvar Alterações</Button>
                </Modal.Footer>
            </Modal>
            <div>  <Link to="/home" className="btn-voltar">
            Página Principal
    </Link></div>
        </Container>
        
    );
    
};

export default RendasPage;
