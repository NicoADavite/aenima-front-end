import React from 'react';
import { Link } from 'react-router-dom';

import '../assets/css/header.css';

import Home from './Home.js';
import Logo from './Logo.js';
import NuestrosProductos from './NuestrosProductos.js';
import Lupa from './Lupa.js';
import CrearNuevoProducto from './CrearNuevoProducto'


function Header() {
  return (
    <header className="header" >
      < Logo />
      < nav className="header-nav-bar" >
        <ul >
          <li>
            <Link to="/" >
              < Home className="home"/>
            </Link>
          </li>
           <li>
            <Link to="/our-products" >
              < NuestrosProductos className="our-products" />
            </Link>
          </li>
          <li>
            <Link to="/search-form" >
              < Lupa className="header-search-form" />
            </Link>
          </li>
          <li>
            <Link to="/create-new-product" >
              < CrearNuevoProducto className="new-product" />
            </Link>
            
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;