import React, { useState } from 'react';

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

export default PrevisaoGastosForm;
