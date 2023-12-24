import React from "react";

const AboutUs = ({ info }) => {
  return (
    <>
      <div
        className="flex justify-center items-center gap-10 max-w-7xl 
        mx-auto mt-20 flex-wrap lg:flex-nowrap"
      >
        <div className="relative w-[400px] h-[650px]">
          <img
            className="md:w-[400px] w-full h-[650px] max-w-none"
            src={info[0]?.aboutUsImage1}
            alt=""
          />

          <img
            className="absolute hidden md:block -bottom-[100px] w-[600px] max-w-none -left-[80px] rotate-180"
            src="/arabic-images/a22.png"
            alt=""
          />
          <img
            className="absolute w-[140px] hidden md:block -bottom-[80px] max-w-none -right-[20px]"
            src="/arabic-images/A4.png"
            alt=""
          />
          <img
            className="absolute w-[120px] hidden md:block -bottom-[60px] max-w-none -right-[40px]"
            src="/arabic-images/A5.png"
            alt=""
          />
          <img
            className="absolute w-[160px] hidden md:block -bottom-[100px] max-w-none right-[40px]"
            src="/arabic-images/A3.png"
            alt=""
          />
        </div>

        <div className="flex flex-col justify-center items-center gap-5 md:mx-auto mx-4">
          <img src="/about/aboutus.png" alt="" />
          <p className="text-center">{info[0]?.aboutUsHeader}</p>
          <p className="text-center text-gray-400">
            {info[0]?.aboutUsDescription}
          </p>
        </div>

        <div className="relative w-[400px] h-[650px]">
          <img
            className="md:w-[400px] w-full h-[650px] max-w-none"
            src={info[0]?.aboutUsImage2}
            alt=""
          />

          <img
            className="absolute hidden md:block -bottom-[120px] w-[600px] max-w-none -left-[100px]"
            src="/arabic-images/a22.png"
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default AboutUs;
