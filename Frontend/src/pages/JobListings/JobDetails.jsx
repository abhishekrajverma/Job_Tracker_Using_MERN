import React from 'react'
import "../../assets/css/Main.css";
import { Link, useParams} from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';

function JobDetails() {
    const [jobListings, setJobListings] = useState([]);
    const { Id } = useParams(); // get the Id from the url params 
    console.log(jobListings);
    useEffect(() => {
        const fetchJobListings = async () => {
            try {
                const response = await axios.get(`/api/job/listing/get/${Id}`); // get the job listing by Id 
                setJobListings(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchJobListings();
    }, []);
    return (
        <section className="jobDetail page">
            <div className="container">
                <h3 className='uppercase text-3xl'> Job Details</h3>
                <div className="banner">
                    <p>
                        Title: <span> {jobListings.title}</span>
                    </p>
                    <p>
                        Description: <span>{jobListings.description}</span>
                    </p>
                    <p>
                        Company: <span>{jobListings.company}</span>
                    </p>
                    <p>
                        City: <span>{jobListings.location}</span>
                    </p>
                    <p>
                        Job Type: <span>{jobListings.jobType}</span>
                    </p>
                    <p>
                        Experience: <span>{jobListings.experience}</span>
                    </p>
                    <p>
                        Salary: <span>{jobListings.salary}</span>
                    </p>
                    <p>
                        Skills: <span>{jobListings.skills}</span>
                    </p>
                    <p>
                        Job Posted On: <span>{jobListings.jobPostedOn}</span>
                    </p>
                    <p>
                        <Link to={`/application/${jobListings._id}`}>Apply Now</Link>
                    </p>
                </div>
            </div>
        </section>
    )
}

export default JobDetails