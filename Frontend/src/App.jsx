// Import necessary components and modules
import React from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './pages/home';
import Signup from './pages/signup';
import Login from './pages/login';
import About from './pages/about';
import Header from './components/header';



function App() {
  return (
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/about" element={<About />} />

        </Routes>
      </BrowserRouter>
  );
}

export default App;
