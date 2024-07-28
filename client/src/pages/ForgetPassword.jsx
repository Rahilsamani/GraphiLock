import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import ForgetImage from "../assets/forget_password.jpg";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") setEmail(value);
    else if (name === "resetToken") setResetToken(value);
    else if (name === "newPassword") setNewPassword(value);
  };

  const handleSendEmail = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/user/forgot-password",
        { email }
      );
      toast.success(res.data.message);
      setStep(2);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Internal server error");
    }
  };

  const handleResetPassword = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/user/reset-password",
        { resetToken, newPassword }
      );
      toast.success(res.data.message);
      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Internal server error");
    }
  };

  return (
    <div className="sm:h-[30rem] sm:mt-12 flex justify-center items-center">
      <div className="flex justify-center items-center h-full flex-row-reverse w-11/12">
        <div className="hidden sm:block w-1/2">
          <img
            className="transition duration-500 ease-in-out hover:scale-95 my-24"
            height={200}
            alt="Login Illustration"
            src={ForgetImage}
          />
        </div>
        <div className="font-['Work_Sans'] mt-16 w-[80%] md:w-1/2">
          {step === 1 ? (
            <>
              <p className="text-3xl sm:text-5xl sm:font-bold px-4 sm:px-0">
                Forgot Password
              </p>
              <p className="text-lg sm:text-2xl px-4 sm:px-0 mt-4">
                Enter Your Email Below to Reset Password
              </p>
              <div className="flex flex-col w-[80%] sm:w-2/3 px-4 sm:px-0 mt-4">
                <input
                  value={email}
                  onChange={handleChange}
                  name="email"
                  className="rounded-xl h-8 sm:h-12 px-3 font-3xl border-2 border-gray-500"
                  type="email"
                  placeholder="Email"
                />
              </div>
              <button
                onClick={handleSendEmail}
                className="ml-4 sm:ml-0 transition duration-500 ease-in-out h-8 sm:h-12 bg-[#2691CF] rounded-full px-6 sm:w-[150px] mt-6 text-white border-2 hover:bg-transparent hover:text-slate-500 border-[#2691CF] font-bold"
              >
                Send Email
              </button>
            </>
          ) : (
            <>
              <p className="text-3xl sm:text-5xl sm:font-bold px-4 sm:px-0">
                Reset Password
              </p>
              <p className="text-lg sm:text-2xl px-4 sm:px-0 mt-4">
                Enter the Reset Token and New Password Below
              </p>
              <div className="flex flex-col w-[80%] sm:w-2/3 px-4 sm:px-0 mt-4">
                <input
                  value={resetToken}
                  onChange={handleChange}
                  name="resetToken"
                  className="rounded-full h-8 sm:h-12 px-6 font-3xl border-2 border-gray-500"
                  type="text"
                  placeholder="Reset Token"
                />
                <input
                  value={newPassword}
                  onChange={handleChange}
                  name="newPassword"
                  className="rounded-full h-8 sm:h-12 px-6 font-3xl mt-4 border-2 border-gray-500"
                  type="password"
                  placeholder="New Password"
                />
              </div>
              <button
                onClick={handleResetPassword}
                className="ml-4 sm:ml-0 transition duration-500 ease-in-out h-8 sm:h-12 bg-[#2691CF] rounded-full px-6 sm:w-2/3 mt-6 text-white border-2 hover:bg-transparent hover:text-slate-500 border-[#2691CF] font-bold"
              >
                Reset Password
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
