import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./AddLembrete.css";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
    descricao: "",
    datalembrete: "",
    categoria: "",
    concluido: "",
};

const AddLembrete = () => {
    const [state, setState] = useState(initialState);

    const { descricao, datalembrete, categoria, concluido } = state;

    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/get/${id}`)
            .then((resp) => setState({ ...resp.data[0] }))
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!descricao || !datalembrete || !categoria || !concluido) {
            toast.error("Por favor, entre com um valor para cada campo");
        } else {
            if (!id) {
                axios.post("http://localhost:5000/api/post", {
                    descricao,
                    datalembrete,
                    categoria,
                    concluido,
                })
                    .then(() => {
                        setState({ descricao: "", datalembrete: "", categoria: "", concluido: "" })
                    })
                    .catch((err) => toast.error(err.response.data));
                toast.success("Lembrete adicionado com sucesso!");

            } else {
                axios.put(`http://localhost:5000/api/update/${id}`, {
                    descricao,
                    datalembrete,
                    categoria,
                    concluido,
                })
                    .then(() => {
                        setState({ descricao: "", datalembrete: "", categoria: "", concluido: "" })
                    })
                    .catch((err) => toast.error(err.response.data));
                toast.success("Lembrete alterado com sucesso!");
            }

            setTimeout(() => navigate("/"), 500);
        }
    };
    const handleInputChange = (e) => {
        const { descricao, value } = e.target;
        setState({ ...state, [descricao]: value });
    }

    return (
        <div style={{ marginTop: "100px" }}>
            <form style={{
                margin: "auto",
                padding: "15px",
                maxWidth: "400px",
                alignContent: "center"
            }}
                onSubmit={handleSubmit}
            >
                <label htmlFor="descricao">Descrição do Lembrete</label>
                <input
                    type="text"
                    id="descricao"
                    name="descricao"
                    placeholder="Digite uma descrição para o lembrete..."
                    value={descricao || ""}
                    on onChange={handleInputChange}
                />

                <br />
                <br />

                <label htmlFor="datalembrete">Data do Lembrete</label>
                <br />
                <input
                    type="date"
                    id="datalembrete"
                    name="datalembrete"
                    placeholder="Selecione a data do lembrete..."
                    value={datalembrete || ""}
                    on onChange={handleInputChange}
                />

                <br />
                <br />

                <label htmlFor="categoria">Categoria do Lembrete</label>
                <select size="lg" id="categoria"
                    name="categoria"
                    placeholder="Selecione uma categoria..."
                    value={categoria || ""}
                    on onChange={handleInputChange}>
                    <option>Importante</option>
                    <option>Casa</option>
                    <option>Trabalho</option>
                    <option>Lazer</option>
                </select>

                <br />
                <br />

                <input class="form-check-input" type="checkbox" id="defaultCheck1" value={concluido || ""}
                    on onChange={handleInputChange}/>
                    <label class="form-check-label" for="defaultCheck1">
                        Concluído
                    </label>

                    <br />
                    <br />

                    <input type="submit" value={id ? "Atualizar" : "Salvar"} />
                    <Link to="/">
                        <input type="button" value="Voltar" />
                    </Link>
            </form>
        </div>
    );
};

export default AddLembrete;