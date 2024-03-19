import "../../assets/css/Main.css";
import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Application() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [jobId, setJobId] = useState(id);
  const [applicantId, setApplicantId] = useState(currentUser && currentUser.employer && currentUser.employer._id ? currentUser.employer._id : currentUser.user._id);

  // handle application
  const handleApplication = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/application/creating",
        {
          name,
          email,
          coverLetter,
          phone,
          address,
          jobId,
          applicantId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert(response.data.message);
      navigate(`/my-application/${id}`);
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message);
      }
    }
  }

  return (
    <div>
      <section className="application">
        <div className="container">
          <h3 className="uppercase text-2xl">Application Form</h3>
          <form onSubmit={handleApplication} >
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="number"
              placeholder="Your Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="text"
              placeholder="Your Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <textarea
              placeholder="CoverLetter..."
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
            />
            <button type="submit">Send Application</button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Application;
