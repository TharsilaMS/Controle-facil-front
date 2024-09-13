import React, { useEffect, useState } from 'react';
import { getAllDespesas, updateDespesa, deleteDespesa } from '../service/despesas';
import { Container, ListGroup, Spinner, Alert, Card, Button, Modal } from 'react-bootstrap';
import './DespesasPage.css'; // Importar o arquivo CSS personalizado

const DespesasPage = () => {
  const [despesas, setDespesas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDespesa, setSelectedDespesa] = useState(null);
  const [formData, setFormData] = useState({
    descricao: '',
    valor: '',
    categoriaDespesaNome: '',
    tipo: '',
    data: '',
  });

  useEffect(() => {
    async function fetchDespesas() {
      try {
        const data = await getAllDespesas();
        if (Array.isArray(data)) {
          setDespesas(data);
        } else {
          throw new Error('Dados recebidos não são um array.');
        }
      } catch (err) {
        setError('Falha ao carregar despesas.');
      } finally {
        setLoading(false);
      }
    }
    fetchDespesas();
  }, []);

  const handleEditClick = (despesa) => {
    setSelectedDespesa(despesa);
    setFormData({
      descricao: despesa.descricao,
      valor: despesa.valor,
      categoriaDespesaNome: despesa.categoriaDespesaNome,
      tipo: despesa.tipo,
      data: new Date(despesa.data).toISOString().split('T')[0],
    });
    setShowEditModal(true);
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm('Você tem certeza que deseja excluir esta despesa?')) {
      try {
        await deleteDespesa(id);
        setDespesas(despesas.filter((despesa) => despesa.id !== id));
      } catch (err) {
        setError('Falha ao excluir despesa.');
      }
    }
  };

  const handleSaveChanges = async () => {
    const updatedDespesa = {
      ...selectedDespesa,
      ...formData,
      valor: parseFloat(formData.valor),
      data: new Date(formData.data).toISOString().split('T')[0],
    };

    try {
      await updateDespesa(selectedDespesa.id, updatedDespesa);
      setDespesas(despesas.map((d) => (d.id === selectedDespesa.id ? updatedDespesa : d)));
      setShowEditModal(false);
    } catch (err) {
      setError('Falha ao atualizar despesa.');
    }
  };

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
      <Container className="mt-4 text-center">
        <h1>Lista de Despesas</h1>
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h1 className="mb-4 text-center">Lista de Despesas</h1>
      <div className="row">
        {despesas.map((despesa) => (
          <div className="col-md-4 mb-3" key={despesa.id}>
            <Card>
              <Card.Body className="text-center">
                <Card.Title>{despesa.descricao}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {new Date(despesa.data).toLocaleDateString()} 
                </Card.Subtitle>
                <Card.Text>
                  Valor: <strong>R${despesa.valor.toFixed(2)}</strong>
                </Card.Text>
                <ListGroup variant="flush">
                  <ListGroup.Item className="text-center">
                    Categoria: <span className="badge bg-primary">{despesa.categoriaDespesaNome}</span>
                  </ListGroup.Item>
                  <ListGroup.Item className="text-center">
                    Tipo: <span className={`badge ${despesa.tipo === 'FIXA' ? 'bg-success' : 'bg-warning'}`}>
                      {despesa.tipo}
                    </span>
                  </ListGroup.Item>
                </ListGroup>
                <div className="d-flex justify-content-center mt-3">
                  <Button variant="primary" onClick={() => handleEditClick(despesa)} className="me-2">Editar</Button>
                  <Button variant="danger" onClick={() => handleDeleteClick(despesa.id)}>Excluir</Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Despesa</Modal.Title>
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
              <label htmlFor="categoriaDespesaNome" className="form-label">Categoria</label>
              <input
                type="text"
                id="categoriaDespesaNome"
                className="form-control"
                value={formData.categoriaDespesaNome}
                onChange={(e) => setFormData({ ...formData, categoriaDespesaNome: e.target.value })}
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
                <option value="FIXA">Fixa</option>
                <option value="VARIAVEL">Variável</option>
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
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancelar</Button>
          <Button variant="primary" onClick={handleSaveChanges}>Salvar</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default DespesasPage;
