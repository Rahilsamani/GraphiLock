const PasswordIcon = ({ src, onClick, id, iteration, selected }) => {
  const selectedClasses = "bg-purple-500 shadow-xl";

  return (
    <img
      alt="Password icon"
      src={src}
      onClick={() => onClick(id, iteration)}
      className={`w-[80%] transition duration-500 ease-in-out hover:shadow-2xl hover:scale-105 rounded-lg p-1 cursor-pointer ${
        selected ? selectedClasses : ""
      }`}
    />
  );
};

export default PasswordIcon;
