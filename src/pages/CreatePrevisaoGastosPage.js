import React, { useEffect, useState } from 'react';
import { createPrevisaoGastos, getPrevisaoGastos } from '../service/PrevisaoGastosServices';
import { useNavigate } from 'react-router-dom';
import PrevisaoGastosForm from '../components/PrevisaoGastosForm';

const CreatePrevisaoGastosPage = () => {
  const navigate = useNavigate();
  const usuarioId = '32300000-0000-0000-0000-000000000000'; // ID fixo
  const [previsaoExistente, setPrevisaoExistente] = useState(null);

  useEffect(() => {
    getPrevisaoGastos(usuarioId)
      .then(response => {
        if (response.data) {
          setPrevisaoExistente(response.data);
        }
      })
      .catch(error => {
        console.error("Erro ao buscar previsão de gastos", error);
      });
  }, [usuarioId]);

  const handleCreate = (previsaoGastos) => {
    if (previsaoExistente) {
      alert("Você já tem uma previsão de gastos para este mês.");
      return;
    }

    const previsaoGastosWithUser = { ...previsaoGastos, usuarioId };

    createPrevisaoGastos(previsaoGastosWithUser)
      .then(() => {
        alert("Previsão de gastos criada com sucesso!");
        navigate('/'); // Navegar para outra página após a criação
      })
      .catch(error => {
        console.error("Erro ao criar previsão de gastos", error);
      });
  };

  return (
    <div className="container mt-5">
      <h1>Criar Previsão de Gastos</h1>
      <PrevisaoGastosForm onSubmit={handleCreate} />
    </div>
  );
};

export default CreatePrevisaoGastosPage;
