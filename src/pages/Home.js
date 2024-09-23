import React, { useEffect, useState } from 'react';
import { Card, Container, Spinner, Alert } from 'react-bootstrap';
import { getSaldo } from '../service/SaldoApi'; 

const Home = () => {
  const [saldo, setSaldo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const usuarioId = '32300000-0000-0000-0000-000000000000'; 

  useEffect(() => {
    const fetchSaldo = async () => {
      try {
        const saldoData = await getSaldo(usuarioId);
        setSaldo(saldoData.saldo);
      } catch (err) {
        setError('Erro ao carregar o saldo.');
      } finally {
        setLoading(false);
      }
    };

    fetchSaldo();
  }, [usuarioId]);

  return (
    <Container className="mt-4"style={{ paddingTop: '80px' }}>
      <h1>Bem-vindo ao Controle Fácil</h1>
      {loading ? (
        <Spinner animation="border" />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Card className="mt-4">
          <Card.Body>
            <Card.Title>Saldo Atual</Card.Title>
            <Card.Text>
              <h2>{saldo ? saldo.toFixed(2) : '0.00'} R$</h2>
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default Home;
