import { useState } from "react"; // Hook do React que permite o gerenciamento de estado no componente funcional
import './Sobre.css';

export default function Sobre() { 
  const [pessoas, setPessoas] = useState([ // Um array de objetos que contém informações sobre os desenvolvedores (nome, cargo e ID).
    {
      name: "João Victor Maraia Franco",
      worker: "Desenvolvedor Pleno React",
      id: 1,
    },
    {
      name: "Karyna Muniz Ferreira",
      worker: "Web Developer Jr",
      id: 2,
    },
    {
      name: "Lucas Silva Gouveia",
      worker: "Desenvolvedor Back-end Junior",
      id: 3,
    },
    {
      name: "Matheus Correia Pedroza",
      worker: "Coordenador de Tecnologia da Informação",
      id: 4,
    },
  ]);

  // Renderização do Componente
  return (
    <div>
      <div className="sobre-projeto" style={styles.container}>
        <h1 style={styles.title}>Sobre o Projeto</h1>
        <p style={styles.text}>
          Este projeto foi criado e idealizado pelos alunos de Análise e Desenvolvimento de Sistemas Web com o objetivo de demonstrar como usar React para desenvolver
          aplicações modernas e interativas. O Projeto em questão, trata-se de um cadastro de Lembretes, contendo as 04 funções básicas (Criar, Consultar, Atualizar, Deletar).
          A conexão é feita usando Banco de Dados MySQL.
          <br />
          <br />
          Ele é simples, escalável e fácil de manter, utilizando componentes reutilizáveis e boas práticas de desenvolvimento.
        </p>
        <p style={styles.text}>
          Agradecemos por visitar nossa página! Esperamos que ela inspire você a explorar ainda mais o poder do React.
        </p>
      </div>
      <br />
      <div style={styles.desenvolvedoresContainer}>
        <h3 style={styles.desenvolvedoresTitle}>Desenvolvedores</h3>
        <div className="sobre">
          {pessoas.map((pessoa) => ( // A função pessoas.map() percorre o array pessoas e retorna um bloco JSX para cada objeto
            <div className="pessoa-preview" key={pessoa.id} style={styles.pessoa}>
              <h2 style={styles.nome}>{pessoa.name}</h2>
              <p style={styles.cargo}>Cargo: {pessoa.worker}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

//Objeto styles contendo as propriedades de estilo aplicadas no JSX:
const styles = {
  container: {
    padding: "10px",
    maxWidth: "800px",
    margin: "0 auto",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "2rem",
    color: "#333",
    marginBottom: "10px",
  },
  text: {
    fontSize: "1.2rem",
    color: "#555",
    lineHeight: "1.5",
  },
  desenvolvedoresContainer: {
    maxWidth: "800px",
    margin: "0 auto",
    textAlign: "center",
    padding: "20px 0",
  },
  desenvolvedoresTitle: {
    fontSize: "1.8rem",
    marginBottom: "20px",
    color: "#333",
  },
  pessoa: {
    marginBottom: "15px",
    borderBottom: "1px solid #ddd",
    paddingBottom: "10px",
  },
  nome: {
    fontSize: "1.2rem",
    color: "#333",
  },
  cargo: {
    fontSize: "1rem",
    color: "#666",
  },
};
