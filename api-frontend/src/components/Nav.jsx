import './Nav.css';
import React from 'react';
import { Link } from 'react-router-dom';
import Home from '../pages/home';
import Sobre from '../pages/Sobre';

export default props =>
    <aside className="menu-area">
        <nav className="menu">
            <Link to="/home">
                <i className="fa fa-home"></i> Início
            </Link>
            <Link to="/ViewLembrete">
                <i className="fa fa-users"></i> Lembretes
            </Link>
            <Link to="/sobre">
                <i className="fa fa-users"></i> Sobre
            </Link>
        </nav>
    </aside>