import { FaLock, FaUnlock } from "react-icons/fa";
import AttackBlock from "../components/AttackBlock";
import Digest from "../components/Digest";
import { useState } from "react";
import Secured from "../assets/secured.png";
import Atom from "../components/Atom";
import showPassword from "../assets/show-password.png";
import spyWare from "../assets/spyware-free.png";
import Pin from "../assets/enter-pin.png";
import ReEnter from "../assets/re-enter-pincode.png";

const Home = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleKnowMore = () => {
    const element = document.getElementById("home--2");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex-col md:flex-row flex justify-between mt-10 sm:mt-16 font-Work_Sans w-11/12 gap-5 items-center">
        {/*INFO*/}
        <div className="mt-8 md:w-[55%] mb-10">
          <p className="text-[#28679D] text-4xl sm:text-6xl font-bold">
            Discover Graphical Password Authentication
          </p>

          <p className="text-gray-500 text-2xl sm:text-3xl mt-3 md:mt-6">
            A Novel Approach for Enhanced Security and User Experience in
            Graphical Password Authentication.
          </p>

          <button
            onClick={handleKnowMore}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="transition duration-500 ease-in-out bg-[#2691CF] rounded-lg px-4 py-1 mt-6 sm:text-xl border-[#2691CF] border-2 hover:bg-transparent"
          >
            <span className="transition duration-1000 ease-in-out text-slate-700 mr-3 flex justify-center items-center gap-2">
              {isHovered ? <FaUnlock /> : <FaLock />}
              Know More
            </span>
          </button>
        </div>
        {/*IMAGE*/}
        <div className="flex justify-center sm:w-[100%] lg:w-[45%]">
          <img alt="Secured" className="w-full" src={Secured} />
        </div>
      </div>

      <div id="home--2" className="sm:mt-16 font-Work_Sans w-11/12">
        <div>
          <p className="text-slate-800 text-3xl sm:text-5xl font-bold">
            Resistance to Attacks
          </p>
          <p className="text-slate-500 text-xl sm:text-2xl mt-3 mb-8">
            Our System Provides Robust Security Against Common Threats.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 justify-between content-between">
            <AttackBlock
              icon={<img src={ReEnter} alt="icon" />}
              title="Bruteforce"
              desc="After reaching the maximum number of attempts, the user will be notified via email and SMS. Further authentication attempts through the standard URL/website will be disabled for that user account. Instead, the user must use a unique link sent by our system. This also informs the legitimate user about the potential threat."
            />
            <AttackBlock
              icon={<img src={showPassword} alt="icon" />}
              title="Shoulder Surfing"
              desc="Shoulder surfing involves observing someone's private information by looking over their shoulder. Our system uses a method similar to the phone pattern lock system to mitigate this risk, ensuring that visual observers cannot easily discern the graphical password."
            />
            <AttackBlock
              icon={<img src={spyWare} alt="icon" />}
              title="Spyware"
              desc="Graphical password systems are more resistant to spyware than traditional text-based passwords. Keyloggers can capture keystrokes but cannot effectively track mouse movements to determine the graphical password."
            />
            <AttackBlock
              icon={<img src={Pin} alt="icon" />}
              title="Phishing"
              desc="Phishing involves tricking users into providing their private information through fake websites. With graphical passwords, it is challenging for attackers to create convincing fake pages because they do not know the specific images used by the user."
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row my-16 md:mx-5 gap-16">
          <div className="w-full md:w-1/2">
            <h3 className="text-5xl font-bold">
              Protecting Against Cyber Threats
            </h3>
            <p className="mt-8 text-xl text-gray-700">
              Our project ensures security through hashed passwords, account
              lockouts against brute force attacks, and input validation to
              prevent SQL injection and XSS attacks. We also implement CSRF
              tokens and secure session management. Additionally, the project
              secures Cloudinary access to prevent unauthorized image access.
              These measures collectively fortify the system against common web
              security threats.
            </p>
          </div>
          <Atom />
        </div>
      </div>
      <Digest />
    </div>
  );
};

export default Home;
