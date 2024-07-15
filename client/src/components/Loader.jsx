import { Triangle } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center text-white z-50">
      <div className="text-center">
        <Triangle
          height={80}
          width={80}
          color="#2691CF"
          ariaLabel="triangle-loading"
          visible={true}
        />
        <p className="text-xl mt-4">Loading, please wait...</p>
      </div>
    </div>
  );
};

export default Loader;
