import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ProductList() {

  const [ buscado, setBuscado ] = useState(false);
  const [ products, setProducts ] = useState([])

  useEffect(() => {
    // fetch("http://localhost:3001/api/products")
    fetch("https://aenima-back-end.herokuapp.com/api/products/")
      .then(response => response.json())
      .then(data => {
        console.log(data.products);
        if(data.products){
          setProducts(data.products);
        }else{
          setBuscado(true)
          setProducts([]);
        }
      })
  }, [])

  return (
    <>
      <h1 className="main-title">Lista de Productos</h1>
      <section className="our-product-list">

        {
          products.length > 0 ? (
            products.map( (product, i) => {
              return (
                <article className="product-card" key={i}>
                  <figure>
                      {/* <img src={`http://localhost:3001${product.imageUrl}`} alt="imagen-producto" /> */}
                      <img src={`https://aenima-back-end.herokuapp.com${product.imageUrl}`} alt="imagen-producto" />
                  </figure>
                  <h2 className="article-name">{product.name}</h2>
                  <p  className="article-price">${product.price}</p>
                  <div className="article-buttons">
                    <Link to={`/product-detail/${product.id}`}><button><i className="far fa-eye"></i></button></Link>
                    <Link to={`/edit-product-form/${product.id}`}><button><i className="far fa-edit"></i></button></Link>
                    <Link to={`/delete-product-form/${product.id}`}><button><i className="fas fa-trash-alt"></i></button></Link>
                  </div>
                </article>
              )               
            }) 
          ) : (
            buscado === true ? (
              <div className="product-details-not-found">
                <h2>No hay productos en la base de datos</h2>
                <Link to="/create-new-product"> Por favor crea un nuevo producto</Link>
              </div>
            ) : (
              <div className="product-details-loading">
                <h1>Buscando...</h1>
                <span className="product-loader"></span>
              </div>
            )
          )
        }
      </section>
      
    </>
  );
}

export default ProductList;