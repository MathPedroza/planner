import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./AddLembrete.css";

// Estado inicial do lembrete
const initialState = {
  descricao: "",
  datalembrete: "",
  categoria: "",
  obs: "",
  statusL: "",
};

const AddLembrete = () => {
  // Estado do formulário e estado de carregamento
  const [state, setState] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const { descricao, datalembrete, categoria, obs, statusL } = state;

  const navigate = useNavigate();
  const { id } = useParams(); // Pega o ID dos parâmetros da URL

  // Efeito para buscar os dados do lembrete ao carregar a página se houver um ID
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/api/get/${id}`)
        .then((resp) => {
          if (resp.data) {
            setState({ ...resp.data }); // Atualiza o estado com os dados do lembrete
          } else {
            toast.error("Lembrete não encontrado.");
          }
        })
        .catch(() => toast.error("Erro ao carregar os dados do lembrete."));
    }
  }, [id]); // Executa o efeito quando o ID muda

  // Manipulador de mudança dos inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  // Manipulador de envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();

    // Valida se todos os campos obrigatórios foram preenchidos
    if (!descricao || !datalembrete || !categoria || !statusL) {
      toast.error("Por favor, preencha todos os campos obrigatórios!");
      return;
    }

    setIsLoading(true); // Inicia o estado de carregamento

    const request = id
      ? axios.put(`http://localhost:5000/api/update/${id}`, state) // Atualiza o lembrete se houver um ID
      : axios.post("http://localhost:5000/api/post", state); // Cria um novo lembrete se não houver ID

    request
      .then(() => {
        setState(initialState); // Reseta o formulário
        toast.success(id ? "Lembrete atualizado com sucesso!" : "Lembrete adicionado com sucesso!");
        navigate("/"); // Redireciona para a página inicial
      })
      .catch((err) => toast.error(err.response?.data || "Erro ao salvar o lembrete."))
      .finally(() => setIsLoading(false)); // Encerra o estado de carregamento
  };

  return (
    <div className="add-lembrete-container">
      <h2>{id ? "Editar Lembrete" : "Adicionar Lembrete"}</h2>
      {isLoading && <p>Carregando...</p>} {/* Exibe a mensagem de carregamento */}
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
              <option value="Casa">Casa</option>
              <option value="Estudos">Estudos</option>
              <option value="Lazer">Lazer</option>
              <option value="Importante">Importante</option>
              <option value="Trabalho">Trabalho</option>
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
          <Link to="/ViewLembrete">
            <button type="button" className="btn btn-secondary" disabled={isLoading}> {/* Altere a classe para 'btn-primary' */}
              Voltar
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddLembrete;

/* A propriedade disabled={isLoading} é usada para desabilitar um elemento HTML, como um botão, com base no valor de um estado booleano. 
Neste caso, isLoading é uma variável de estado que indica se uma operação está em andamento (carregando) ou não.

Quando isLoading é true, o botão é desabilitado e não pode ser clicado. Quando isLoading é false, o botão é habilitado e pode ser clicado normalmente. 
Isso é útil para evitar múltiplos cliques enquanto uma operação está sendo processada, como o envio de um formulário. */
