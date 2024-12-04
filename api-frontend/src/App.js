import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import './App.css';
import AddLembrete from './pages/AddLembrete';
import View from './pages/View';

function App() {
  return (
    <Router>
      <div className="App">
        <ToastContainer position="top-center" />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/addLembrete" element={<AddLembrete />} />
          <Route path="/update/:id" element={<AddLembrete />} />
          <Route path="/view/:id" element={<View />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


/* import { BrowserRouter, Routes, Route } from 'react-router-dom'; */ 