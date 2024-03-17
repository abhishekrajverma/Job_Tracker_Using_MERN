// Import necessary components and modules
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import Signup from "./pages/SignUp";
import Login from "./pages/Login";
import About from "./pages/About";
import { ListingPrivateRoute,  PrivateRoute } from "./components/PrivateRoute.jsx";
import Profile from "./pages/Profile";
import Demo from "./pages/demo";
import ContactInformation from "./pages/Contact";
import EmployerLogin from "./pages/EmployerLogin";
import JobListing from "./pages/CreateJobListing";
import EmployerSignup from "./pages/EmployerSignUp";
import ShowJobListings from "./pages/ShowJobListings";



function App() {
  return (
    <BrowserRouter>
      {" "}
      {/* BrowserRouter is used to wrap the routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/demo" element={<Demo />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/contact" element={<ContactInformation />} />
        <Route path="/employer-login" element={<EmployerLogin />} />
        <Route path="/job-listing" element={<JobListing />} />
        <Route path="/employer-sign-up" element={<EmployerSignup />} />
        <Route element={<ListingPrivateRoute />}>
          <Route path="/employer-job-listings" element={<ShowJobListings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
