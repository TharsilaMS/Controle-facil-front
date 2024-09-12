import React, { useState } from 'react';
import { createDespesa } from '../service/despesas';
import { Button, Form, Container, Spinner, Alert } from 'react-bootstrap';

const NovaDespesaForm = () => {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [categoria, setCategoria] = useState('');
  const [tipo, setTipo] = useState('FIXA'); // Tipo padrão
  const [loading, setLoading] = useState(false); // Estado de carregamento
  const [error, setError] = useState(null); // Estado de erro
  const usuarioId = '32300000-0000-0000-0000-000000000000'; // Definido como um valor fixo

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Inicia o carregamento
    setError(null); // Reseta o erro
    const despesa = { 
      usuarioId, 
      descricao, 
      valor, 
      categoriaDespesaNome: categoria,
      tipo
    };

    try {
      await createDespesa(despesa);
      // Depois de salvar, você pode redirecionar ou limpar o formulário
      setDescricao('');
      setValor('');
      setCategoria('');
      setTipo('FIXA'); // Resetar o tipo para o valor padrão
    } catch (err) {
      setError('Erro ao salvar despesa.'); // Define o erro
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  };

  return (
    <Container className="mt-4">
      <h2>Adicionar Nova Despesa</h2>
      <Form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
        {error && <Alert variant="danger">{error}</Alert>}
        <Form.Group controlId="formDescricao">
          <Form.Label>Descrição</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Digite a descrição da despesa"
            value={descricao} 
            onChange={(e) => setDescricao(e.target.value)} 
            required
          />
        </Form.Group>

        <Form.Group controlId="formValor">
          <Form.Label>Valor</Form.Label>
          <Form.Control 
            type="number" 
            placeholder="Digite o valor da despesa" 
            value={valor} 
            onChange={(e) => setValor(e.target.value)} 
            required
          />
        </Form.Group>

        <Form.Group controlId="formCategoria">
          <Form.Label>Categoria</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Digite a categoria da despesa" 
            value={categoria} 
            onChange={(e) => setCategoria(e.target.value)} 
            required
          />
        </Form.Group>

        <Form.Group controlId="formTipo">
          <Form.Label>Tipo</Form.Label>
          <Form.Control 
            as="select" 
            value={tipo} 
            onChange={(e) => setTipo(e.target.value)}
            required
          >
            <option value="FIXA">Fixa</option>
            <option value="VARIAVEL">Variável</option>
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? (
            <>
              <Spinner as="span" animation="border" size="sm" className="me-2" />
              Carregando...
            </>
          ) : (
            'Salvar'
          )}
        </Button>
      </Form>
    </Container>
  );
};

export default NovaDespesaForm;
