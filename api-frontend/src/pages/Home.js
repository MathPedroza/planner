import "./home.css";

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="display-4">Bem Vindo!</h1>
      <hr />
      <p className="mb-0">
        Sistema para exemplificar a construção de um cadastro de Lembretes!
      </p>
      <div className="tech-images">
        <img
          src="../assets/images/HTML5_logo.png" 
          alt="HTML"
          className="tech-icon"
        />
        <img
          src="../assets/images/css-3-logo-1.png" 
          alt="CSS"
          className="tech-icon"
        />
        <img
          src="../assets/images/React-icon.png" 
          alt="React"
          className="tech-icon"
        />
        <img
          src="../assets/images/JavaScript-Logo.png" 
          alt="Java"
          className="tech-icon"
        />
         <img
        src="../assets/images/Cadastro de Lembretes.png"
        alt="Imagem Central"
        className="center-image"
      />
      </div>
    </div>
  );
};

export default Home;
