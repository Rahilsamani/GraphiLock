import { useRef, useState } from "react";
import { VscSignOut } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { setUser } from "../slices/profileSlice";
import { IoMenu } from "react-icons/io5";
import useOnClickOutside from "../hooks/useOnClickOutside";

export default function ProfileDropdown() {
  const userInfo = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useOnClickOutside(ref, () => setOpen(false));
  if (!userInfo) return null;

  const logout = () => {
    dispatch(setUser(null));
    localStorage.removeItem("user");
    toast.success("Logged Out");
    navigate("/");
  };

  return (
    <button className="relative" onClick={() => setOpen(true)}>
      <div className="flex items-center gap-x-1">
        <IoMenu className="text-3xl font-bold" />
      </div>
      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          ref={ref}
          className="absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-slate-700 overflow-hidden rounded-md border-[1px] border-slate-300 bg-richblack-800"
        >
          <Link to="/" onClick={() => setOpen(false)}>
            <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
              Home
            </div>
          </Link>
          <Link to="/contact" onClick={() => setOpen(false)}>
            <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
              Contact
            </div>
          </Link>
          <Link to="/login" onClick={() => setOpen(false)}>
            <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
              Login
            </div>
          </Link>
          <Link to="/signup" onClick={() => setOpen(false)}>
            <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
              Signup
            </div>
          </Link>
          {userInfo.user && (
            <div
              onClick={() => {
                logout();
                setOpen(false);
              }}
              className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25 cursor-pointer"
            >
              <VscSignOut className="text-lg" />
              Logout
            </div>
          )}
        </div>
      )}
    </button>
  );
}
