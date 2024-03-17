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
                `/api/employers/listings/${currentUser.user._id}`
            );
            setJobListings(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            {jobListings && jobListings.length > 0 && (
                <div className="flex flex-col gap-4">
                    <h1 className="text-center mt-7 text-2xl font-semibold">
                        Your Listings
                    </h1>
                    {jobListings.map((job) => (
                        <div
                            key={job._id}
                            className="border rounded-lg p-3 flex justify-between items-center gap-4"
                        >
                            
                                <p>{listing.name}</p>
                            

                            <div className="flex flex-col item-center">
                                <button
                                    onClick={() => handleListingDelete(listing._id)}
                                    className="text-red-700 uppercase"
                                >
                                    Delete
                                </button>
                                <Link to={`/update-listing/${listing._id}`}>
                                    <button className="text-green-700 uppercase">Edit</button>
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
