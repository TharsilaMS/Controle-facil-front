import React, { useEffect, useState } from 'react';
import { getAllRendas } from '../service/RendaApi';
import { Container, Row, Col, Card, ListGroup, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const RendasPage = () => {
    const [rendas, setRendas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRendas = async () => {
            try {
                const data = await getAllRendas();
                setRendas(data);
            } catch (error) {
                console.error("Erro ao buscar rendas:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRendas();
    }, []);

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" variant="primary" />
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
                                    <ListGroup.Item><strong>Valor:</strong> {renda.valor}</ListGroup.Item>
                                    <ListGroup.Item><strong>Data:</strong> {new Date(renda.data).toLocaleDateString()}</ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default RendasPage;
