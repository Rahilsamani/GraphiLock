import { FaTimesCircle } from "react-icons/fa";

const BlockedBox = ({ setBlocked }) => {
  return (
    <div className="mt-6 sm:mb-12 rounded-lg w-[90%] sm:w-1/2 bg-red-600 mx-auto flex justify-between align-middle">
      <p className="ml-8 text-white sm:text-xl py-2">
        <FaTimesCircle />
        This account has been blocked. Please check your email.
      </p>
      <button onClick={() => setBlocked(false)} className="mr-4 text-white">
        <FaTimesCircle />
      </button>
    </div>
  );
};

export default BlockedBox;
