const AttackBlock = ({ icon, title, desc }) => {
  return (
    <div className="transition duration-500 ease-in-out bg-cover hover:scale-95 w-full md:w-[90%] rounded-[25px] bg-[#90cddb] p-6 sm:p-12 mb-12">
      <div className="h-full w-full">
        <div>
          <img className="w-1/6" alt="" src={icon} />
          <p className="text-white text-2xl sm:text-3xl pt-4 font-bold">
            {title}
          </p>
          <br />
        </div>
        <div className="text-white sm:text-xl">
          <p>{desc}</p>
        </div>
      </div>
    </div>
  );
};

export default AttackBlock;
