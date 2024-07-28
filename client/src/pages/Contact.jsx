import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import ContactUs from "../assets/contactus.webp";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_BACKEND}/api/contact`, data)
      .then(() => {
        setLoading(false);
        toast.success("Message Sent");
        reset();
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data.message);
      });
  };

  return (
    <div className="h-full flex sm:flex-row flex-col justify-center font-['Work_Sans'] mt-12">
      <div className="sm:w-2/5">
        <p className="text-2xl sm:text-5xl text-gray-600 px-6 mb-5">
          Get in Touch with GraphiLock
        </p>
        <p className="text-xl sm:text-2xl text-gray-500 px-6">
          We are here to respond to your queries. Feel free to reach out to us
          for any assistance.
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col px-6 py-6 mt-4"
        >
          <div className="mb-4">
            <p className="sm:text-xl mb-1 pl-3">Full Name</p>
            <input
              {...register("name", {
                required: "Name is required",
                minLength: 3,
              })}
              placeholder="Enter Your Name"
              className="border-2 border-gray-900 rounded-md h-8 sm:h-12 px-3 font-3xl sm:w-3/4 w-[90%]"
              type="text"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-4">
            <p className="sm:text-xl mb-1 pl-3">Email</p>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: /^\S+@\S+$/i,
              })}
              placeholder="Enter Your Email"
              className="border-2 border-gray-900 rounded-md h-8 sm:h-12 px-3 font-3xl sm:w-3/4 w-[90%]"
              type="email"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div>
            <p className="sm:text-xl mb-1">Message</p>
            <textarea
              {...register("message", {
                required: "Message is required",
                minLength: 3,
              })}
              rows="4"
              placeholder="Enter Your Message"
              className="border-2 border-gray-900 rounded-md px-2 sm:px-3 font-3xl py-2 sm:w-3/4 w-[90%]"
            />
            {errors.message && (
              <p className="text-red-500">{errors.message.message}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-[90px] flex justify-center items-center mt-3 transition duration-500 ease-in-out h-8 py-2 bg-[#2691CF] rounded-xl sm:px-6 text-white hover:text-slate-800 border-2 hover:bg-transparent border-[#2691CF] sm:font-bold"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>

      <div className="hidden sm:flex items-center w-2/5">
        <img
          className="transition duration-500 ease-in-out hover:scale-95 rounded-xl"
          alt="Contact Us"
          src={ContactUs}
        />
      </div>
    </div>
  );
};

export default Contact;
