import React, { useEffect, useState } from 'react'; 
import { createPrevisaoGastos, getPrevisaoGastos } from '../service/PrevisaoGastosServices';
import PrevisaoGastosForm from '../components/PrevisaoGastosForm';

const CreatePrevisaoGastosPage = () => {
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
    </div>
  );
};

export default CreatePrevisaoGastosPage;
