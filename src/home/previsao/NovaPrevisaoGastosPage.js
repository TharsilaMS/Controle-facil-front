import React, { useEffect, useState } from 'react'; 
import { createPrevisaoGastos, getPrevisaoGastos } from '../../service/PrevisaoGastosServices';
import { Link } from 'react-router-dom';
import { Button, Form, Container, Alert } from 'react-bootstrap';
import './PrevisaoGastos.css';
import '../../components/Button.css';

const CriarPrevisaoGastosPage = () => {
  const usuarioId = localStorage.getItem('usuarioId');
  const [previsaoExistente, setPrevisaoExistente] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(''); 
  const [alertType, setAlertType] = useState(''); 

  useEffect(() => {
    const fetchPrevisaoGastos = async () => {
      if (usuarioId) {
        try {
          const response = await getPrevisaoGastos(usuarioId);
          if (response) {
            setPrevisaoExistente(response); 
          }
        } catch (error) {
          console.error("Erro ao buscar previsão de gastos", error);
          setAlertType('danger'); 
        }
      }
    };

    fetchPrevisaoGastos();
  }, [usuarioId]);

  const handleCreate = async (previsaoGastos) => {
    if (previsaoExistente) {
      setMessage("Você já tem uma previsão de gastos para este mês."); 
      setAlertType('warning'); 
      return;
    }

    const previsaoGastosWithUser = { ...previsaoGastos, usuarioId };

    setLoading(true); 
    try {
      await createPrevisaoGastos(previsaoGastosWithUser);
      setMessage("Previsão de gastos criada com sucesso!"); 
      setAlertType('success'); 
      setPrevisaoExistente(previsaoGastosWithUser); 
    } catch (error) {
      console.error("Erro ao criar previsão de gastos", error);
      setMessage("Erro ao criar previsão de gastos"); 
      setAlertType('danger'); 
    } finally {
      setLoading(false); 
    }
  };

  const PrevisaoGastosForm = ({ onSubmit, initialData = {}, onCancel }) => {
    const [limiteGastos, setLimiteGastos] = useState(initialData.limiteGastos || '');
    const [dataRevisao, setDataRevisao] = useState(initialData.dataRevisao || '');

    const handleSubmit = (e) => {
      e.preventDefault();
      const previsaoGastos = {
        limiteGastos,
        dataRevisao,
      };
      onSubmit(previsaoGastos);
    };

    return (
      <Form onSubmit={handleSubmit} className="despesa-border p-4 shadow-sm mt-3 category-background">
        <Form.Group className="mb-3">
          <Form.Label>Previsão de Gastos</Form.Label>
          <Form.Control 
            type="number"
            value={limiteGastos}
            onChange={(e) => setLimiteGastos(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Data de Revisão</Form.Label>
          <Form.Control 
            type="date"
            value={dataRevisao}
            onChange={(e) => setDataRevisao(e.target.value)}
            required
          />
        </Form.Group>
        
        <div className="card-body-buttons">
          <Button variant="success" type="submit">Salvar</Button>
          <Button variant="secondary" onClick={onCancel} className="ms-2">Cancelar</Button>
        </div>
      </Form>
    );
  };

  return (
    <Container className="mt-5">
      <h2 className="header-title">Criar Previsão de Gastos</h2>
      {loading && <div>Carregando...</div>} 
      <PrevisaoGastosForm onSubmit={handleCreate} />
      {message && (
        <Alert variant={alertType} className="mt-3">
          {message}
        </Alert>
      )} 
      <Link to="/home" className="btn-voltar">
        Página Principal
      </Link>
    </Container>
  );
};

export default CriarPrevisaoGastosPage;
