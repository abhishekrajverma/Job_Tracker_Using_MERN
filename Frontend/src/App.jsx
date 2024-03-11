// Import necessary components and modules
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/SignUp';
import Login from './pages/Login';
import About from './pages/About';
import PrivateRoute from './components/PrivateRoute';
import Profile from './pages/Profile';
import Demo from './pages/demo';
import ContactInformation from './pages/Contact';
import EmployerLogin from './pages/EmployerLogin';
import JobListing from './pages/JobListing';




function App() {
  return (
      <BrowserRouter> {/* BrowserRouter is used to wrap the routes */}
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
          <Route path="/employer" element={<EmployerLogin />} />
          <Route path="/job-listing" element={<JobListing />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
