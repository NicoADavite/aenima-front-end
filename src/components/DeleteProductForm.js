import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

function DeleteProductForm(){

    const { id } = useParams();
    const history = useHistory();

    const [ borrar, setBorrar ] = useState(false);
    const [ product, setProduct ] = useState({});

    useEffect(() => {
        // fetch(`http://localhost:3001/api/products/${id}`)
        fetch(`https://aenima-back-end.herokuapp.com/api/products/${id}`)
            .then(response => response.json())
            .then(data => {
                setProduct(data.product);
            })
    }, [])

    useEffect(() => {
        if(borrar){

            let settings = {
                "method": "DELETE"
            }

            // fetch(`http://localhost:3001/api/products/delete/${id}`, settings)
            fetch(`https://aenima-back-end.herokuapp.com/api/products/delete/${id}`, settings)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    history.push("/our-products");
                })
                .catch(err => {
                    console.log(err);
                    history.push("/our-products");
                })
        }
    }, [ borrar ]);

    const cancelHandle = () => {
        history.push("/product-detail/" + id);
    }

    const confirmHandle = () => {
        setBorrar(true);
    }

    return (
        <div className="delete-form">
            <h1 className="delete-form-title">¿Seguro deseas eliminar este producto?</h1>
            <h2 className="delete-form-name">"{product.name}"</h2>
            <div className="delete-form-buttons">
                <button className="delete-form-cancel-btn" onClick={cancelHandle}>CANCELAR</button>
                <button className="delete-form-confirm-bt" onClick={confirmHandle}>ELIMINAR</button>
            </div>
        </div>
    )
}

export default DeleteProductForm;