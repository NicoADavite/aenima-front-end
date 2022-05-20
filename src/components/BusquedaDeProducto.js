import React, { useState, useEffect, useRef  } from 'react';

function BusquedaDeProducto() {

    const [ productos, setProductos ] = useState([]);
    const [ keyword, setKeyword ] = useState([]);

    useEffect( () => {
        fetch("www.heroku-laptop-city.com/api/products/search")
          .then( response => response.json())
          .then( data => {
            if(!data.Error){
              setProductos(data.products);
            } else {
              setProductos([]);
            }
          })
          .catch( err => console.log(err))
    }, [keyword]);

    const inputRef = useRef();

    const buscarProducto = (e) => {

        e.preventDefault();

        const inputValue = inputRef.current.value;

        setKeyword(inputValue);

        inputRef.current.value = "";
    }

    return (
        <div className="search-product">
            <form method="GET" onSubmit={ buscarProducto }>
                <input ref={inputRef} type="text" name="search-name" 
                placeholder="busca un producto..."></input>
            </form>
            <div>
                <h2>Productos buscados por {keyword}: </h2>
                {
                    productos.length > 0 && productos.map((producto, i) => {
                        return(
                            <article className="product-article" key={i}>
                                <figure>
                                    <img src={producto.image} alt="imagen del producto"/>
                                </figure>
                                <p>{producto.name}</p>
                            </article>
                        )
                    })
                }
                { 
                    !productos.length && 
                        <div className="product-not-found">No se encontraron productos con la palabra {keyword}</div>
                }
            </div>
        </div>
    );
}

export default BusquedaDeProducto;