import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Importe Navigate
import { ToastContainer } from 'react-toastify'; // Importa o ToastContainer para as notificações
import 'react-toastify/dist/ReactToastify.css'; // Importa os estilos do Toastify
import './App.css'; // Estilos gerais da aplicação
import AddLembrete from './pages/AddLembrete'; // Página de adicionar/editar lembrete
import View from './pages/View'; // Página para visualizar lembretes
import Footer from './components/Footer'; // Componente do rodapé
import Nav from './components/Nav'; // Componente de navegação
import ViewLembrete from './pages/ViewLembrete'; // Página de visualização de lembretes
import Home from './pages/home'; // Página inicial
import Sobre from './pages/Sobre'; // Página "Sobre" 

function App() {
  return (
    <Router>
      <div className="App">
        {/* Barra de navegação renderizada em todas as páginas */}
        <Nav />

        {/* Componente de Toastify para exibição de notificações */}
        <ToastContainer position="top-center" />

        <Routes>
          {/* Redireciona automaticamente para a página Home */}
          <Route path="/" element={<Navigate to="/home" />} /> 

          {/* Definição das rotas da aplicação */}
          <Route path="/home" element={<Home />} /> {/* Renderiza o componente Home quando a URL for /home. */}
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/addLembrete" element={<AddLembrete />} />
          <Route path="/update/:id" element={<AddLembrete />} />
          <Route path="/ViewLembrete" element={<ViewLembrete />} />
          <Route path="/view/:id" element={<View />} />
        </Routes>
      </div>

      {/* Rodapé renderizado em todas as páginas */}
      <Footer />
    </Router>
  );
}

export default App;
