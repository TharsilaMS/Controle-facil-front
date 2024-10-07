import React, { useEffect, useState } from 'react'; 
import { getPrevisaoGastos, updatePrevisaoGastos } from '../../service/PrevisaoGastosServices';
import { formatarSaldo } from '../../utils'; 
import { Link } from 'react-router-dom';
import './PrevisaoGastos.css';

const PrevisaoGastosPage = () => {
  const [previsaoGastos, setPrevisaoGastos] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [warningMessage, setWarningMessage] = useState(''); 
  const usuarioId = localStorage.getItem('usuarioId'); 

  useEffect(() => {
    const fetchPrevisaoGastos = async () => {
      if (usuarioId) {
        try {
          const response = await getPrevisaoGastos(usuarioId);
          setPrevisaoGastos(response); 
          
          if (response && response.gastosAtuais > response.limiteGastos) {
            setWarningMessage('Atenção: Você ultrapassou sua previsão de gastos!'); 
          } else {
            setWarningMessage(''); 
          }
        } catch (error) {
          console.error("Erro ao buscar previsão de gastos", error);
          alert("Erro ao buscar a previsão de gastos. Tente novamente mais tarde.");
        }
      } else {
        alert("Usuário não encontrado. Por favor, faça o login novamente.");
      }
    };

    fetchPrevisaoGastos(); 
  }, [usuarioId]);

  const handleUpdate = async (updatedPrevisaoGastos) => {
    if (updatedPrevisaoGastos.limiteGastos <= 0) {
      alert("O limite de gastos deve ser um valor positivo.");
      return;
    }

    try {
      await updatePrevisaoGastos(usuarioId, updatedPrevisaoGastos);
      setEditMode(false);
      alert("Previsão de gastos atualizada com sucesso!");

      const response = await getPrevisaoGastos(usuarioId);
      setPrevisaoGastos(response); 
      
      if (response.gastosAtuais > response.limiteGastos) {
        setWarningMessage('Atenção: Você ultrapassou sua previsão de gastos!'); 
      } else {
        setWarningMessage(''); 
      }
    } catch (error) {
      console.error("Erro ao atualizar previsão de gastos", error);
      alert("Erro ao atualizar a previsão de gastos. Tente novamente mais tarde.");
    }
  };

  const handleCancel = () => {
    setEditMode(false);
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
        <button type="submit" className="btn btn-salvar">Salvar</button>
        <button type="button" className="btn btn-cancelar" onClick={onCancel}>Cancelar</button>
      </form>
    );
  };

  return (
    <div className="container mt-5">
      {previsaoGastos ? (
        <div className="card p-4">
          <h1 className="card-title">Previsão de Gastos</h1>
          <div className="card-text">
            <p><strong>Limite de Gastos:</strong> {formatarSaldo(previsaoGastos.limiteGastos)}</p>
            <p><strong>Gastos Atuais:</strong> {formatarSaldo(previsaoGastos.gastosAtuais)}</p>
            <p><strong>Data de Revisão:</strong> {new Date(previsaoGastos.dataRevisao).toLocaleDateString()}</p>
          </div>
          {warningMessage && ( 
            <div className="alert alert-warning">
              {warningMessage}
            </div>
          )}
          {editMode ? (
            <PrevisaoGastosForm 
              initialData={previsaoGastos}
              onSubmit={handleUpdate}
              onCancel={handleCancel}
            />
          ) : (
            <button className="btn btn-editar" onClick={() => setEditMode(true)}>Editar</button>
          )}
        </div>
      ) : (
        <p>Carregando...</p>
      )}
       <div>  
         <Link to="/home" className="btn btn-voltar mt-3">
           Página Principal
         </Link>
       </div>
    </div>
  );
};

export default PrevisaoGastosPage;
