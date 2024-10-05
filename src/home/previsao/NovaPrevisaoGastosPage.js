import React, { useEffect, useState } from 'react'; 
import { createPrevisaoGastos, getPrevisaoGastos } from '../../service/PrevisaoGastosServices';
import { Link} from 'react-router-dom';
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
          setMessage("Erro ao buscar previsão de gastos"); 
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
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Limite de Gastos:</label>
          <input 
            type="number"
            className="form-control"
            value={limiteGastos}
            onChange={(e) => setLimiteGastos(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Data de Revisão:</label>
          <input 
            type="date"
            className="form-control"
            value={dataRevisao}
            onChange={(e) => setDataRevisao(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">Salvar</button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
      </form>
    );
  };

  return (
    <div className="container mt-5">
      <h1>Criar Previsão de Gastos</h1>
      {loading && <div>Carregando...</div>} 
      <PrevisaoGastosForm onSubmit={handleCreate} />
      {message && (
        <div className={`alert alert-${alertType} mt-3`} role="alert">
          {message}
        </div>
      )} 
        <div>  <Link to="/home" className="btn btn-secondary mt-3">
        Voltar para Home
    </Link></div>
    </div>
    
  );
};

export default CriarPrevisaoGastosPage;
