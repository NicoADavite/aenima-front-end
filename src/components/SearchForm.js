import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

function SearchForm() {

  const [ products, setProducts ] = useState([]);
  const [ palabra, setPalabra ] = useState(false);

  let keyword = "";
  
  const keywordInputRef = useRef();  
  const tituloActualizado = useRef();  

  const submitHandler = (e) => {

    e.preventDefault();

    if(keywordInputRef.current.value === ""){
       return alert('por favor ingresa una keyword antes de enviar el formulario');
    }

    // console.log(keywordInputRef.current.value);

    keyword = keywordInputRef.current.value;

    // fetch("http://localhost:3001/api/products/search?keyword=" + keyword)
    fetch("https://aenima-back-end.herokuapp.com/api/products/search?keyword=" + keyword)
      .then(response => response.json())
      .then(data => {
        tituloActualizado.current.innerText = "Buscar Productos por: " + keyword;
        if(!data.Error){
          // console.log(data);
          setProducts(data.products);
        } else {
          setProducts([]);
          // console.log(data);
          setPalabra(true);
        }
      })

  }

  return (
    <React.Fragment>
      
      <h1 className="search-form-title" ref={tituloActualizado}>Buscar Productos por:</h1>
      <form onSubmit={submitHandler} method="post">
        <input ref={ keywordInputRef } type="text" name="name" className="keyword-input" placeholder="ingrese una keyword"/>
        <button type="submit" className="search-form-submit-btn" >BUSCAR</button>
      </form>
      {
        products.length > 0 ? (
          <section className="our-product-list">
            {
              products.map((product, i) => {
                return(
                  <article className="product-card" key={i}>
                  <figure>
                      {/* <img src={`http://localhost:3001/${product.imageUrl}`} alt="imagen-producto" /> */}
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
            }
          </section>
        ) : 
        (
          palabra &&
          <p className="search-form-no-products">No se han encontrado productos para tu búsqueda, por favor intente nuevamente</p>
        )  
      }

    </React.Fragment>  
  );
}

export default SearchForm;