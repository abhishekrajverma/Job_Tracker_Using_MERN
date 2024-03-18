import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function ShowJobListings() {
    const [jobListings, setJobListings] = useState([]);
    console.log(jobListings);
    const { currentUser } = useSelector((state) => state.user);

    const handleShowJobListings = async () => {
        try {
            const response = await axios.get(
                `/api/employers/listings/${currentUser && currentUser.employer && currentUser.employer._id ? currentUser.employer._id : currentUser.user._id}`
            );
            setJobListings(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    // handle delete listing
    const handleListingDelete = async (listingId) => {
        try {
            const res = await fetch(`/api/job/listing/delete/${listingId}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (data.success === false) {
                console.log(data.message);
                return;
            }
            setJobListings((prev) => prev.filter((listing) => listing._id !== listingId)); // filter out the deleted listing from the jobListings state 
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <div className="text-center p-10">
            <a href="/employer-job-listings">
                <button className="btn btn-error m-3">Refresh Jobs</button>
            </a>
            <button
                className=" btn-wide btn btn-info"
                onClick={handleShowJobListings}
            >
                Show Job Listings
            </button>
            {jobListings && jobListings.length > 0 && (
                <div className="">
                    <h1 className="text-center mt-7 text-2xl font-semibold">
                        Your Listings
                    </h1>
                    {jobListings.map((listing) => (
                        <div key={listing._id} className="border bg-gray-200  text-black rounded-lg p-3 items-center m-4">
                            <p>Title: {listing.title}</p>
                            <p>Job Type: {listing.jobType}</p>
                            <p>Skills: {listing.skills}</p>
                            <p>Description: {listing.description}</p>
                            <p>Company: {listing.company}</p>
                            <p>Location: {listing.location}</p>
                            <p>Experience: {listing.experience}</p>
                            <p>Salary: {listing.salary}</p>
                            <p>Posted On: {listing.jobPostedOn}</p>
                            <div className=' item-center p-3'>
                                <button
                                    onClick={() => handleListingDelete(listing._id)}
                                    className='btn btn-error uppercase m-2'
                                >
                                    Delete
                                </button>
                                <Link to={`/employer/update/listings/${listing._id}`}>
                                    <button className='btn btn-success uppercase'>Edit</button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ShowJobListings;
