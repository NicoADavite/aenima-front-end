import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams, useHistory } from "react-router-dom";

function EditProductForm (){
    const { id } = useParams();
    const history = useHistory();
    
    const [ buscado, setBuscado ] = useState(false);
    const [ product , setProduct ] = useState({});

    const inputFieldsRef = useRef();
    const nameInputRef = useRef();
    const descInputRef = useRef();
    const priceInputRef = useRef();
    const brandInputRef = useRef();
    const imageInputRef = useRef();
    const loadingRef = useRef();
    const submitButtonRef = useRef();

    useEffect(() => {
      // fetch("http://localhost:3001/api/products/" + id)
        fetch("https://aenima-back-end.herokuapp.com/api/products/" + id)
            .then(response => response.json())
            .then(data => {
                console.log(data.product);
                if (data.product) {
                    setProduct(data.product);                    
                } else {
                    setBuscado(true)
                    setProduct({});
                }
            })
            .catch(err => console.log(err))
    }, [id])

    const mostrarFileName = (e) => {
      const fileNameDiv = document.querySelector('.new-product-image-filename');
      fileNameDiv.textContent = e.target.files[0].name;
      fileNameDiv.style.color = 'green';
      fileNameDiv.style.fontSize = '18px';
      fileNameDiv.style.fontWeight = 'bold';
    }

    const enviarFomulario = (e) => {
        e.preventDefault();

        if (!nameInputRef.current.value) {
            return alert('Debes subir un nombre');    
        }
        if (!descInputRef.current.value) {
          return alert('Debes subir una descripción');    
        }
        if (!priceInputRef.current.value) {
          return alert('Debes subir un precio');    
        }
        if (!brandInputRef.current.value) {
          return alert('Debes subir una marca');    
        }

        submitButtonRef.current.disabled = true;
        inputFieldsRef.current.classList.add("hidden");
        loadingRef.current.classList.remove("hidden");

        let formInfo = new FormData();
        formInfo.append('name', nameInputRef.current.value);
        formInfo.append('description', descInputRef.current.value);
        formInfo.append('price', priceInputRef.current.value);
        formInfo.append('brand', brandInputRef.current.value);
        if(imageInputRef.current.files.length > 0){
            formInfo.append('image', imageInputRef.current.files[0]);
        }

        let settings = {
          "method": "PUT",
          "body": formInfo
        }
      
        // fetch(`http://localhost:3001/api/products/update/${id}`, settings)
        fetch(`https://aenima-back-end.herokuapp.com/api/products/update/${id}`, settings)
          .then(response => response.json())
          .then(info => {
            console.log(info);
            if (!info.Error) {
              history.push("/our-products");          
            } else {
              submitButtonRef.current.disabled = false;
              inputFieldsRef.current.classList.remove("hidden");
              loadingRef.current.classList.add("hidden");
              setTimeout(() => {
                alert('NO SE PUDO EDITAR EL PRODUCTO, INTENTE NUEVAMENTE!');            
              }, 30);
            }
          })

    }

    return(
        Object.keys(product).length > 0 ? (
            <>
                <h1 className="main-title">Formulario de Edición de Productos</h1>
                <form className="create-product-form" onSubmit={ enviarFomulario }>
                  <div className="input-fields" ref={inputFieldsRef}>
                    <label>Nombre:</label>
                    <input type="text" name="name" ref={ nameInputRef } defaultValue={ product.name } />
            
                    <label>Descripción:</label>
                    <textarea name="description" ref={ descInputRef } defaultValue={ product.description }/>
            
                    <label>Precio:</label>
                    <input type="number" step="any" name="price" ref={ priceInputRef } defaultValue={ product.price } />
            
                    <label>Marca:</label>
                    <input type="text" name="brand" ref={ brandInputRef } defaultValue={ product.brand } />
            
                    <label id="new-product-image-label" htmlFor="new-product-image-input"><i className="fas fa-image"></i> Subir una Imagen</label>
                    <div className="new-product-image-filename"></div>
                    <input type="file" ref={imageInputRef} name="image" id="new-product-image-input" accept="image/*" onChange={mostrarFileName}/>
                  </div>

                  <div ref={loadingRef} className="loading-div hidden">
                    <span  className="loader"></span>
                    <span className="loader-msg">Editando producto...</span>            
                  </div>
            
                  <button type="submit" ref={submitButtonRef} className="new-product-submit-button">Enviar Formulario</button>
                </form>     
            </>
        )
        :
        (
            buscado === true ? (
              <div className="product-details-not-found">
                  <h1>Lo sentimos, no se encontró el producto</h1>
                  <Link to="/our-products">
                    Vuelva a nuestra lista de productos
                  </Link>
              </div>
            ) : (
              <div className="product-details-loading">
                <h1>Cargando detalles del producto</h1>
                <span className="product-loader"></span>
              </div>
            )
        )
    )
}

export default EditProductForm