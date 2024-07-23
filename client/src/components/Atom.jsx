import Attack1 from "../assets/attack1.png";
import Attack2 from "../assets/attack2.png";
import Attack3 from "../assets/attack3.png";
import Attack4 from "../assets/attack4.png";
import Attack5 from "../assets/attack5.png";
import Attack6 from "../assets/attack6.png";
import Secure from "../assets/secured-browser.png";
import "./Atom.css";

const Atom = () => {
  const logos = {
    react:
      "https://camo.githubusercontent.com/aed5f69c00ea3fd8c8bc70b89d236efae340eb3024526fd11bcba51c80c4aa40/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f72656163742f72656163742d6f726967696e616c2e737667",
    mongodb:
      "https://camo.githubusercontent.com/20039163b76f7278f3f309c82d7a6f7ab56d560ed0b8f5623805c8399a0ed098/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f6d6f6e676f64622f6d6f6e676f64622d6f726967696e616c2e737667",
    flask: "https://www.vectorlogo.zone/logos/pocoo_flask/pocoo_flask-icon.svg",
    torch: "https://www.vectorlogo.zone/logos/pytorch/pytorch-icon.svg",
  };
// 5.714285714285714 - 3.75
  return (
    <div className="w-full md:w-1/2">
      {/* Desktop View */}
      <div className="hidden rounded-full h-[400px] w-[400px] border-2 border-blue-100 sm:flex justify-center items-center outer-spin-animation relative mx-auto">
        <img
          src={Attack1}
          alt="brute_force_attack"
          width="80px"
          className="absolute left-40 -top-10 logo"
        />
        <img
          src={Attack2}
          alt="password-sniffing"
          width="50px"
          className="absolute right-1 top-16 logo"
        />
        <img
          src={Attack3}
          alt="sql-injection"
          width="60px"
          className="absolute left-1 top-16 logo"
        />
        <img
          src={Attack4}
          alt="session-hacking"
          width="60px"
          className="absolute left-40 -bottom-6 logo"
        />
        <img
          src={Attack5}
          alt="xss"
          width="75px"
          className="absolute -left-2 bottom-16 logo"
        />
        <img
          src={Attack6}
          alt="meta-logo"
          width="60px"
          className="absolute right-1 bottom-16 logo"
        />
        <div className="bg-blue-100 w-[300px] h-[300px] rounded-full flex justify-center items-center">
          <div className="bg-white w-[150px] h-[150px] rounded-full relative inner-spin-animation">
            <img
              src={logos.flask}
              width="40px"
              alt="flask-logo"
              className="absolute top-0 left-0 inner-logo"
            />
            <img
              src={logos.mongodb}
              width="40px"
              alt="mongodb-logo"
              className="absolute top-0 right-0 inner-logo"
            />
            <img
              src={logos.react}
              width="40px"
              alt="react-logo"
              className="absolute left-0 bottom-0 inner-logo"
            />
            <img
              src={logos.torch}
              width="40px"
              alt="flask-logo"
              className="absolute bottom-0 right-0 inner-logo"
            />
          </div>
        </div>
        <img
          src={Secure}
          height={60}
          width={60}
          className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2"
          alt="secured-browser"
        />
      </div>

      {/* Mobile View */}
      <div className="flex rounded-full h-[300px] w-[300px] border-2 border-blue-100 sm:hidden justify-center items-center outer-spin-animation relative mx-auto">
        <img
          src={Attack1}
          alt="brute_force_attack"
          width="65px"
          className="absolute left-32 -top-8 logo"
        />
        <img
          src={Attack2}
          alt="password-sniffing"
          width="45px"
          className="absolute -right-2 top-16 logo"
        />
        <img
          src={Attack3}
          alt="sql-injection"
          width="50px"
          className="absolute -left-2 top-16 logo"
        />
        <img
          src={Attack4}
          alt="session-hacking"
          width="50px"
          className="absolute left-32 -bottom-5 logo"
        />
        <img
          src={Attack5}
          alt="xss"
          width="70px"
          className="absolute -left-5 bottom-12 logo"
        />
        <img
          src={Attack6}
          alt="meta-logo"
          width="50px"
          className="absolute right-0 bottom-12 logo"
        />
        <div className="bg-blue-100 w-[200px] h-[200px] rounded-full flex justify-center items-center">
          <div className="bg-white w-[100px] h-[100px] rounded-full relative inner-spin-animation">
            <img
              src={logos.flask}
              width="30px"
              alt="flask-logo"
              className="absolute top-0 left-0 inner-logo"
            />
            <img
              src={logos.mongodb}
              width="30px"
              alt="mongodb-logo"
              className="absolute top-0 right-0 inner-logo"
            />
            <img
              src={logos.react}
              width="30px"
              alt="react-logo"
              className="absolute left-0 bottom-0 inner-logo"
            />
            <img
              src={logos.torch}
              width="30px"
              alt="flask-logo"
              className="absolute bottom-0 right-0 inner-logo"
            />
          </div>
        </div>
        <img
          src={Secure}
          height={45}
          width={45}
          className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2"
          alt="secured-browser"
        />
      </div>
    </div>
  );
};

export default Atom;
