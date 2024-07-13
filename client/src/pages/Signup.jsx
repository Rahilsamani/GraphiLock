import { useEffect, useState } from "react";
import PasswordIcon from "../components/PasswordIcon";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { checkEmail, checkUsername } from "../utils/validation";
import { nanoid } from "nanoid";
import LoginImage from "../assets/login.webp";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Signup = () => {
  const [next, setNext] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [imageData, setImageData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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
        src={imageUrl}
        selected={signupInfo.pattern.includes(index)}
        onClick={() => handleImageClick(index)}
      />
    ));
  }

  function handleImageClick(id) {
    const currentPattern = [...signupInfo.pattern];
    const index = currentPattern.findIndex((pattern) => pattern === id);
    if (index !== -1) {
      currentPattern[index] = "";
    } else {
      const emptyIndex = currentPattern.findIndex((pattern) => pattern === "");
      if (emptyIndex !== -1) currentPattern[emptyIndex] = id;
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

    setLoading(true);

    axios
      .post("http://localhost:8080/api/user/signup", signupInfo)
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
      let fullUrls = [];
      const timestamp = new Date().getTime();

      if (searchTerm === "rose") {
        const response = await axios.get("http://localhost:5000/sketchimage");
        fullUrls = response.data.map(
          (filename) =>
            `http://localhost:5000/generated_images/${filename}?t=${timestamp}`
        );
      } else {
        const response = await axios.get("http://localhost:5000/image");
        fullUrls = response.data.map(
          (filename) =>
            `http://localhost:5000/generated_images/${filename}?t=${timestamp}`
        );
      }

      setImageData(fullUrls);
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

  return (
    <div className="sm:h-[30rem] mt-12">
      {!next && (
        <div className="flex justify-center gap-10 h-full">
          {/* IMAGE */}
          <div className="hidden sm:block">
            <img
              className="transition duration-500 ease-in-out hover:scale-95 h-[50%] my-20"
              alt="Login"
              src={LoginImage}
            />
          </div>
          {/* SIGNUP FORM */}
          <div className="font-['Work_Sans'] mt-4">
            <p className="px-4 sm:px-0 text-3xl sm:text-5xl sm:font-bold">
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
              className="flex flex-col w-[80%] sm:w-2/3 px-4 sm:px-0"
            >
              <input
                {...register("username", { required: "Username is required" })}
                value={signupInfo.username}
                onChange={handleChange}
                name="username"
                className="rounded-lg h-8 sm:h-12 px-6 font-3xl border-2 border-gray-500"
                type="text"
                placeholder="Username"
              />
              {errors.username && (
                <p className="text-red-500">{errors.username.message}</p>
              )}
              <input
                {...register("email", { required: "Email is required" })}
                value={signupInfo.email}
                onChange={handleChange}
                name="email"
                className="rounded-lg h-8 sm:h-12 px-6 font-3xl mt-4 border-2 border-gray-500"
                type="email"
                placeholder="Email"
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
                className="rounded-lg h-8 sm:h-12 px-6 font-3xl mt-4 border-2 border-gray-500"
                placeholder="Phone Number"
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
                className="rounded-lg h-8 sm:h-12 px-6 font-3xl mt-4 border-2 border-gray-500"
                type="password"
                placeholder="Password"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
              <button
                type="submit"
                className="ml-4 sm:ml-0 transition duration-500 ease-in-out h-8 sm:h-12 bg-[#2691CF] rounded-lg px-6 w-[80%] sm:w-2/3 mt-4 text-white hover:text-slate-400 border-2 hover:bg-transparent border-[#2691CF] font-bold"
                disabled={loading}
              >
                Next
              </button>
            </form>
            <br />
            <div className="ml-4 sm:ml-0 text-gray-500 font-semibold text-sm sm:text-lg mt-2">
              Already have an account?{" "}
              <Link to="/login">
                <span className="text-[#2691CF]">login</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {next && (
        <div>
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-4xl text-gray-500 font-bold my-4">
              Select 3 Images
            </h1>
            <div className="mt-6">
              <input
                {...register("category", { required: "Category is required" })}
                type="text"
                name="category"
                placeholder="Enter Keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="rounded-lg w-2/3 sm:w-1/2 h-8 sm:h-12 px-6 font-3xl border-2 border-gray-500"
              />
              <button
                onClick={() => searchKeyword(keyword)}
                className="ml-2 transition duration-500 ease-in-out h-8 sm:h-12 bg-[#2691CF] rounded-lg px-6 text-white hover:text-slate-400 border-2 hover:bg-transparent border-[#2691CF] font-bold"
                disabled={loading}
              >
                {loading ? "Loading..." : "Search"}
              </button>
              {errors.category && (
                <p className="text-red-500">{errors.category.message}</p>
              )}
            </div>
            <div className="mt-10">
              {imageData.length > 0 ? (
                <div className="grid grid-cols-3 gap-4">{getIcons()}</div>
              ) : (
                <p className="text-gray-500">
                  No images found. Try another keyword.
                </p>
              )}
            </div>
            <button
              onClick={createAccount}
              className="transition duration-500 ease-in-out h-8 sm:h-12 bg-[#2691CF] rounded-lg px-6 w-1/2 mt-8 text-white hover:text-slate-400 border-2 hover:bg-transparent border-[#2691CF] font-bold"
              disabled={loading}
            >
              {getButtonTitle()}
            </button>
            <button
              onClick={handleBackClick}
              className="text-gray-500 font-semibold text-lg mt-4"
            >
              <FaArrowLeft /> Go back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
