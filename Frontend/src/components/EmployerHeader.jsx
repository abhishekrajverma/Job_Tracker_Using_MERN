import { Link } from "react-router-dom";
import { TbArrowBackUp } from "react-icons/tb";
import { PiSignInBold } from "react-icons/pi";
import { useSelector } from "react-redux";
import { signOutUserStart, signOutUserSuccess, signOutUserFailure } from "../Redux/user/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; //  useNaviagate is use to navigate to different pages in react-router-dom package 


function EmployerHeader() {
  const { currentUser } = useSelector((state) => state.user); // get currentUser from redux store 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = async() => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/employers/sign-out");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  return (
    <div>
      {currentUser ? (
        <div className="navbar bg-base-100">
          <div className="flex-1">
            <a className="btn btn-ghost text-xl">JobHunter</a>
          </div>
          <div className="flex-none">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                {currentUser && currentUser.employer && currentUser.employer.avatar ? (
                  <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={ currentUser.employer.avatar}
                  />
                </div>
                ) : (
                  <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={ currentUser.user.avatar}
                  />
                </div>

                )}
                
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to={"/employer-job-listings"}>
                    <a className="justify-between">
                      Show Listing
                      <span className="badge">New</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <a>Profile</a>
                </li>
                <li>
                  <a onClick={handleLogOut}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div data-theme="forest">
          <div className="navbar bg-base-100">
            <div className="flex-1">
              <a className="btn btn-ghost text-xl">jobHunter</a>
            </div>
            <div className="flex-none">
              <ul className="menu menu-horizontal px-1 flex gap-4">
                <li>
                  <Link to="/" className="btn btn-outline rounded-full">
                    <TbArrowBackUp />
                    JobSeeker
                  </Link>
                </li>
                <li>
                  <Link
                    to="/employer-sign-up"
                    className="btn btn-outline btn-error rounded-full"
                  >
                    <PiSignInBold />
                    Register
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployerHeader;
