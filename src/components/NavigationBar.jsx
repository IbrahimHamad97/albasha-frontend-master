import React from "react";
import { colors } from "./colors";
import { FiPhoneIncoming } from "react-icons/fi";
import { SlLocationPin } from "react-icons/sl";
import { LuMail } from "react-icons/lu";
import { ContactDetails } from "./ContactDetails";

const NavigationBar = ({ info }) => {
  return (
    <div className="relative h-screen">
      <div className="relative flex justify-between mx-5">
        {/* <img
          className="w-[100px] h-[100px] lg:w-[250px] lg:h-[250px]"
          src="/logo-0١.png"
          alt="Logo"
        /> */}
        {/* <p className='text-white text-5xl'>LOGO</p> */}
        {/* <div className="flex gap-5 mt-5">
          <Cart />

          <div className="flex gap-1">
            <p className={`text-white`}>Total: </p>
            <p className={`text-[#0e8042] font-semibold`}>$10.90</p>
          </div>
        </div> */}
      </div>

      <img
        className="absolute top-0 -z-10 h-screen w-screen object-cover"
        src="/hero/bg.jpg"
        alt="Food and vegetables"
      />

      <p
        className={`absolute top-[25%] md:top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold lg:text-3xl p-2 bg-white text-[${colors.primary}]`}
      >
        Perfectly balanced
      </p>
      <p
        className={`absolute top-[30%] md:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold lg:text-6xl p-2 mt-3 text-white`}
      >
        Quality & Taste
      </p>

      <div className="flex flex-col md:flex-row justify-center gap-10 lg:gap-20 2xl:gap-60 absolute left-1/2 -translate-x-1/2 bottom-10 w-full">
        <ContactDetails
          Icon={FiPhoneIncoming}
          title="Call Us"
          detail={info[0]?.phoneNumber}
        />

        <ContactDetails
          Icon={SlLocationPin}
          title="Find Us"
          detail={info[0]?.location}
        />

        <ContactDetails Icon={LuMail} title="Mail Us" detail={info[0]?.email} />
      </div>
    </div>
  );
};

export default NavigationBar;
