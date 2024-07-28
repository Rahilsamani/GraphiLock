import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { setUser } from "../slices/profileSlice";
import ProfileDropdown from "./profileDropDown";

const Navbar = () => {
  const userInfo = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(setUser(null));
    localStorage.removeItem("user");
    toast.success("Logged Out");
    navigate("/");
  };

  return (
    <div className="md:p-6 py-2 px-4 flex justify-between items-center">
      {/* Logo */}
      <Link to="/">
        <img height={60} width={150} src={Logo} alt="brand-logo" />
      </Link>

      {/* Nav Elements */}
      <div className="font-['Work_Sans'] text-black hidden md:flex items-center gap-10">
        <Link to="/">
          <p className="hover:text-gray-600 text-xl cursor-pointer">Home</p>
        </Link>
        <Link to="/contact">
          <p className="hover:text-gray-600 cursor-pointer text-xl">Contact</p>
        </Link>
      </div>

      {/* Buttons */}
      {!userInfo.user && (
        <div className="font-['Work_Sans'] text-black hidden md:flex items-center gap-5">
          <Link to="/login">
            <button className="transition duration-500 ease-in-out bg-[#2691CF] rounded-lg px-4 py-1 border-[#2691CF] border-2 hover:bg-transparent text-white hover:text-black">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="transition duration-500 ease-in-out bg-[#2691CF] rounded-lg px-4 py-1 border-[#2691CF] border-2 hover:bg-transparent text-white hover:text-black">
              Sign Up
            </button>
          </Link>
        </div>
      )}

      {userInfo.user && (
        <div className="hidden md:flex justify-center items-center gap-3">
          <Link to="/">
            <p className="text-xl text-slate-800">{userInfo.user.username}</p>
          </Link>
          <button
            className="bg-[#2691CF] px-3 py-1 rounded-lg"
            onClick={logout}
          >
            <div>Logout</div>
          </button>
        </div>
      )}

      <div className="md:hidden" >
        <ProfileDropdown />
      </div>
    </div>
  );
};

export default Navbar;
