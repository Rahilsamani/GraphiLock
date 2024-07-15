import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo2.png"

const Footer = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    axios
      .post("http://localhost/api/digest", { email: data.email })
      .then(() => {
        toast.success("Thank You For Subscribing!");
        reset();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        reset();
      });
  };

  return (
    <div className="bg-[#3B3B3B]">
      <div className="bg-[#3B3B3B] mt-24 py-10 flex justify-around flex-col sm:flex-row text-center md:text-start">
        <div className="ml-4 sm:ml-12 mt-6">
          <div className="flex justify-center md:justify-start">
            <img className="" width="30px" src={Logo} alt="" />
            <p className="sm:text-xl text-white ml-2 font-['Space_Mono']">
              GraphiLock
            </p>
          </div>
          <p className="text-gray-300 font-['Work_Sans'] mt-2 sm:mt-4">
            A Novel Approach For Security
          </p>
        </div>

        <div className="ml-4 sm:ml-0 text-white mt-6">
          <p className="font-['Space_Mono'] sm:text-xl">Explore</p>
          <p
            onClick={() => navigate("/about")}
            className="text-gray-300 font-['Work_Sans'] mt-2 sm:mt-4 cursor-pointer"
          >
            Home
          </p>
          <p
            onClick={() => navigate("/contact")}
            className="text-gray-300 font-['Work_Sans'] cursor-pointer"
          >
            Contact
          </p>
        </div>

        <div className="hidden sm:block text-white mt-6">
          <p className="font-['Space_Mono'] text-xl">Join Our Monthly Digest</p>
          <p className="text-gray-300 font-['Work_Sans'] mt-4">
            Get Exclusive Promotions & Updates.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex font-['Work_Sans'] gap-2"
          >
            <input
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid Email" },
              })}
              className="text-black mt-4 rounded-lg px-4 z-10"
              placeholder="Your Email"
            />
            <button
              type="submit"
              className="transition duration-300 ease-in w-1/3 bg-[#2691CF] rounded-lg mt-4 border-[#2691CF] px-1 border-2 hover:bg-transparent z-20 hover:z-0 -ml-4"
            >
              Subscribe
            </button>
          </form>
          {errors.email && (
            <p className="text-red-500 mt-2">{errors.email.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Footer;
