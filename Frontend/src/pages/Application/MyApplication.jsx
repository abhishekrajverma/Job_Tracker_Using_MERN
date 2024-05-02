import "../../assets/css/Main.css";
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"


function MyApplication() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [jobListings, setJobListings] = useState([]);
  console.log(jobListings);


  useEffect(() => {
    const fetchJobListings = async () => {
      try {
        const response = await axios.get(`/api/application/all/${id}`); // get the job listing by Id 
        setJobListings(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchJobListings();
  }, []);
  return (
    <div>
      <section className="jobs ">
        <div className="container">
          <h1 className="text-3xl">ALL APPLICATIONS</h1>
          <div className="banner">
              {jobListings.applications && jobListings.applications.length > 0 && (
                <div>
                  {jobListings.applications.map((application) => (
                    <div className="card m-2" key={application._id}>
                      <p>Name: {application.name}</p>
                      <p>Email: {application.email}</p>
                      <p>Phone: {application.phone}</p>
                      <button className="btn btn-error">Delete</button>
                    </div>
                  ))}
                </div>
              )}
          </div>
        </div>
      </section>

    </div>
  )
}

export default MyApplication