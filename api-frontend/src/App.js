import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import AddLembrete from './pages/AddLembrete';
import View from './pages/View';
import Footer from './components/Footer';
import Nav from './components/Nav';
import ViewLembrete from './pages/ViewLembrete';
import Home from './pages/home';
import Sobre from './pages/Sobre';

function App() {
  return (
    <Router>
      <div className="App">
        <Nav/>
        <ToastContainer position="top-center" />
        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/sobre" element={<Sobre />} />
          <Route path="/addLembrete" element={<AddLembrete />} />
          <Route path="/update/:id" element={<AddLembrete />} />
          <Route path="/ViewLembrete" element={<ViewLembrete />} />
          <Route path="/view/:id" element={<View />} />
        </Routes>
      </div>
      <Footer/>
    </Router>
  );
}

export default App;
