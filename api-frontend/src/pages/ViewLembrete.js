import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import './ViewLembrete.css';

const ViewLembrete = () => {
    const [data, setData] = useState([]);

    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/api/get");
        setData(response.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    const deleteLembrete = (id) => {
        if (window.confirm("Tem certeza que deseja deletar o registro?")) {
            axios.delete(`http://localhost:5000/api/remove/${id}`);
            toast.success("Lembrete excluído com sucesso");
            setTimeout(() => loadData(), 500);
        }
    };

    // Mapeamento de status
    const getStatusLabel = (status) => {
        switch (status) {
            case "P":
                return "Pendente";
            case "C":
                return "Concluído";
            case "A":
                return "Atrasado";
            default:
                return "Desconhecido";
        }
    };

    return (
        <div style={{ marginTop: "80px" }}>
            <Link to="/addLembrete">
                <button className="btn btn-adicionar">Adicionar</button>
            </Link>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th style={{ textAlign: "left" }}>Id</th>
                        <th style={{ textAlign: "left" }}>Descrição</th>
                        <th style={{ textAlign: "center" }}>Data</th>
                        <th style={{ textAlign: "center" }}>Categoria</th>
                        <th style={{ textAlign: "left" }}>Observação</th>
                        <th style={{ textAlign: "center" }}>Status</th>
                        <th style={{ textAlign: "center" }}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={item.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.descricao}</td>
                            <td>{item.datalembrete}</td>
                            <td>{item.categoria}</td>
                            <td>{item.obs}</td>
                            <td>{getStatusLabel(item.statusL)}</td>
                            <td style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                                <Link to={`/update/${item.id}`}>
                                    <button className="btn btn-edit">Editar</button>
                                </Link>
                                <button className="btn btn-delete" onClick={() => deleteLembrete(item.id)}>Deletar</button>
                                <Link to={`/view/${item.id}`}>
                                    <button className="btn btn-view">Visualizar</button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewLembrete;
