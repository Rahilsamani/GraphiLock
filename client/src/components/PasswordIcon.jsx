const PasswordIcon = ({ src, onClick, id, iteration, selected }) => {
  return (
    <img
      alt="Password icon"
      src={src}
      onClick={() => onClick(id, iteration)}
      className={`w-[80%] transition duration-500 ease-in-out hover:shadow-2xl hover:scale-105 rounded-lg cursor-pointer ${
        selected ? "bg-blue-400 shadow-xl" : ""
      }`}
    />
  );
};

export default PasswordIcon;
