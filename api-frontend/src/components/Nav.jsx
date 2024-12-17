import './Nav.css';
import React from 'react';
import { Link } from 'react-router-dom'; // Importa React e o componente Link do React Router

// Componente funcional Nav
const Nav = () => {
  return ( 
    // Área lateral do menu
    <aside className="menu-area">
      <nav className="menu">
        {/* Link para a página inicial */}
        <Link to="/home">
          <i className="fa fa-home"></i> Início
        </Link>

        {/* Link para a página de Lembretes */}
        <Link to="/ViewLembrete">
          <i className="fa fa-sticky-note"></i> Lembretes
        </Link>

        {/* Link para a página Sobre */}
        <Link to="/sobre">
          <i className="fa fa-info-circle"></i> Sobre
        </Link>
      </nav>
    </aside>
  );
};

// Exporta o componente Nav para uso em outros arquivos
export default Nav;
