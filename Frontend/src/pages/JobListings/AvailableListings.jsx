import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import  "../../assets/css/Main.css";
import Header from "../../components/header.jsx";


function AvailableListings() {
    const Navigate = useNavigate();
    const [jobListings, setJobListings] = useState([]);

    useEffect(() => {
        const fetchJobListings = async () => {
            try {
                const response = await axios.get("/api/job/listing/get-all");
                setJobListings(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchJobListings();
    }, []);

    return (
        <div>
            <Header />
        <section className="jobs page">
            <div className="container">
                <h1 className="text-3xl">ALL AVAILABLE JOBS</h1>
                <div className="banner">
                    {jobListings &&
                        jobListings.map((element) => { {/* map through the jobListings array  */}
                            return (
                                <div className="card" key={element._id}> {/* add key to the parent element*/}
                                    <p>{element.title}</p>
                                    <p>{element.company}</p>
                                    <p>{element.location}</p>
                                    <Link to={`/job/details/${element._id}`}>Job Details</Link> {/* Link to the job details page with different id */}
                                </div>
                            );
                        })}
                </div>
            </div>
        </section>
        </div>
    );
}

export default AvailableListings;
