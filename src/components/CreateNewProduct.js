import React, { useRef } from 'react';
import { useHistory } from "react-router-dom"

function CreateNewProduct() {

  const history = useHistory();

  const nameInputRef = useRef();
  const descInputRef = useRef();
  const priceInputRef = useRef();
  const brandInputRef = useRef();
  const imageInputRef = useRef();

  const mostrarFileName = (e) => {
    const fileNameDiv = document.querySelector('.new-product-image-filename');
    fileNameDiv.textContent = e.target.files[0].name;
    fileNameDiv.style.color = 'green';
    fileNameDiv.style.fontSize = '18px';
    fileNameDiv.style.fontWeight = 'bold';
  }

  const enviarFomulario = (e) => {

    e.preventDefault();

    // console.log(imageInputRef.current.files[0]);

    if (!nameInputRef.current.value) {
      return alert('Debes subir un nombre')    
    }
    if (!descInputRef.current.value) {
      return alert('Debes subir una descripción')    
    }
    if (!priceInputRef.current.value) {
      return alert('Debes subir un precio')    
    }
    if (!brandInputRef.current.value) {
      return alert('Debes subir una marca')    
    }
    if (!imageInputRef.current.files[0]) {
      return alert('Debes subir una imagen')    
    }

    let formInfo = new FormData();
    formInfo.append('name', nameInputRef.current.value);
    formInfo.append('description', descInputRef.current.value);
    formInfo.append('price', priceInputRef.current.value);
    formInfo.append('brand', brandInputRef.current.value);
    formInfo.append('image', imageInputRef.current.files[0]);

    // console.log(formInfo);

    let settings = {
      "method": "POST",
      "body": formInfo
    }

    fetch("http://localhost:3001/api/products/store", settings)
      .then(response => response.json())
      .then(info => {
        // console.log(info);
        if (!info.Error) {
          history.push("/our-products");          
        } else {
          alert('No se pudo crear el archivo')
        }
      })
  }

  return (
    <>
        <h1 className="main-title">Formulario de Creación de Productos</h1>
        <form className="create-product-form" onSubmit={ enviarFomulario }>

            <label>Nombre:</label>
            <input type="text" name="name" ref={ nameInputRef }/>

            <label>Descripción:</label>
            <textarea name="description" ref={ descInputRef }/>

            <label>Precio:</label>
            <input type="number" step="any" name="price" ref={ priceInputRef }/>

            <label>Marca:</label>
            <input type="text" name="brand" ref={ brandInputRef }/>

            <label id="new-product-image-label" htmlFor="new-product-image-input"><i className="fas fa-image"></i> Subir una Imagen</label>
            <div className="new-product-image-filename"></div>
            <input type="file" ref={imageInputRef} name="image" id="new-product-image-input" accept="image/*" onChange={mostrarFileName}/>

            <button type="submit" className="new-product-submit-button">Enviar Formulario</button>
        </form>     
    </>
  );
}

export default CreateNewProduct;