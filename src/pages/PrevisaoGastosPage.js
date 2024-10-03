import React, { useEffect, useState } from 'react';
import { getPrevisaoGastos, updatePrevisaoGastos } from '../service/PrevisaoGastosServices';
import PrevisaoGastosForm from '../components/PrevisaoGastosForm';

const PrevisaoGastosPage = () => {
  const [previsaoGastos, setPrevisaoGastos] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const usuarioId = localStorage.getItem('usuarioId'); 

  useEffect(() => {
    const fetchPrevisaoGastos = async () => {
      if (usuarioId) {
        try {
          const response = await getPrevisaoGastos(usuarioId);
          console.log("Resposta da API:", response); 
          setPrevisaoGastos(response); 
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
    } catch (error) {
      console.error("Erro ao atualizar previsão de gastos", error);
      alert("Erro ao atualizar a previsão de gastos. Tente novamente mais tarde.");
    }
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
            <p><strong>Data de Revisão:</strong> {new Date(previsaoGastos.dataRevisao).toLocaleDateString()}</p>
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
