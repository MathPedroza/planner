import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./View.css";

const View = () => {
  const [user, setUser] = useState({});

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/get/${id}`)
      .then((resp) => {
        if (resp.data && resp.data[0]) {
          setUser({ ...resp.data[0] });
        } else {
          console.error("Nenhum dado encontrado para este ID.");
        }
      })
      .catch((error) => console.error("Erro ao buscar os dados:", error));
  }, [id]);

  return (
    <div style={{ marginTop: "150px" }}>
      <div className="card">
        <div className="card-header">
          <p>Detalhes do Lembrete</p>
        </div>
        <div className="container">
          <div className="info-item">
            <strong>ID:</strong> <span>{user.id}</span>
          </div>
          <div className="info-item">
            <strong>Descrição:</strong> <span>{user.descricao}</span>
          </div>
          <div className="info-item">
            <strong>Data:</strong> <span>{user.datalembrete}</span>
          </div>
          <div className="info-item">
            <strong>Categoria:</strong> <span>{user.categoria}</span>
          </div>
          <div className="info-item">
            <strong>Concluído:</strong> <span>{user.obs}</span>
          </div>
          <div className="info-item">
            <strong>Status:</strong> <span>{user.statusL}</span>
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
