import React, { useState, useEffect } from "react"; // Importa os hooks useState e useEffect do React
import { Link } from "react-router-dom"; // Importa o componente Link para navegação
import { toast } from "react-toastify"; // Importa o toast para notificações
import axios from "axios"; // Importa o axios para fazer requisições HTTP
import './ViewLembrete.css'; // Importa o arquivo CSS para estilização

const ViewLembrete = () => {
    const [data, setData] = useState([]); // Estado para armazenar os dados dos lembretes

    // Função para carregar os dados dos lembretes
    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/api/get"); // Faz uma requisição GET para obter os lembretes
        setData(response.data); // Atualiza o estado com os dados recebidos
    };

    // useEffect para carregar os dados quando o componente é montado
    useEffect(() => {
        loadData(); // Chama a função loadData para carregar os dados
    }, []); // O array vazio [] significa que este efeito roda apenas uma vez, quando o componente é montado

    // Função para deletar um lembrete
    const deleteLembrete = (id) => {
        if (window.confirm("Tem certeza que deseja deletar o registro?")) { // Confirmação antes de deletar
            axios.delete(`http://localhost:5000/api/remove/${id}`); // Faz uma requisição DELETE para remover o lembrete
            toast.success("Lembrete excluído com sucesso"); // Exibe uma notificação de sucesso
            setTimeout(() => loadData(), 500); // Recarrega os dados após um pequeno atraso
        }
    };

    // Função para mapear o status do lembrete para um rótulo legível
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

    // Função para formatar a data e hora
    const formatDateTime = (dateTime) => {
        if (!dateTime) return "N/A"; // Retorna "N/A" se não houver data e hora
        const dateObj = new Date(dateTime); // Cria um objeto Date
        const formattedDate = dateObj.toLocaleDateString("pt-BR"); // Formata a data
        const formattedTime = dateObj.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
        }); // Formata a hora
        return `${formattedDate} ${formattedTime}`; // Retorna a data e hora formatadas
    };

    return (
        <div className="container" style={{ marginTop: "80px" }}>
            <Link to="/addLembrete">
                <button className="btn btn-adicionar">Adicionar</button> {/* Botão para adicionar um novo lembrete */}
            </Link>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th style={{ textAlign: "left" }}>Id</th>
                        <th style={{ textAlign: "left" }}>Descrição</th>
                        <th style={{ textAlign: "center" }}>Data</th>
                        <th style={{ textAlign: "center" }}>Categoria</th>
                        <th style={{ textAlign: "left" }}>Status</th>
                        <th style={{ textAlign: "center" }}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => ( // Mapeia cada lembrete para uma linha da tabela
                        <tr key={item.id} className={item.statusL === "C" ? "concluido" : ""}> {/* Aplica a classe "concluido" se o status for "C" */}
                            <th scope="row">{index + 1}</th> {/* Índice do lembrete */}
                            <td>{item.descricao}</td> {/* Descrição do lembrete */}
                            <td>{formatDateTime(item.datalembrete)}</td> {/* Data do lembrete formatada */}
                            <td>{item.categoria}</td> {/* Categoria do lembrete */}
                            <td>{getStatusLabel(item.statusL)}</td> {/* Status do lembrete */}
                            <td style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                                <Link to={`/update/${item.id}`}>
                                    <button className="btn btn-edit">Editar</button> {/* Botão para editar o lembrete */}
                                </Link>

                                <button className="btn btn-delete" onClick={() => deleteLembrete(item.id)}>Deletar</button> {/* Botão para deletar o lembrete */}
                                <Link to={`/view/${item.id}`}>
                                    <button className="btn btn-view">Visualizar</button> {/* Botão para visualizar o lembrete */}
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

/* useState é usado para gerenciar o estado local do componente, como os dados dos lembretes (data). useEffect é usado para executar um efeito colateral,
como carregar dados ao montar o componente.

Funções Async: loadData é uma função assíncrona que busca dados da API e atualiza o estado.

Manipulação de Dados: As funções deleteLembrete, getStatusLabel, e formatDateTime são usadas para gerenciar a exclusão de lembretes, mapear o status para 
rótulos legíveis, e formatar a data e hora, respectivamente. */
