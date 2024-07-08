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
            A Novel Approach For Security And User Experience Of Graphical
            Password Authentication.
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
            Resistance To Attacks
          </p>
          <p className="text-slate-500 text-xl sm:text-2xl mt-3 mb-8">
            Our System Provides Security Against Popular Attacks.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 justify-between content-between">
            <AttackBlock
              icon={<img src={ReEnter} alt="icon" />}
              title="Bruteforce"
              desc="After reaching max tries, the user will be notified via message through email. And the further authentication through the generic URL/website is disabled for that user account, instead, they have to use the link that will be sent by the company in the notification email. This also lets the legitimate user know about the adversary."
            />
            <AttackBlock
              icon={<img src={showPassword} alt="icon" />}
              title="Shoulder Surfing"
              desc="Shoulder surfing is a type of social engineering technique used to obtain information such as personal identification numbers (PINs), passwords and other confidential data by looking over the victim's shoulder. The system we adopt is similar to the Phone pattern system."
            />
            <AttackBlock
              icon={<img src={spyWare} alt="icon" />}
              title="Spyware"
              desc="Graphical password systems resist spyware more easily than regular passwords. Key-loggers secretly capture keystrokes and transfer, but if the spyware wants to track the mouse movements, it can be tracked, but the adversary wouldn’t know which part of the mouse event is actually the graphical password."
            />
            <AttackBlock
              icon={<img src={Pin} alt="icon" />}
              title="Phishing"
              desc="Since the adversary is made to believe that the password is a set of images, it’s not possible to make a fake page, since the adversary thinks he doesn’t know the images."
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row my-16 md:mx-5 gap-16">
          <div className="w-full md:w-1/2">
            <h3 className="text-5xl font-bold">
              Protecting Against Cyber Threats
            </h3>
            <p className="mt-8 text-xl text-gray-700">
              This project ensures security through hashed passwords, account
              lockouts against brute force attacks, input validation for SQL
              injection and XSS prevention, CSRF tokens, and secure session
              management. Additionally, it secures Cloudinary access, thwarting
              unauthorized image access. These measures collectively fortify the
              system against prevalent web security threats.
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
