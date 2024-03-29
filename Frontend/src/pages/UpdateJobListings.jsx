import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import EmployerHeader from "../components/EmployerHeader";

function JobListing() {
    const params = useParams();
    const { currentUser } = useSelector((state) => state.user);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");
    const [jobType, setJobType] = useState("");
    const [description, setDescription] = useState("");
    const [skills, setSkills] = useState("");
    const [salary, setSalary] = useState("");
    const [location, setLocation] = useState("");
    const [experience, setExperience] = useState("");
    const [userRef, setUserRef] = useState(currentUser && currentUser.employer && currentUser.employer._id ? currentUser.employer._id : currentUser.user._id); // get userRef from the redux store 
    const [jobCreatingSuccess, setJobCreatingSuccess] = useState(false);

// Get job listing by id and set the state with the data from the backend 
    useEffect(() => {
        const fetchJobListing = async () => {
            const listingId = params.listingId; // get listingId from the url params 
            const res = await fetch(`/api/job/listing/get/${listingId}`);
            const data = await res.json();
            if(data.success === false){
                console.log(data.message);
                return;
            }
            setTitle(data.title);
            setCompany(data.company);
            setJobType(data.jobType);
            setDescription(data.description);
            setSkills(data.skills);
            setSalary(data.salary);
            setLocation(data.location);
            setExperience(data.experience);
            setUserRef(data.userRef);
        };
        fetchJobListing();
    }, []);


// Update job listing by id  
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior 
        try {
            const response = await axios.post(
                `/api/job/listing/update/${params.listingId}`,
                {
                    title,
                    company,
                    jobType,
                    description,
                    skills,
                    salary,
                    location,
                    experience,
                    userRef, // pass userRef to the backend
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            // If job is created successfully then set jobCreatingSuccess to true and setError to null
            if (response.status === 200) {
                setJobCreatingSuccess(true);
                setError(null);
                // Reset jobCreatingSuccess after 2 seconds
                setTimeout(() => {
                    setJobCreatingSuccess(false);
                }, 2000);
                return;
            }
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message);
                // Reset error massage after 2 seconds if there is an error in creating job listing 
                setTimeout(() => {
                    setError(false);
                }, 3000);
                return;
            }
        }
    };
    return (
        <div>
            <EmployerHeader />
            <main className="p-3 max-w-4xl mx-auto">
                <h1 className="text-3xl text-center font-semibold my-7">
                    Create a Listing
                </h1>
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row">
                    <div className="flex flex-col gap-4 p-4">
                        <input
                            type="text"
                            placeholder="Job Tittle"
                            className="input input-bordered input-info w-full max-w-xs"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Company"
                            className="input input-bordered input-info w-full max-w-xs"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                        />
                        <select
                            value={jobType}
                            className="select select-primary w-full max-w-xs"
                            onChange={(e) => setJobType(e.target.value)}
                        >
                            <option value="" selected disabled>
                                Job Type
                            </option>
                            <option value="Part Time">Part Time</option>
                            <option value="Full Time">Full Time</option>
                            <option value="Remote">Remote</option>
                            <option value="Work From Home">Work From Home</option>
                        </select>{" "}
                        <select
                            value={skills}
                            className="select select-secondary w-full max-w-xs"
                            onChange={(e) => setSkills(e.target.value)}
                        >
                            <option value="" selected disabled>
                                Choose Skills
                            </option>
                            <option value="Frontend Web Development">
                                Frontend Web Development
                            </option>
                            <option value="MERN Stack Development">
                                MERN Stack Development
                            </option>
                            <option value="Account & Finance">Account & Finance</option>
                            <option value="Artificial Intelligence">
                                Artificial Intelligence
                            </option>
                            <option value="MEAN STACK Development">
                                MEAN STACK Development
                            </option>
                            <option value="MEVN STACK Development">
                                MEVN STACK Development
                            </option>
                            <option value="JData Entry Operator">Data Entry Operator</option>
                            <option value="Ms Office">Ms Office</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Salary"
                            value={salary}
                            onChange={(e) => setSalary(e.target.value)}
                            className="input input-bordered input-info w-full max-w-xs"
                        />
                        <select
                            value={experience}
                            onChange={(e) => setExperience(e.target.value)}
                            className="select select-secondary w-full max-w-xs"
                        >
                            <option value="" disabled selected>
                                Experience
                            </option>
                            <option value="Beginner">Beginner</option>
                            <option value="Fresher">Fresher</option>
                            <option value="Professional">Professional</option>
                            <option value="Intermidiate">Intermidiate</option>
                            <option value="Expert">Expert</option>
                        </select>
                    </div>
                    <div className="flex gap-4">
                        <textarea
                            className="textarea textarea-success"
                            placeholder="Job Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                        <textarea
                            className="textarea textarea-success"
                            placeholder="Address"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="flex flex-col p-8 justify-center items-center ">
                        <button className=" btn-wide btn btn-primary">
                            Update Listing
                        </button>
                    </div>
                </form>
                {jobCreatingSuccess && (
                    <div role="alert" className="alert alert-success m-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="stroke-current shrink-0 h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <span>Your Listing Has Been Updated Successfully!</span>
                    </div>
                )}
                {error && (
                    <div role="alert" className="alert alert-error m-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="stroke-current shrink-0 h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <span>{error}</span>
                    </div>
                )}
            </main>
        </div>
    );
}

export default JobListing;
