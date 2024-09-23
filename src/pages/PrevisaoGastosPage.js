import React, { useEffect, useState } from 'react';
import { getPrevisaoGastos, updatePrevisaoGastos } from '../service/PrevisaoGastosServices'
import PrevisaoGastosForm from '../components/PrevisaoGastosForm';

const PrevisaoGastosPage = () => {
  const usuarioId = '32300000-0000-0000-0000-000000000000'; // ID fixo
  const [previsaoGastos, setPrevisaoGastos] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    getPrevisaoGastos(usuarioId)
      .then(response => {
        setPrevisaoGastos(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar previsão de gastos", error);
        alert("Erro ao buscar a previsão de gastos. Tente novamente mais tarde.");
      });
  }, [usuarioId]);

  const handleUpdate = (updatedPrevisaoGastos) => {
    if (updatedPrevisaoGastos.limiteGastos <= 0) {
      alert("O limite de gastos deve ser um valor positivo.");
      return;
    }

    updatePrevisaoGastos(usuarioId, updatedPrevisaoGastos)
      .then(() => {
        setEditMode(false);
        alert("Previsão de gastos atualizada com sucesso!");
        return getPrevisaoGastos(usuarioId);
      })
      .then(response => {
        setPrevisaoGastos(response.data);
      })
      .catch(error => {
        console.error("Erro ao atualizar previsão de gastos", error);
        alert("Erro ao atualizar a previsão de gastos. Tente novamente mais tarde.");
      });
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  return (
    <div className="container mt-5">
      {previsaoGastos ? (
        <div className="card p-4">
          <h1 className="card-title">Previsão de Gastos</h1>
          <div className="card-text">
            <p><strong>Limite de Gastos:</strong> {previsaoGastos.limiteGastos}</p>
            <p><strong>Gastos Atuais:</strong> {previsaoGastos.gastosAtuais}</p>
            <p><strong>Data de Revisão:</strong> {previsaoGastos.dataRevisao}</p>
          </div>
          {editMode ? (
            <PrevisaoGastosForm 
              initialData={previsaoGastos}
              onSubmit={handleUpdate}
              onCancel={handleCancel}
            />
          ) : (
            <button className="btn btn-primary" onClick={() => setEditMode(true)}>Editar</button>
          )}
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default PrevisaoGastosPage;
