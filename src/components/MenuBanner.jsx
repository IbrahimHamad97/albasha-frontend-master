import React from "react";
import { Link } from "react-router-dom";

const MenuBanner = () => {
  return (
    <div className="w-full bg-black flex justify-center items-center mt-20">
      <div className="lg:w-1/2 w-[96%] mx-auto lg:h-[300px] bg-transparent border border-gray-500 my-20 relative flex flex-col items-center justify-center gap-6">
        <p
          className="absolute text-white font-bold md:text-4xl text-2xl 
          md:-top-7 -top-[18px] left-1/2 -translate-x-1/2 uppercase bg-black"
        >
          menu
        </p>

        <p className="text-[#0e8042] md:text-6xl text-4xl font-bold text-center mt-7">
          High Quality meals
        </p>
        <p className="text-gray-600 text-center w-3/4 mx-auto lg:mb-0 mb-12">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore.
        </p>

        <Link to="/menu">
          <button
            className="border-2 border-white rounded-full font-bold 
            uppercase text-white px-8 py-3 hover:border-[#0e8042] hover:text-[#0e8042] 
            absolute -bottom-7 left-1/2 -translate-x-1/2 bg-black gen-anim"
          >
            our menu
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MenuBanner;
