import React from 'react';
import { Link } from "react-router-dom";

function Welcome() {
  return (
    <>
      <h1 className="main-title">Bienvenidos a Laptop City</h1>
      <p className="main-description">
        Laptop City es una empresa con más de 20 años de experiencia en el rubro de la venta de computadoras. Contamos con las mejores notebooks al mejor precio. 
      </p>
      <Link to="/our-products" className="welcome-redirect-to-products">
        Conoce nuestros productos {'>>'}
      </Link>
    </>
  );
}

export default Welcome;