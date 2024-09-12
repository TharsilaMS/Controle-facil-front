import React, { useEffect, useState } from 'react';
import { getAllDespesas } from '../service/despesas';
import { Container, ListGroup, Spinner, Alert, Card } from 'react-bootstrap';

const DespesasPage = () => {
  const [despesas, setDespesas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDespesas() {
      try {
        const data = await getAllDespesas();
        setDespesas(data);
      } catch (err) {
        setError('Falha ao carregar despesas.');
      } finally {
        setLoading(false);
      }
    }
    fetchDespesas();
  }, []);

  if (loading) {
    return (
      <Container className="mt-4 text-center">
        <h1>Lista de Despesas</h1>
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Carregando...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <h1>Lista de Despesas</h1>
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Lista de Despesas</h1>
      <div className="row">
        {despesas.map((despesa) => (
          <div className="col-md-4 mb-3" key={despesa.id}>
            <Card>
              <Card.Body>
                <Card.Title>{despesa.descricao}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {new Date(despesa.data).toLocaleDateString()} {/* Formata a data */}
                </Card.Subtitle>
                <Card.Text>
                  Valor: <strong>R${despesa.valor.toFixed(2)}</strong>
                </Card.Text>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    Categoria: <span className="badge bg-primary">{despesa.categoriaDespesaNome}</span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Tipo: <span className={`badge ${despesa.tipo === 'FIXA' ? 'bg-success' : 'bg-warning'}`}>
                      {despesa.tipo}
                    </span>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default DespesasPage;
