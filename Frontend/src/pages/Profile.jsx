import Header from "../components/header.jsx";
import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { AiOutlineForm } from "react-icons/ai";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from "../firebase"; // firebase app instance
import {
  updateUserFailure,
  updateUserSuccess,
  updateUserStart,
  deleteUserFailure,
  deleteUserSuccess,
  deleteUserStart,
} from "../Redux/user/userSlice.js";
import { useDispatch } from "react-redux"; // import dispatch from react-redux to dispatch actions to redux store

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user); // get current user from redux store
  const fileInput = useRef(null); // file input reference
  const [file, setFile] = useState(undefined); // file to be uploaded
  const [filePerc, setFilePerc] = useState(0); // file upload percentage
  const [fileUploadError, setFileUploadError] = useState(false); // file upload error
  const [formData, setFormData] = useState({ avatar: "" }); // form data
  const dispatch = useDispatch(); // dispatch function from react-redux
  const [updateSuccess, setUpdateSuccess] = useState(false); // update success state

  // firebase storage
  // allow read;
  // allow write: if
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')

  useEffect(() => {
    if (file) {
      // if file is selected
      handleFileUpload(file); // upload file to firebase storage
    }
  }, [file]);

  // handle file upload to firebase storage
  const handleFileUpload = (file) => {
    const storage = getStorage(app); // firebase storage instance
    const fileName = new Date().getTime() + file.name; // unique file name
    const storageRef = ref(storage, fileName); // file reference in storage
    const uploadTask = uploadBytesResumable(storageRef, file); // file upload task

    uploadTask.on(
      // file upload event listener
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100; // file upload percentage
        setFilePerc(Math.round(progress)); // set file upload percentage and round it off to nearest whole number
      },
      (error) => {
        setFileUploadError(true); // set file upload error to true
      },
      () => {
        // file upload success
        getDownloadURL(uploadTask.snapshot.ref).then(
          (
            downloadURL, // get file download URL
          ) => setFormData({ ...formData, avatar: downloadURL }), // set form data with file download URL
        );
      },
    );
  };
  // handle form change in the form and set form data
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/users/update/${currentUser.user._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
  // handle delete user account
  const handleDeleteUserAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/users/delete/${currentUser.user._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
      alert(data.message);
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  // handle button click to remove success message
  const handleButtonClick = () => {
    setUpdateSuccess(false); // set update success to false to remove success message
  };

  return (
    <div>
      <Header />
      <div data-theme="lemonade" className="p-3 max-w-lg mx-auto">
        <h1 className="font-semibold text-center text-3xl my-7">Profile</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            accept="image/*"
            hidden
            ref={fileInput}
          />
          <img
            className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
            src={formData.avatar || currentUser.user.avatar}
            alt="Profile"
            referrerPolicy="no-referrer" // no referrer policy
          />
          <AiOutlineForm
            onClick={() => fileInput.current.click()}
            className="self-center hover:opacity-100"
          />
          <p className="text-sm self-center">
            {fileUploadError ? ( // if file upload error is true
              <span className="text-red-700">
                Error Image upload (image must be less than 2 mb)
              </span>
            ) : filePerc > 0 && filePerc < 100 ? ( // if file upload percentage is greater than 0 and less than 100
              <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
            ) : filePerc === 100 ? ( // if file upload percentage is 100
              <span className="text-green-700">
                Image successfully uploaded!
              </span>
            ) : (
              ""
            )}
          </p>
          <input
            type="text"
            placeholder="name"
            defaultValue={currentUser.user.name}
            id="name"
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="email"
            id="email"
            defaultValue={currentUser.user.email}
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="password"
            id="password"
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />
          <button disabled={loading} className="btn btn-info">
            {loading ? "Updating..." : "UPDATE"}
          </button>
        </form>
        <div className="flex justify-between mt-5">
          <span
            onClick={handleDeleteUserAccount}
            className="text-red-700 cursor-pointer"
          >
            Delete account
          </span>
        </div>

        {/* // if error is true, show error message */}
        <p>
          {error && (
            <div role="alert" className="alert alert-error">
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
        </p>

        {/* // if update success is true, show success message  */}
        <p>
          {updateSuccess && (
            <div
              onClick={handleButtonClick}
              role="alert"
              className="alert alert-success"
            >
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
              <span>Profile Updated Successfully</span>
            </div>
          )}
        </p>
      </div>
    </div>
  );
}
