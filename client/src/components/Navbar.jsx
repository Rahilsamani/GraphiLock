import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";
import { useSelector } from "react-redux";

const Navbar = () => {
  const userInfo = useSelector((state) => state.profile);
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

      {console.log("userInfo", userInfo)}

      {userInfo.user && (
        <div>
          <Link to="/">
            <p className="text-xl text-slate-800">{userInfo.user.username}</p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
