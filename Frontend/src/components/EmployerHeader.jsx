import { Link } from "react-router-dom";
import { TbArrowBackUp } from "react-icons/tb";
import { PiSignInBold } from "react-icons/pi";

function EmployerHeader() {
  return (
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
  );
}

export default EmployerHeader;
