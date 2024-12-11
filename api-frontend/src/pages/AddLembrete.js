import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./AddLembrete.css";

const initialState = {
  descricao: "",
  datalembrete: "",
  categoria: "",
  obs: "",
  statusL: "",
};

const AddLembrete = () => {
  const [state, setState] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const { descricao, datalembrete, categoria, obs, statusL } = state;

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      axios
        .get(`http://localhost:5000/api/get/${id}`)
        .then((resp) => {
          if (resp.data && resp.data[0]) {
            setState({ ...resp.data[0] });
          } else {
            toast.error("Lembrete não encontrado.");
          }
        })
        .catch(() => toast.error("Erro ao carregar os dados do lembrete."))
        .finally(() => setIsLoading(false));
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!descricao || !datalembrete || !categoria || !statusL) {
      toast.error("Por favor, preencha todos os campos obrigatórios!");
      return;
    }

    setIsLoading(true);

    const request = id
      ? axios.put(`http://localhost:5000/api/update/${id}`, state)
      : axios.post("http://localhost:5000/api/post", state);

    request
      .then(() => {
        setState(initialState);
        toast.success(id ? "Lembrete atualizado com sucesso!" : "Lembrete adicionado com sucesso!");
        navigate("/");
      })
      .catch((err) => toast.error(err.response?.data || "Erro ao salvar o lembrete."))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="add-lembrete-container">
      <h2>{id ? "Editar Lembrete" : "Adicionar Lembrete"}</h2>
      {isLoading && <p>Carregando...</p>}
      <form className="add-lembrete-form" onSubmit={handleSubmit}>
        {/* Primeira linha: Descrição e Data */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="descricao">Descrição do Lembrete:</label>
            <input
              id="descricao"
              name="descricao"
              type="text"
              placeholder="Digite uma descrição para o lembrete..."
              value={descricao}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="datalembrete">Data do Lembrete:</label>
            <input
              type="datetime-local"
              id="datalembrete"
              name="datalembrete"
              value={datalembrete}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Segunda linha: Categoria e Status */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="categoria">Categoria do Lembrete:</label>
            <select
              id="categoria"
              name="categoria"
              value={categoria}
              onChange={handleInputChange}
            >
              <option value="">Selecione uma categoria...</option>
              <option value="casa">Casa</option>
              <option value="estudo">Estudos</option>
              <option value="lazer">Lazer</option>
              <option value="importante">Importante</option>
              <option value="trabalho">Trabalho</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="statusL">Status do Lembrete:</label>
            <select
              id="statusL"
              name="statusL"
              value={statusL}
              onChange={handleInputChange}
            >
              <option value="">Selecione o Status do Lembrete...</option>
              <option value="P">Pendente</option>
              <option value="C">Concluído</option>
              <option value="E">Em andamento</option>
              <option value="F">Congelado</option>
            </select>
          </div>
        </div>

        {/* Terceira linha: Observação */}
        <div className="form-row">
          <div className="form-group full-width">
            <label htmlFor="obs">Observação:</label>
            <textarea
              id="obs"
              name="obs"
              placeholder="Digite alguma observação..."
              value={obs}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Botões */}
        <div className="form-buttons">
          <input
            type="submit"
            value={id ? "Atualizar" : "Salvar"}
            className="btn btn-primary"
            disabled={isLoading}
          />
          <Link to="/">
            <button type="button" className="btn btn-secondary" disabled={isLoading}>
              Voltar
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddLembrete;
