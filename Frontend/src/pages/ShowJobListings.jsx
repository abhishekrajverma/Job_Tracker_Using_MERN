import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function ShowJobListings() {
    const [jobListings, setJobListings] = useState([]);
    console.log(jobListings);
    const { currentUser } = useSelector((state) => state.user);

    const handleShowJobListings = async () => {
        try {
            const response = await axios.get(
                `/api/employers/listings/${ currentUser && currentUser.employer && currentUser.employer._id ? currentUser.employer._id : currentUser.user._id}`
            );
            setJobListings(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <button onClick={handleShowJobListings}>Show Job Listings</button>
            {jobListings.map((job) => {
                return (
                    <div key={job._id}>
                        <h1>{job.title}</h1>
                        <h2>{job.company}</h2>
                        <h3>{job.jobType}</h3>
                        <p>{job.description}</p>
                        <p>{job.skills}</p>
                        <p>{job.salary}</p>
                        <p>{job.location}</p>
                        <p>{job.experience}</p>
                    </div>
                );
            })}
        </div>
    );
}

export default ShowJobListings;
