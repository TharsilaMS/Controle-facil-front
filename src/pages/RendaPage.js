import React, { useEffect, useState } from 'react';
import { getRendasByUsuarioId, updateRenda, deleteRenda } from '../service/RendasApi';
import { Container, Row, Col, Card, ListGroup, Spinner, Alert, Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './RendaPage.css';

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
    });
    
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
            setRendas(rendas.map((r) => (r.id === selectedRenda.id ? updatedRenda : r)));
            setShowEditModal(false);
        } catch (err) {
            setError('Falha ao atualizar renda.');
        }
    };

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" variant="primary" />
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-4 text-center">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container className="mt-5" style={{ paddingTop: '80px' }}>
            <h1 className="mb-4">Rendas</h1>
            <Row>
                {rendas.map(renda => (
                    <Col md={6} lg={4} key={renda.id} className="mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>{renda.descricao}</Card.Title>
                                <ListGroup variant="flush">
                                    <ListGroup.Item><strong>Valor:</strong> R${renda.valor.toFixed(2)}</ListGroup.Item>
                                    <ListGroup.Item><strong>Data:</strong> {new Date(renda.data).toLocaleDateString()}</ListGroup.Item>
                                </ListGroup>
                                <div className="d-flex justify-content-between mt-3">
                                    <Button variant="primary" onClick={() => handleEditClick(renda)}>Editar</Button>
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
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancelar</Button>
                    <Button variant="primary" onClick={handleSaveChanges}>Salvar</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default RendasPage;
