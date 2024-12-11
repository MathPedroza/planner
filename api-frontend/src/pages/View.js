import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./View.css";

const View = () => {
  const [user, setUser] = useState(null); // Inicializado como null para diferenciar entre "carregando" e "vazio"
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/get/${id}`)
      .then((resp) => {
        if (resp.data) {
          // Atualiza o estado com os dados recebidos
          setUser(resp.data);
        } else {
          console.error("Nenhum dado encontrado para este ID.");
        }
      })
      .catch((error) => console.error("Erro ao buscar os dados:", error));
  }, [id]);

  if (!user) {
    return <p>Carregando os dados...</p>; // Mensagem de carregamento enquanto os dados estão sendo buscados
  }

  return (
    <div style={{ marginTop: "150px" }}>
      <div className="card">
        <div className="card-header">
          <p>Detalhes do Lembrete</p>
        </div>
        <div className="container">
          <div className="info-item">
            <strong>ID:</strong> <span>{user.id || "N/A"}</span>
          </div>
          <div className="info-item">
            <strong>Descrição:</strong> <span>{user.descricao || "N/A"}</span>
          </div>
          <div className="info-item">
            <strong>Data:</strong> <span>{user.datalembrete || "N/A"}</span>
          </div>
          <div className="info-item">
            <strong>Categoria:</strong> <span>{user.categoria || "N/A"}</span>
          </div>
          <div className="info-item">
            <strong>Observação:</strong> <span>{user.obs || "N/A"}</span>
          </div>
          <div className="info-item">
            <strong>Status:</strong> <span>{user.statusL || "N/A"}</span>
          </div>
          <Link to="/">
            <button className="btn btn-edit">Voltar</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default View;
