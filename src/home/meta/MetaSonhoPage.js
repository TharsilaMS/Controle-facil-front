import React, { useState, useEffect, useCallback } from 'react';  
import { Link } from 'react-router-dom'; 
import { getMetasSonho, adicionarValorMeta, updateMetaSonho, deleteMetaSonho } from '../../service/MetaSonhoService'; 
import './MetaSonho.css'
const MetaSonhoList = () => {
  const [metas, setMetas] = useState([]);
  const [valorAdicional, setValorAdicional] = useState({});
  const [editandoMeta, setEditandoMeta] = useState(null); 
  const [metaEditada, setMetaEditada] = useState({}); 
  const usuarioId = localStorage.getItem('usuarioId'); 

  const fetchMetas = useCallback(async () => {
    try {
      const fetchedMetas = await getMetasSonho(usuarioId); 
      setMetas(fetchedMetas);
    } catch (error) {
      console.error('Erro ao buscar metas:', error);
    }
  }, [usuarioId]);

  useEffect(() => {
    fetchMetas();
  }, [fetchMetas]);

  const handleInputChange = (metaId, value) => {
    setValorAdicional({
      ...valorAdicional,
      [metaId]: value
    });
  };

  const handleAdicionarValor = async (metaId) => {
    try {
      const valor = parseFloat(valorAdicional[metaId] || 0);
      if (isNaN(valor) || valor <= 0) {
        alert('Por favor, insira um valor válido.');
        return;
      }

      await adicionarValorMeta(metaId, valor);

      const metaAtualizada = metas.find(meta => meta.id === metaId);
      if (metaAtualizada.valorEconomizado + valor >= metaAtualizada.valorAlvo) {
        alert('Parabéns! Você atingiu sua meta!');
      }

      alert('Valor adicionado com sucesso!');
      setValorAdicional({ ...valorAdicional, [metaId]: '' });
      fetchMetas();
    } catch (error) {
      console.error('Erro ao adicionar valor à meta:', error);
      alert('Erro ao adicionar valor.');
    }
  };

  const handleEditarMeta = (meta) => {
    setEditandoMeta(meta.id); 
    setMetaEditada(meta); 
  };

  const handleSalvarEdicao = async (metaId) => {
    try {
      await updateMetaSonho(metaId, metaEditada);
      alert('Meta editada com sucesso!');
      setEditandoMeta(null); 
      fetchMetas();
    } catch (error) {
      console.error('Erro ao editar a meta:', error);
      alert('Erro ao editar a meta.');
    }
  };

  const handleExcluirMeta = async (metaId) => {
    try {
      if (window.confirm('Tem certeza que deseja excluir esta meta?')) {
        await deleteMetaSonho(metaId);
        alert('Meta excluída com sucesso!');
        fetchMetas();
      }
    } catch (error) {
      console.error('Erro ao excluir a meta:', error);
      alert('Erro ao excluir a meta.');
    }
  };

  return (
    <div>
      <h2 className='title-meta'>Metas</h2>
      {metas.length === 0 ? (
        <p>Você não tem nenhuma meta estabelecida ainda.</p>
      ) : (
        <ul className="list-group">
          {metas.map(meta => (
            <li key={meta.id} className={`list-group-item d-flex justify-content-between align-items-center ${meta.valorEconomizado >= meta.valorAlvo ? 'bg-success text-white' : ''}`}>
              <div>
                {editandoMeta === meta.id ? (
                  <div >
                    <input
                      type="text"
                      value={metaEditada.titulo}
                      onChange={(e) => setMetaEditada({ ...metaEditada, titulo: e.target.value })}
                      className="form-control"
                    />
                    <textarea
                      value={metaEditada.descricao}
                      onChange={(e) => setMetaEditada({ ...metaEditada, descricao: e.target.value })}
                      className="form-control mt-2"
                    />
                    <button className="btn btn-success mt-2" onClick={() => handleSalvarEdicao(meta.id)}>
                      Salvar Edição
                    </button>
                  </div>
                ) : (
                  <div>
                    <strong>{meta.titulo}</strong>: {meta.descricao}
                    <br />
                    (Alvo: R$ {meta.valorAlvo}, Economizado: R$ {meta.valorEconomizado})
                  </div>
                )}
              </div>

              <div className='edicao'>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Adicione um valor"
                  value={valorAdicional[meta.id] || ''}
                  onChange={(e) => handleInputChange(meta.id, e.target.value)}
                  disabled={meta.valorEconomizado >= meta.valorAlvo}
                />
                <button
                  className="btn btn-primary mt-2"
                  onClick={() => handleAdicionarValor(meta.id)}
                  disabled={meta.valorEconomizado >= meta.valorAlvo}
                >
                  Adicionar
                </button>
                {editandoMeta !== meta.id && (
                  <>
                    <button className="btn btn-warning mt-2" onClick={() => handleEditarMeta(meta)}>
                      Editar
                    </button>
                    <button className="btn btn-danger mt-2" onClick={() => handleExcluirMeta(meta.id)}>
                      Excluir
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      
      <div className="text-center">
        <Link to="/home" className="btn btn-secondary mt-3">
          Página Principal
        </Link>
      </div>
    </div>
  );
};

export default MetaSonhoList;
