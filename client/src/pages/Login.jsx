import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../slices/profileSlice";
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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setLoginInfo((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const shuffleArray = (array) => {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  const handleNextClick = async () => {
    if (validateData() && (await validateUsernameAndEmail())) {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/image?username=${loginInfo.username}`
        );
        const shuffledData = shuffleArray(res.data.sets[0] || []);
        setImageData(shuffledData);
        setNext(true);
      } catch (err) {
        toast.error(err.response?.data?.message || "Internal server error");
      }
    }
  };

  const handleImageClick = (url) => {
    if (iteration >= 3) {
      toast.error("You can only select 3 images for the pattern");
      return;
    }
    const newPattern = [...loginInfo.pattern];
    newPattern[iteration] = url;
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
    const isUsernameExists = await checkUsername(
      loginInfo.username,
      setLoading
    );
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
      const user = {
        email: res.data.email,
        username: res.data.username,
        category: res.data.category,
      };
      dispatch(setUser(user));
      localStorage.setItem("user", JSON.stringify(user));
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

  const handleBackClick = () => {
    if (iteration === 0) {
      setNext(false);
    } else {
      const newPattern = [...loginInfo.pattern];
      newPattern[iteration - 1] = "";
      setLoginInfo((prev) => ({
        ...prev,
        pattern: newPattern,
      }));
      setIteration(iteration - 1);
    }
  };

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div className="mt-12 flex justify-center items-center min-h-max">
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
          <div className="font-['Work_Sans'] mt-16 w-[80%] sm:w-[35%]">
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
        <div className="sm:flex justify-center items-center h-full">
          <div className="hidden sm:grid grid-cols-2 md:grid-cols-4 bg-slate-200 h-screen min-h-fit py-10 px-5 rounded-lg w-[75%] justify-items-center gap-2 ml-12">
            {imageData.map((imageUrl, index) => (
              <PasswordIcon
                iteration={index}
                id={index}
                key={index}
                src={imageUrl.url}
                selected={loginInfo.pattern.includes(imageUrl.url)}
                onClick={() => handleImageClick(imageUrl.url)}
              />
            ))}
          </div>

          <div className="sm:block hidden font-['Work_Sans'] mt-4 ml-16">
            <p className="text-5xl text-[#2691CF] font-bold">
              Set Graphical Password
            </p>
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
            <div className="flex justify-start items-center gap-10 mt-5">
              <button
                onClick={login}
                disabled={iteration < 3}
                className={`transition duration-500 ease-in-out h-12 ${
                  iteration < 3
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-[#2691CF] hover:bg-transparent hover:text-slate-500"
                } rounded-md text-white border-2 border-[#2691CF] font-bold px-4`}
              >
                Login
              </button>

              <button
                onClick={handleBackClick}
                className="transition duration-500 ease-in-out px-2 text-lg py-2 rounded-full bg-[#2691CF] text-white border-2 hover:bg-transparent hover:text-slate-500 border-[#2691CF] font-bold"
              >
                <FaArrowLeft />
              </button>
            </div>
          </div>

          <div className="sm:hidden w-full flex justify-center">
            <div className="grid grid-cols-2 bg-slate-200 justify-items-center py-4 gap-2 w-11/12 rounded-lg">
              {imageData.map((imageUrl, index) => (
                <PasswordIcon
                  iteration={index}
                  id={index}
                  key={index}
                  src={imageUrl.url}
                  selected={loginInfo.pattern.includes(imageUrl.url)}
                  onClick={() => handleImageClick(imageUrl.url)}
                />
              ))}
            </div>
          </div>

          <div className="sm:hidden block mt-4 font-['Work_Sans'] text-center">
            <p className="text-[#2691CF] text-4xl  font-bold">Set Graphical Password</p>
            <br />
            <p className="text-xl">
              Select Images For Your Graphical Password.
            </p>
            <p className="text-xl">
              Select{" "}
              <span className="text-green-400">
                {getNameByNumber(iteration + 1)}
              </span>{" "}
              Image.
            </p>

            <div className="flex justify-center gap-10 items-end mt-10">
              <div>
                <button
                  onClick={login}
                  disabled={iteration < 3}
                  className={`transition duration-500 ease-in-out h-10 ${
                    iteration < 3
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "bg-[#2691CF] hover:bg-transparent hover:text-slate-500"
                  } rounded-md text-white border-2 border-[#2691CF] font-bold px-4`}
                >
                  Login
                </button>
              </div>

              <div>
                <button
                  onClick={handleBackClick}
                  className="transition duration-500 ease-in-out p-2 bg-[#2691CF] text-white border-2 hover:bg-transparent hover:text-slate-500 border-[#2691CF] font-bold rounded-full"
                >
                  <FaArrowLeft />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
