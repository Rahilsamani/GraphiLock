import { useState } from "react";
import { checkUsername } from "../utils/validation";
import { toast } from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa";
import PasswordIcon from "../components/PasswordIcon";
import axios from "axios";
import { getNameByNumber } from "../utils/imageValidation";
import BlockedBox from "../components/BlockedBox";
import LoginImage from "../assets/login.webp";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const Login = () => {
  const [next, setNext] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [iteration, setIteration] = useState(0);
  const [imageData, setImageData] = useState([]);
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
    category: "",
    pattern: ["", "", ""],
  });
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setLoginInfo((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleNextClick = async () => {
    if (validateData() && (await validateUsernameAndEmail())) {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/image?username=${loginInfo.username}`
        );
        setImageData(res.data[0] || []);
        setNext(true);
      } catch (err) {
        toast.error(err.response?.data?.message || "Internal server error");
      }
    }
  };

  const handleImageClick = (id) => {
    if (iteration >= 3) {
      toast.error("You can only select 3 images for the pattern");
      return;
    }
    const newPattern = [...loginInfo.pattern];
    newPattern[iteration] = id;
    setLoginInfo((prev) => ({
      ...prev,
      pattern: newPattern,
    }));
    setIteration(iteration + 1);
  };

  const validateData = () => {
    if (loginInfo.username.length < 1) {
      toast.error("Invalid Username!");
      return false;
    } else if (loginInfo.password.length < 8) {
      toast.error("Password Length Must Be Greater Than 8");
      return false;
    }
    return true;
  };

  const validateUsernameAndEmail = async () => {
    const isUsernameExists = await checkUsername(loginInfo.username);
    if (!isUsernameExists) toast.error("Username does not exist!");
    return isUsernameExists;
  };

  const login = async () => {
    if (loginInfo.pattern.includes("")) {
      toast.error("Select an image for each step!");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:8080/api/user/login",
        loginInfo
      );
      setLoading(false);
      setUserInfo({
        email: res.data.email,
        username: res.data.username,
        category: res.data.category,
      });
      setLoggedIn(true);
      toast.success("Logged In!");
      navigate("/");
    } catch (err) {
      setLoading(false);
      setIteration(0);
      setLoginInfo((prev) => ({
        ...prev,
        pattern: ["", "", ""],
      }));
      setNext(false);
      if (err.response && err.response.data.status === "blocked") {
        setBlocked(true);
      } else {
        setLoginError("Invalid credentials");
      }
    }
  };

  const getButtonTitle = () => (iteration < 3 ? "Next" : "Login");

  const handleBackClick = () => {
    if (iteration === 0) setNext(false);
    else setIteration(iteration - 1);
  };

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div className="sm:h-[30rem] sm:mt-12 flex justify-center items-center">
      {blocked && <BlockedBox onClick={() => setBlocked(false)} />}

      {!next ? (
        <div className="flex justify-around h-full flex-row-reverse gap-10 w-11/12">
          <div className="hidden sm:block w-[40%]">
            <img
              className="transition duration-500 ease-in-out hover:scale-95 h-[50%] my-24"
              alt=""
              src={LoginImage}
            />
          </div>
          <div className="font-['Work_Sans'] mt-16 w-[35%]">
            <p className="text-3xl sm:text-5xl sm:font-bold px-4 sm:px-0">
              Login
            </p>
            <br />
            <p className="text-lg sm:text-2xl px-4 sm:px-0">
              Welcome Back! Enter Your Details Below
            </p>
            <br />
            <div className="flex flex-col w-full px-4 sm:px-0">
              <input
                value={loginInfo.username}
                onChange={handleChange}
                name="username"
                className="rounded-md h-8 sm:h-12 px-3 font-3xl border-2 border-gray-500"
                type="text"
                placeholder="Enter Username"
              />
              <input
                value={loginInfo.category}
                onChange={handleChange}
                name="category"
                className="rounded-md h-8 sm:h-12 px-3 mt-4 font-3xl border-2 border-gray-500"
                type="text"
                placeholder="Enter Category"
              />
              <input
                value={loginInfo.password}
                onChange={handleChange}
                name="password"
                className="rounded-md h-8 sm:h-12 px-3 font-3xl mt-4 border-2 border-gray-500"
                type="password"
                placeholder="Enter Password"
              />
            </div>
            {loginError && <p className="text-red-500">{loginError}</p>}
            <div className="flex mt-3 justify-end">
              <button
                onClick={() => navigate("/forget-password")}
                className="transition duration-500 ease-in-out text-[#2691CF] font-bold text-sm "
              >
                Forgot Password
              </button>
            </div>
            <button
              onClick={handleNextClick}
              className="ml-4 w-max sm:ml-0 transition duration-500 ease-in-out px-6 py-1 bg-[#2691CF] rounded-md mt-6 text-white border-2 hover:bg-transparent hover:text-slate-500 border-[#2691CF] font-bold"
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <div className="sm:flex justify-center h-full">
          <div className="hidden sm:grid grid-cols-4 bg-[#3B3B3B] h-full rounded-lg w-[75%] justify-items-center py-4 px-2 gap-2 ml-12">
            {imageData.map((imageUrl, index) => (
              <PasswordIcon
                iteration={index}
                id={index}
                key={index}
                src={imageUrl}
                selected={loginInfo.pattern.includes(index)}
                onClick={() => handleImageClick(index)}
              />
            ))}
          </div>

          <div className="sm:block hidden font-['Work_Sans'] mt-4 ml-16">
            <p className="text-5xl  font-bold">Set Graphical Password</p>
            <br />
            <p className="text-2xl">
              Select Images For Your Graphical Password.
            </p>
            <p className="text-2xl">
              Select{" "}
              <span className="text-green-400">
                {getNameByNumber(iteration + 1)}
              </span>{" "}
              Image.
            </p>
            <br />
            <button
              onClick={login}
              disabled={iteration < 3}
              className={`transition duration-500 ease-in-out h-12 ${
                iteration < 3
                  ? "bg-gray-400 text-gray-800 cursor-not-allowed"
                  : "bg-[#2691CF] text-white hover:bg-transparent hover:text-slate-600 border-[#2691CF]"
              } rounded-full px-6 w-2/3 mt-6 border-2 font-bold`}
            >
              {getButtonTitle()}
            </button>
            <button
              onClick={handleBackClick}
              className="transition duration-500 ease-in-out border-2 border-[#2691CF] rounded-full px-4 h-12 ml-4 hover:bg-[#2691CF] group"
            >
              <FaArrowLeft className="text-slate-500 group-hover:text-slate-200" />
            </button>
          </div>

          <div className="sm:hidden font-['Work_Sans'] mt-4 ml-4">
            <p className=" text-2xl font-bold">Set Graphical Password</p>
            <br />
            <p className="text-lg">
              Select Images For Your Graphical Password.
            </p>
            <p className="text-lg">
              Select{" "}
              <span className="text-green-400">
                {getNameByNumber(iteration + 1)}
              </span>{" "}
              Image.
            </p>
            <br />
            <div className="grid grid-cols-3 gap-2">
              {imageData.map((imageUrl, index) => (
                <PasswordIcon
                  iteration={index}
                  id={index}
                  key={index}
                  src={imageUrl}
                  selected={loginInfo.pattern.includes(index)}
                  onClick={() => handleImageClick(index)}
                />
              ))}
            </div>
            <button
              onClick={login}
              disabled={iteration < 3}
              className={`transition duration-500 ease-in-out h-10 ${
                iteration < 3
                  ? "bg-gray-400 text-gray-800 cursor-not-allowed"
                  : "bg-[#2691CF] text-white hover:bg-transparent hover:text-slate-600 border-[#2691CF]"
              } rounded-full px-4 w-full mt-6 border-2 font-bold`}
            >
              {getButtonTitle()}
            </button>
            <button
              onClick={handleBackClick}
              className="transition duration-500 ease-in-out border-2 border-[#2691CF] rounded-full px-4 h-10 ml-2 hover:bg-[#2691CF] group"
            >
              <FaArrowLeft className="text-slate-500 group-hover:text-slate-200" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
