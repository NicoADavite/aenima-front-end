import React from 'react';
// import { Route } from 'react-router-dom';
import '../assets/css/app.css'

import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';

function App() {
  return (
    <div className="App">
        < Header />
        < Main />
        < Footer />
    </div>
  );
}

export default App;
