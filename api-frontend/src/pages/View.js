import React, { useState, useEffect } from "react"; // Importa os hooks useState e useEffect do React
import { useParams, Link } from "react-router-dom"; // Hooks do react-router-dom usados para navegar entre páginas e acessar parâmetros da URL.
import axios from "axios"; //Biblioteca para realizar requisições HTTP.
import "./View.css";

const View = () => {
  const [user, setUser] = useState(null); // Inicializado como null para diferenciar entre "carregando" e "vazio"
  const { id } = useParams(); //Capturado dos parâmetros da URL

  useEffect(() => {
    axios
      .get(`http://localhost:25568/api/get/${id}`)
      .then((resp) => {
        if (resp.data) {
          // Atualiza o estado com os dados recebidos
          setUser(resp.data); //Atualiza o estado user com os dados retornados
        } else {
          console.error("Nenhum dado encontrado para este ID.");
        }
      })
      .catch((error) => console.error("Erro ao buscar os dados:", error));
  }, [id]);

  if (!user) {
    return <p>Carregando os dados...</p>; // Mensagem de carregamento enquanto os dados estão sendo buscados
  }

  // Mapeamento de status
  const getStatusLabel = (status) => {
    switch (status) {
      case "P":
        return "Pendente";
      case "C":
        return "Concluído";
      case "E":
        return "Em andamento";
      case "F":
        return "Congelado";
      default:
        return "Desconhecido";
    }
  };

  // Formatação de data e hora
  const formatDateTime = (dateTime) => {
    if (!dateTime) return "N/A";
    const dateObj = new Date(dateTime);
    const formattedDate = dateObj.toLocaleDateString("pt-BR");
    const formattedTime = dateObj.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${formattedDate} ${formattedTime}`;
  };

  // Renderização do Componente
  return (
    <div style={{ marginTop: "100px" }}> {/* para afastar o conteúdo do topo. */}
      <div className="card">
        <div className="card-header">
          <p>Detalhes do Lembrete</p>
        </div>
        <div className="container">
          <div className="info-item">
            <strong>ID:</strong> <span>{user.id || "N/A"}</span> {/* Caso um campo esteja vazio, exibe "N/A". */}
          </div>
          <div className="info-item">
            <strong>Descrição:</strong> <span>{user.descricao || "N/A"}</span>
          </div>
          <div className="info-item">
            <strong>Data:</strong> <span>{formatDateTime(user.datalembrete) || "N/A"}</span>
          </div>
          <div className="info-item">
            <strong>Categoria:</strong> <span>{user.categoria || "N/A"}</span>
          </div>
          <div className="info-item">
            <strong>Observação:</strong> <span>{user.obs || "N/A"}</span>
          </div>
          <div className="info-item">
            <strong>Status:</strong> <span>{getStatusLabel(user.statusL) || "N/A"}</span>
          </div>
          <Link to="/ViewLembrete">
            <button className="btn btn-success">Voltar</button> {/* Aqui é onde aplicamos a classe 'btn-success' */}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default View;
