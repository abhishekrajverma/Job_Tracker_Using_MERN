import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/signup';
import Login from './components/login';
import Header from './components/header';
import Footer from './components/footer';
import Home from './components/home';
import Body from './components/content';
import Hurry from './components/hurry';

// Higher-order component for routes with Header and Footer
const AuthRoute = ({ element: Element }) => (
  <>
    <Header />
    <Home />
    <Footer />
  </>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Define your routes here */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<AuthRoute element={<Home />} />} />
        <Route path="/body" element={<AuthRoute element={<Body />} />} />
        <Route path="/hurry" element={<AuthRoute element={<Hurry />} />} /> 
      </Routes>
    </Router>
  );
}

export default App;