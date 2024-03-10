// Import necessary components and modules
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/SignUp';
import Login from './pages/Login';
import About from './pages/About';
import PrivateRoute from './components/PrivateRoute';
import Profile from './pages/Profile';
import Demo from './pages/demo';
import Header from './components/header';
import ContactInformation from './pages/Contact';




function App() {
  return (
      <BrowserRouter> {/* BrowserRouter is used to wrap the routes */}
        <Header />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/demo" element={<Demo />} />
          <Route element={<PrivateRoute/>}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/contact" element={<ContactInformation />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
