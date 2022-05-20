import React from 'react';
import { Switch, Route } from 'react-router-dom';

import "../assets/css/main.css"

import Welcome from './Welcome';
import ProductList from './ProductList';
import SearchForm from './SearchForm';
import CreateNewProduct from './CreateNewProduct';
import ProductDetail from './ProductDetail';
import EditProductForm from './EditProductForm';
import DeleteProductForm from './DeleteProductForm';

function Main() {

  return (
    <main className="main">

      < Switch >
        <Route exact path="/" component={ Welcome }/>
        <Route path="/our-products" component={ ProductList }/>
        <Route path="/search-form" component={ SearchForm }/>
        <Route path="/create-new-product" component={ CreateNewProduct }/>
        <Route path="/product-detail/:id" component={ ProductDetail }/>
        <Route path="/edit-product-form/:id" component={ EditProductForm }/>
        <Route path="/delete-product-form/:id" component={ DeleteProductForm }/>
      </Switch>      
      
    </main>
  );
}

export default Main;