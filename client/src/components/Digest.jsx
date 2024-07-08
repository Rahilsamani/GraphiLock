import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import axios from "axios";
import DigestImage from "../assets/digest.png";

const Digest = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axios
      .post(`http://localhost:8080/api/digest`, { email: data.email })
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
    <div className="flex sm:flex-row flex-col justify-center bg-[#3B3B3B] rounded-[25px] mt-12 sm:mt-24 w-[90%] sm:w-3/4 mx-auto">
      <div className="flex justify-center transition duration-500 ease-in-out hover:scale-95 px-4 sm:w-2/5 sm:ml-12 my-4 sm:my-16">
        <img alt="" src={DigestImage} />
      </div>

      <div className="px-4 sm:px-0 font-['Work_Sans'] text-white max-w-lg mx-auto sm:mt-16">
        <p className="text-3xl sm:text-5xl font-bold">
          Join Our Monthly Digest
        </p>
        <p className="text-lg sm:text-2xl mt-4">
          Get Exclusive Promotions & Updates Straight To Your Box
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col sm:mt-4 mb-8"
        >
          <div className="flex justify-center sm:justify-start">
            <input
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid Email" },
              })}
              className="text-black w-1/2 mt-6 rounded-lg px-4 z-10"
              placeholder="Your Email"
            />
            <button
              type="submit"
              className="transition duration-300 ease-out w-1/3 bg-[#2691CF] rounded-lg px-4 py-1 mt-6 text-sm sm:text-xl border-[#2691CF] border-2 hover:bg-transparent z-20 hover:z-0 -ml-4"
            >
              Subscribe
            </button>
          </div>
          {errors.email && (
            <p className="text-red-500 mt-2">{errors.email.message}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Digest;
