import React, { useState, useEffect } from 'react';

import { useParams, Link } from 'react-router-dom';


function ProductDetail(){

    const [ product, setProduct ] = useState({});
    const [ buscado, setBuscado ] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        // fetch("http://localhost:3001/api/products/" + id)
        fetch("https://aenima-back-end.herokuapp.com/api/products/" + id)
            .then(response => response.json())
            .then(data => {
                // console.log(data.product);
                if (data.product) {
                    setProduct(data.product);                    
                } else {
                    setBuscado(true)
                    setProduct({});
                }
            })
            .catch(err => console.log(err))
    }, [id])

    return(

        Object.keys(product).length > 0 ? (
            <div className="product-details">
                <figure className="product-detail-figure">
                    {/* <img src={`http://localhost:3001${product.imageUrl}`} alt="imagen-producto" /> */}
                    <img src={`https://aenima-back-end.herokuapp.com${product.imageUrl}`} alt="imagen-producto" />
                </figure>
                <div className="product-detail-div">
                    <h2 className="product-detail-name">{product.name}</h2>
                    <h3 className="product-detail-price">${product.price}</h3>
                    <p className="product-detail-description">{product.description}</p>
                    <div className="product-detail-buttons">
                        <Link to={`/edit-product-form/${product.id}`}><button><i className="far fa-edit"></i></button></Link>
                        <Link to={`/delete-product-form/${product.id}`}><button><i className="fas fa-trash-alt"></i></button></Link>
                    </div> 
                </div>               
            </div>
        )
        :
        (
            buscado === true ? (
                <div className="product-details-not-found">
                    <h1>No pudimos encontrar este producto</h1>
                    <Link to="/our-products">
                        Vuelva a nuestra lista de productos
                    </Link>
                </div> 
            ) : (
                <div className="product-details-loading">
                    <h1>Buscando este producto</h1>
                    <span className="product-loader"></span>
                </div> 
            )
        )  

        
    )
}
export default ProductDetail;