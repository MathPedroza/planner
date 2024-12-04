import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from 'axios';
import "./View.css";

const View = () => {
    const [user, setUser] = useState({});

    const { id } = useParams();
    useEffect(() => {
        axios.get(`http://localhost/5000/api/get/${id}`)
            .then((resp) => setUser({ ...resp.data[0] }))
    }, [id]);

    return (
        <div style={{marginTop: "150px"}}>
            <div className="card">
                <div className="card-header">
                    <p>Adicionar lembrete</p>
                </div>
                <div className="container">
                    <strong>ID: </strong>
                    <span>{user.id}</span>
                    <br />
                    <br />
                    <strong>Descrição: </strong>
                    <span>{user.descricao}</span>
                    <br />
                    <br />
                    <strong>Data: </strong>
                    <span>{user.datalembrete}</span>
                    <br />
                    <br />
                    <strong>Categoria: </strong>
                    <span>{user.categoria}</span>
                    <br />
                    <br />
                    <strong>Concluído: </strong>
                    <span>{user.concluido}</span>
                    <br />
                    <br />
                    <Link to="/">
                    <div clasName="btn btn-edit">Voltar</div>
                    </Link>
                </div>
            </div>
            <h2>View</h2>
        </div>
    );
};

export default View