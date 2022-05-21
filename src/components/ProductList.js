import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ProductList() {

  const [ products, setProducts ] = useState([])

  useEffect(() => {
    fetch("https://aenima-back-end.herokuapp.com/api/products/")
      .then(response => response.json())
      .then(data => {
        console.log(data.products);
        if(data.products){
          setProducts(data.products);
        }else{
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
                      <img src={`https://aenima-back-end.herokuapp.com/${product.imageUrl}`} alt="imagen-producto" />
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
            <div className="product-details-not-found">
              <h2>no hay productos en la base de datos</h2>
              <Link to="/create-new-product"> Por favor crea un nuevo producto</Link>
            </div>
          )
        }
      </section>
      
    </>
  );
}

export default ProductList;