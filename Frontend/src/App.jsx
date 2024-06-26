// Import necessary components and modules
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login";
import About from "./pages/About";
import { ListingPrivateRoute, PrivateRoute } from "./components/PrivateRoute.jsx";
import Profile from "./pages/Profile";
import ContactInformation from "./pages/Contact";
import EmployerLogin from "./pages/EmployerLogin";
import JobListing from "./pages/CreateJobListing";
import EmployerSignup from "./pages/EmployerSignUp";
import ShowJobListings from "./pages/ShowJobListings";
import UpdateJobListings from "./pages/UpdateJobListings.jsx";
import AvailableListings from "./pages/JobListings/AvailableListings.jsx";
import Application from "./pages/Application/Application.jsx";
import JobDetails from "./pages/JobListings/JobDetails.jsx";
import MyApplication from "./pages/Application/MyApplication.jsx";

function App() {
  return (
    <BrowserRouter>
      {/* BrowserRouter is used to wrap the routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/job/details/:Id" element={<JobDetails />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/application/:id" element={<Application />} />
          <Route path="/my-application/:id" element={<MyApplication />} />
        </Route>
        <Route path="/contact" element={<ContactInformation />} />
        <Route path="/employer-login" element={<EmployerLogin />} />
        <Route path="/employer-sign-up" element={<EmployerSignup />} />
        <Route path="/job/available" element={<AvailableListings />} />
        <Route element={<ListingPrivateRoute />}>
          <Route path="/job-listing" element={<JobListing />} />
          <Route path="/employer-job-listings" element={<ShowJobListings />} />
          <Route path="/employer/update/listings/:listingId" element={<UpdateJobListings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
