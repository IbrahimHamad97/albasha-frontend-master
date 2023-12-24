import {
  FaTwitter,
  FaFacebookF,
  FaGooglePlusG,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";
import { AppContext } from "../AppContext";
import { useContext } from "react";
const Footer = () => {
  const { info } = useContext(AppContext);
  const timings = [
    {
      day: "Monday - Friday",
      time: "09:00 - 23:00",
    },
    {
      day: "Saturday",
      time: "11:00 - 01:00",
    },
    {
      day: "Sunday",
      time: "12:00 - 23:00",
    },
  ];

  const phoneNumber = "+852381263892";
  const handleWhatsApp = () => {
    let message = "Hello!";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  const date = new Date();
  const classes =
    "cursor-pointer flex items-center justify-center rounded-full h-[44px] w-[44px] bg-gray-800 group";
  return (
    <div className="py-8" style={{ backgroundColor: "rgba(0,0,0, 0.9)" }}>
      <div
        className="lg:w-[75%] md:flex-row flex-col w-[96%] mx-auto 
        flex justify-between mb-8 lg:space-x-16"
      >
        <div className="flex-1 space-y-4">
          <img
            src="/logo-0١.png"
            alt=""
            className="w-[100px] h-[100px] lg:w-[250px] lg:h-[250px] mb-4 lg:mx-0 mx-auto"
          />
          <p className="text-lg text-neutral-400 text-ellipsis">
            Ut enim ad minim veniam, quis nostrud at exercitation ullamco
            laboris nisi nemo sit enim ipsam voluptatem quia voluptas
          </p>
          <div className="flex items-center space-x-4">
            <a href="#" className={classes}>
              <FaTwitter
                color="white"
                className="group-hover:scale-150 gen-anim"
              />
            </a>
            <a href="#" className={classes}>
              <FaFacebookF
                color="white"
                className="group-hover:scale-150 gen-anim"
              />
            </a>
            <a href="#" className={classes}>
              <FaGooglePlusG
                color="white"
                className="group-hover:scale-150 gen-anim"
              />
            </a>
          </div>
        </div>
        <div className="flex-1 space-y-4 lg:mt-16 mt-8">
          <h1 className="text-xl text-white font-bold">WORK TIME</h1>
          <div className="space-y-2">
            {timings.map((time, index) => (
              <div key={index} className="flex items-center justify-between">
                <p className="text-neutral-400 text-lg">{time.day}</p>
                <p className="text-white text-lg">{time.time}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 space-y-4 lg:mt-16 mt-8">
          <h1 className="text-xl text-white font-bold">JOIN US ON INSTAGRAM</h1>
          <div className="space-y-2">
            <p className="text-neutral-400 text-lg">{info[0]?.location}</p>
            <p className="text-neutral-400 text-lg">{info[0]?.email}</p>
          </div>
        </div>
        <div className="flex-1 space-y-4 mt-4">
          <h1 className="text-xl text-white font-bold">CONTACT US</h1>
          <div className="space-x-2 flex items-center">
            <a href="#" className={classes}>
              <FaInstagram
                color="white"
                className="group-hover:scale-150 gen-anim"
              />
            </a>
            <p className="text-neutral-400">
              Follow us: @<span className="text-green-600">albasha</span>
            </p>
          </div>
          <div className="space-x-2 flex items-center">
            <button href="#" className={classes} onClick={handleWhatsApp}>
              <FaWhatsapp
                color="white"
                className="group-hover:scale-150 gen-anim"
              />
            </button>
            <p className="text-neutral-400">{info[0]?.phoneNumber}</p>
          </div>
        </div>
      </div>
      <p className="text-center text-base text-neutral-400">
        @{date.getFullYear()} all rights reserved. development by
        <span className="text-white"> Veraart</span>
        <span className="text-green-400">Agency</span>
      </p>
    </div>
  );
};

export default Footer;
