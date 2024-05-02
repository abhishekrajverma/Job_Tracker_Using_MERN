import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import app from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../Redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      // pop-up
      const result = await signInWithPopup(auth, provider);
       console.log(result); // log the result to see what is returned from google

      // send data to backend
      const res = await fetch("/api/auth/google", {
        method: "POST",
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          avatar: result.user.photoURL,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (err) {
      console.log("Could not sign-in with google", err);
    }
  };
  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="btn btn-neutral uppercase"
    >
      <FcGoogle />
      continue with google
    </button>
  );
}
