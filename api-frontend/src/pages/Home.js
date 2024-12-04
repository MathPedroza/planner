import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import './Home.css';

const Home = () => {
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
            axios.delete(`http://localhost:5000/api/remove/${id}`)
            toast.success("Lembrete excluído com sucesso");
            setTimeout(() => loadData(), 500);
        }
    }

    return (
        <div style={{ marginTop: "150px" }}>
            <Link to="/addLembrete">
                <button className="btn btn-dangery">Adicionar</button>
            </Link>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th style={{ textAlign: "center" }}>Id.</th>
                        <th style={{ textAlign: "center" }}>Descrição.</th>
                        <th style={{ textAlign: "center" }}>Data.</th>
                        <th style={{ textAlign: "center" }}>Categoria.</th>
                        <th style={{ textAlign: "center" }}>Concluído.</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        return (
                            <tr key={item.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.Descrição}</td>
                                <td>{item.Data}</td>
                                <td>{item.Categoria}</td>
                                <td>{item.Concluído}</td>
                                <td>
                                    <Link to={`/update/${item.id}`}>
                                        <button className="btn btn-edit">Editar</button>
                                    </Link>
                                    <button className="btn btn-delete" onClick={() => deleteLembrete(item.id)}>Deletar</button>
                                    <Link to={`/view/${item.id}`}>
                                    </Link>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Home;