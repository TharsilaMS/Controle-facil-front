import React, { useEffect, useState } from 'react';
import { Card, Container, Spinner, Alert, ProgressBar, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getSaldo } from '../service/SaldosApi';
import { formatarSaldo } from '../utils';
import { getPrevisaoGastos } from '../service/PrevisaoGastosServices';
import { getMetasSonho } from '../service/MetaSonhoService';
import Logout from '../components/Logout';
import './Home.css';

const Home = () => {
  const [saldo, setSaldo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [warningMessage, setWarningMessage] = useState('');
  const [previsaoGastos, setPrevisaoGastos] = useState(null);
  const [metaAtiva, setMetaAtiva] = useState(null);
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

    const fetchPrevisaoGastos = async () => {
      if (usuarioId) {
        try {
          const previsaoGastosData = await getPrevisaoGastos(usuarioId);
          setPrevisaoGastos(previsaoGastosData);
          if (previsaoGastosData) {
            if (previsaoGastosData.gastosAtuais > previsaoGastosData.limiteGastos) {
              const valorUltrapassado = previsaoGastosData.gastosAtuais - previsaoGastosData.limiteGastos;
              setWarningMessage(`Você ultrapassou seu limite por ${formatarSaldo(valorUltrapassado)}!`);
            } else {
              setWarningMessage(''); // Limpa a mensagem se não ultrapassou
            }
          }
        } catch (error) {
          console.error("Erro ao buscar previsão de gastos", error);
        }
      } else {
        setError('Usuário não autenticado.');
        setLoading(false);
      }
    };

    const fetchMetaAtiva = async () => {
      try {
        const metas = await getMetasSonho(usuarioId);
        const metaAtiva = metas.find(meta => meta.status === 'ATIVA');
        setMetaAtiva(metaAtiva);
      } catch (error) {
        console.error('Erro ao buscar metas dos sonhos', error);
      }
    };

    if (usuarioId) {
      fetchSaldo();
      fetchPrevisaoGastos();
      fetchMetaAtiva();
    } else {
      setError('Usuário não autenticado.');
      setLoading(false);
    }
  }, [usuarioId]);

  const calcularFaltaParaLimite = () => {
    if (previsaoGastos) {
      const { limiteGastos, gastosAtuais } = previsaoGastos;
      return limiteGastos - gastosAtuais;
    }
    return 0;
  };

  const faltaParaLimite = calcularFaltaParaLimite();

  const getProgressVariant = () => {
    if (!previsaoGastos) return 'primary';
    const { limiteGastos, gastosAtuais } = previsaoGastos;
    const porcentagem = (gastosAtuais / limiteGastos) * 100;

    if (porcentagem > 100) return 'danger';
    if (porcentagem >= 50) return 'warning';
    return 'success';
  };

  return (
    <Container className="mt-4">
      {warningMessage && (
        <Alert variant="warning" className="mt-3">
          {warningMessage}
        </Alert>
      )}

      <Row className="align-items-center">
        <Col>
          <h1>Bem-vindo(a) ao Controle Fácil </h1>
        </Col>
        <Col className="text-end">
          <Link to="/nova-despesa">
            <Button variant="primary" className="me-2">
              Adicionar Despesa
            </Button>
          </Link>
          <Link to="/create-renda">
            <Button variant="success">
              Adicionar Renda
            </Button>
          </Link>
          <Logout />
        </Col>
      </Row>
      {loading ? (
        <Spinner animation="border" />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <>
          <Card className="saldo-card">
          <Card.Title>Saldo Atual</Card.Title>
            <Card.Body>
              <div className="saldo-value-container">
                <h2>{formatarSaldo(saldo)}</h2>
              </div>
            </Card.Body>
          </Card>

          {previsaoGastos && (
            <Card className="mt-4">
              <Card.Body>
                <Card.Title>Painel de Gastos</Card.Title>
                <p>
                  <strong>Faltam: </strong> {formatarSaldo(faltaParaLimite)} para atingir seu limite.
                </p>
                <ProgressBar now={((previsaoGastos.gastosAtuais / previsaoGastos.limiteGastos) * 100) || 0} variant={getProgressVariant()} />
              </Card.Body>
            </Card>
          )}

          {metaAtiva && (
            <Card className="mt-4">
              <Card.Body>
                <Card.Title>Meta Ativa: {metaAtiva.titulo}</Card.Title>
                <p><strong>Valor Alvo:</strong> {formatarSaldo(metaAtiva.valorAlvo)}</p>
                <p><strong>Valor Economizado:</strong> {formatarSaldo(metaAtiva.valorEconomizado)}</p>
                <ProgressBar
                  now={((metaAtiva.valorEconomizado / metaAtiva.valorAlvo) * 100) || 0}
                  label={`${((metaAtiva.valorEconomizado / metaAtiva.valorAlvo) * 100).toFixed(2)}%`}
                  variant="info"
                />
              </Card.Body>
            </Card>
          )}
        </>
      )}
    </Container>
  );
};

export default Home;
