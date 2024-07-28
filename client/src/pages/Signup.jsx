import { useEffect, useState } from "react";
import PasswordIcon from "../components/PasswordIcon";
import { FaArrowLeft, FaSearch } from "react-icons/fa";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { checkEmail, checkUsername } from "../utils/validation";
import { nanoid } from "nanoid";
import SignupImage from "../assets/signup.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { getNameByNumber } from "../utils/imageValidation";

const Signup = () => {
  const [next, setNext] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [imageData, setImageData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [iteration, setIteration] = useState(0);
  const [signupInfo, setSignupInfo] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    category: "",
    pattern: ["", "", ""],
    sets: [[]],
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    setSignupInfo((prev) => ({
      ...prev,
      sets: imageData,
      pattern: ["", "", ""],
    }));
  }, [imageData]);

  function handleChange(event) {
    setSignupInfo((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
    setValue(event.target.name, event.target.value);
  }

  function getIcons() {
    return imageData.map((imageUrl, index) => (
      <PasswordIcon
        iteration={index}
        id={index}
        key={nanoid()}
        src={imageUrl.url}
        selected={signupInfo.pattern.includes(index)}
        onClick={() => handleImageClick(imageUrl.url)}
      />
    ));
  }

  function handleImageClick(url) {
    const currentPattern = [...signupInfo.pattern];
    const index = currentPattern.findIndex((pattern) => pattern === url);

    if (index !== -1) {
      currentPattern[index] = "";
      setIteration((prev) => Math.max(prev - 1, 0));
    } else {
      const emptyIndex = currentPattern.findIndex((pattern) => pattern === "");
      if (emptyIndex !== -1) {
        currentPattern[emptyIndex] = url;
        setIteration((prev) => prev + 1);
      }
    }

    setSignupInfo((prev) => ({
      ...prev,
      pattern: currentPattern,
    }));
  }

  function createAccount() {
    if (signupInfo.pattern.includes("")) {
      toast.error("Select all 3 images!");
      return;
    }

    signupInfo.category = keyword;

    setLoading(true);

    axios
      .post(`${process.env.REACT_APP_BACKEND}/api/user/signup`, signupInfo)
      .then((res) => {
        setLoading(false);
        localStorage.setItem("authToken", res.data.token);
        toast.success("Account created successfully!");
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        if (err.response) {
          toast.error(err.response.data.message);
        } else {
          toast.error("An error occurred. Please try again.");
        }
      });
  }

  async function searchKeyword(searchTerm) {
    if (searchTerm === "") {
      toast.error("Invalid keyword!");
      return;
    }

    setLoading(true);
    try {
      const fullUrls = await axios.get(
        `${process.env.REACT_APP_BACKEND}/api/image/search?keyword=${keyword}`
      );

      const allImages = fullUrls.data.splitArrays.flat();

      const uniqueImages = allImages.filter(
        (image, index, self) =>
          index === self.findIndex((img) => img.url === image.url)
      );

      const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      };

      const selectedUrls = shuffleArray(uniqueImages).slice(0, 12);

      setImageData(selectedUrls);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error(
        err.response?.data?.message || "An error occurred. Please try again."
      );
    }
  }

  async function validateUsernameAndEmail() {
    const isEmailExist = await checkEmail(signupInfo.email, setLoading);
    const isUsernameExists = await checkUsername(
      signupInfo.username,
      setLoading
    );

    if (isUsernameExists) toast.error("Username already exists!");
    else if (isEmailExist) toast.error("Email already exists!");

    return !isEmailExist && !isUsernameExists;
  }

  async function handleNextClick(event) {
    if (await validateUsernameAndEmail()) {
      setNext(true);
    }
  }

  function getButtonTitle() {
    return loading ? "Loading..." : "Create Account";
  }

  function handleBackClick() {
    setNext(false);
  }

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div className=" sm:h-[38rem] mt-12 pr-5">
      {!next && (
        <div className="flex justify-center items-center h-full">
          {/* image */}
          <div className="hidden sm:block w-1/2">
            <img
              className="transition duration-500 ease-in-out hover:scale-95 my-20"
              alt="Login"
              src={SignupImage}
            />
          </div>
          {/* signup form */}
          <div className="font-['Work_Sans'] mt-4 w-[80%] md:w-[40%]">
            <p className="px-4 sm:px-0 text-[#2691CF] font-semibold text-5xl sm:text-5xl sm:font-bold">
              Create Account
            </p>
            <br />
            <p className="text-lg sm:text-2xl px-4 sm:px-0">
              Welcome! Enter Your Details And Experience
            </p>
            <p className="text-lg sm:text-2xl px-4 sm:px-0">
              Graphical Password System.
            </p>
            <br />
            <form
              onSubmit={handleSubmit(handleNextClick)}
              className="flex flex-col w-[90%] px-4 sm:px-0"
            >
              <input
                {...register("username", { required: "Username is required" })}
                value={signupInfo.username}
                onChange={handleChange}
                name="username"
                className="rounded-lg h-8 sm:h-12 px-3 font-3xl border-2 border-gray-500"
                type="text"
                placeholder="Enter your username"
              />
              {errors.username && (
                <p className="text-red-500">{errors.username.message}</p>
              )}
              <input
                {...register("email", { required: "Email is required" })}
                value={signupInfo.email}
                onChange={handleChange}
                name="email"
                className="rounded-lg h-8 sm:h-12 px-3 font-3xl mt-4 border-2 border-gray-500"
                type="email"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
              <input
                {...register("phoneNumber", {
                  required: "Phone number is required",
                })}
                type="tel"
                name="phoneNumber"
                className="rounded-lg h-8 sm:h-12 px-3 font-3xl mt-4 border-2 border-gray-500"
                placeholder="Enter your phone number"
                value={signupInfo.phoneNumber}
                onChange={handleChange}
              />
              {errors.phoneNumber && (
                <p className="text-red-500">{errors.phoneNumber.message}</p>
              )}
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password length should be more than 8",
                  },
                })}
                value={signupInfo.password}
                onChange={handleChange}
                name="password"
                className="rounded-lg h-8 sm:h-12 px-3 font-3xl mt-4 border-2 border-gray-500"
                type="password"
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
              <div className="flex justify-center items-center">
                <button
                  type="submit"
                  className="ml-4 sm:ml-0 transition duration-500 ease-in-out h-8 sm:h-12 bg-[#2691CF] rounded-lg px-6 w-[80%] sm:w-2/3 mt-4 text-white hover:text-slate-400 border-2 hover:bg-transparent border-[#2691CF] font-bold"
                  disabled={loading}
                >
                  Next
                </button>
              </div>
            </form>
            <br />
            <div className="ml-4 sm:ml-0 text-gray-500 font-semibold text-md mt-2 flex justify-center">
              Already have an account?
              <Link to="/login">
                <span className="text-[#2691CF] ml-1">login</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {next && (
        <div className="sm:flex h-full">
          {imageData.length > 0 && (
            <div className="hidden sm:grid grid-cols-2 md:grid-cols-4 bg-slate-200 rounded-lg w-[75%] justify-items-center py-4 px-2 gap-2 ml-12">
              {getIcons()}
            </div>
          )}
          {imageData.length === 0 && (
            <div className="text-2xl text-white hidden sm:flex justify-center items-center h-full bg-slate-200 w-[75%] ml-12 rounded-lg">
              <p className="bg-red-600 px-3 py-1 rounded-lg">No Images :(</p>
            </div>
          )}

          {/*DESKTOP VIEW*/}
          <div className="hidden sm:block font-['Work_Sans'] mt-4 ml-12 w-1/2">
            <p className="text-[#2691CF] text-5xl font-bold">
              Set Graphical Password
            </p>
            <br />
            {iteration === 0 && (
              <p className="text-grey text-2xl">Enter keyword to get images.</p>
            )}

            <p className="text-slate-600 text-2xl">
              Select{" "}
              <span className="text-[#2691CF]">
                {getNameByNumber(iteration + 1)}
              </span>{" "}
              Image.
            </p>

            {iteration === 0 && (
              <div className="align-middle items-center">
                <p className="text-grey text-2xl">Type Keyword: </p>
                <div className=" rounded-lg flex mt-2">
                  <input
                    onChange={(event) => setKeyword(event.target.value)}
                    onKeyPress={(event) => {
                      if (event.key === "Enter") {
                        searchKeyword();
                      }
                    }}
                    value={keyword}
                    placeholder="Try 'Cats'"
                    className="rounded-l-md px-4 bg-gray-100 text-2xl py-1 w-full"
                  />
                  <button
                    onClick={searchKeyword}
                    className="bg-gray-100 transition duration-500 ease-in-out rounded-r-lg px-4 h-12 hover:bg-gray-300"
                  >
                    <FaSearch className="text-black" />
                  </button>
                </div>
              </div>
            )}
            <div className="flex justify-start items-center gap-5 mt-12">
              <button
                onClick={createAccount}
                className="transition duration-500 ease-in-out h-12 bg-[#2691CF] rounded-full px-6 w-2/3 text-white border-2 hover:bg-transparent hover:text-black border-[#2691CF] font-bold"
              >
                {getButtonTitle()}
              </button>
              <button
                onClick={handleBackClick}
                className="transition text-slate-500 duration-500 ease-in-out border-2 border-[#2691CF] rounded-full px-4 h-12"
              >
                <FaArrowLeft />
              </button>
            </div>
          </div>

          {/*MOBILE VIEW*/}
          <div className="sm:hidden font-['Work_Sans'] mt-4 ml-4">
            <p className="text-[#2691CF] text-4xl font-bold">
              Set Graphical Password
            </p>
            <br />
            <p className="text-grey text-lg">Enter keyword to get images.</p>
            <p className="text-slate-600 text-lg">
              Select{" "}
              <span className="text-green-400">
                {getNameByNumber(iteration + 1)}
              </span>{" "}
              Image.
            </p>
            <br />
            {iteration === 0 && (
              <div className="align-middle items-center">
                <p className="text-grey text-lg">Type Keyword: </p>
                <div className=" rounded-md flex mt-2">
                  <input
                    onChange={(event) => setKeyword(event.target.value)}
                    value={keyword}
                    placeholder="Try 'Cats'"
                    className="rounded-l-md px-2 bg-gray-100 h-8 text-lg py-0"
                  />
                  <button
                    onClick={searchKeyword}
                    className="bg-gray-100 transition duration-500 ease-in-out rounded-r-lg px-4 h-8 hover:bg-gray-300"
                  >
                    <FaSearch className="text-black" />
                  </button>
                </div>
              </div>
            )}

            {imageData.length > 0 && (
              <div className="mt-4 grid grid-cols-2 bg-slate-200 h-full rounded-md w-full justify-items-center py-4 gap-1 gap-x-0 -ml-2">
                {getIcons()}
              </div>
            )}
            {imageData.length === 0 && (
              <div className="text-xl text-white flex justify-center items-center h-full bg-[#3B3B3B] w-[80%] rounded-md mt-4">
                <p className="bg-red-600 px-2 py-0 rounded-md my-8">
                  No Images :(
                </p>
              </div>
            )}

            <div className="flex justify-center items-center mt-10 gap-5">
              <button
                onClick={createAccount}
                className="transition duration-500 ease-in-out h-10 bg-[#2691CF] rounded-full px-4 w-[200px] text-white hover:bg-transparent"
              >
                {getButtonTitle()}
              </button>
              <button
                onClick={handleBackClick}
                className="transition duration-500 ease-in-out border-2 border-[#2691CF] rounded-full px-4 h-8 hover:bg-[#2691CF]"
              >
                <FaArrowLeft className="text-grey" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
