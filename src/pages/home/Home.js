import React, { useEffect, useState } from 'react'; 
import { Card, Container, Spinner, Alert } from 'react-bootstrap';
import { getSaldo } from '../../service/SaldosApi';

const Home = () => {
  const [saldo, setSaldo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const usuarioId = localStorage.getItem('usuarioId'); 

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

    if (usuarioId) {
      fetchSaldo();
    } else {
      setError('Usuário não autenticado.');
      setLoading(false);
    }
  }, [usuarioId]);


  const formatarSaldo = (valor) => {
    if (valor === null || valor === undefined) return '0,00';
    return valor
      .toFixed(2)
      .replace('.', ',')
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.'); 
  };

  return (
    <Container className="mt-4" style={{ paddingTop: '80px' }}>
      <h1>Bem-vindo ao Controle Fácil</h1>
      {loading ? (
        <Spinner animation="border" />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Card className="mt-4">
          <Card.Body>
            <Card.Title>Saldo Atual</Card.Title>
            <div>
              <h2>{formatarSaldo(saldo)} R$</h2> 
            </div>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default Home;
