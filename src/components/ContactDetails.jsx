import React from "react";

export const ContactDetails = ({ Icon, title, detail }) => {
  return (
    <>
      {title.includes(`Call`) ? (
        <a
          href={`tel:+852381263892`}
          className="flex flex-col items-center gap-5 group cursor-pointer"
        >
          <Icon className={`group-hover:text-[#0e8042] text-white`} size={50} />
          <div className="text-center">
            <p className={`text-white group-hover:text-[#0e8042]`}>{title}</p>
            <p className={`text-gray-300 group-hover:text-[#0e8042]`}>
              {detail}
            </p>
          </div>
        </a>
      ) : title.includes(`Find`) ? (
        <a
          href={`https://www.google.com/maps/place/New+York,+Amerika+Birle%C5%9Fik+Devletleri/data=!4m2!3m1!1s0x89c24fa5d33f083b:0xc80b8f06e177fe62?sa=X&ved=2ahUKEwj-7dvruLuAAxXdgP0HHd68C2YQ8gF6BAgPEAA&ved=2ahUKEwj-7dvruLuAAxXdgP0HHd68C2YQ8gF6BAgQEAI`}
          className="flex flex-col items-center gap-5 group cursor-pointer"
        >
          <Icon className={`group-hover:text-[#0e8042] text-white`} size={50} />
          <div className="text-center">
            <p className={`text-white group-hover:text-[#0e8042]`}>{title}</p>
            <p className={`text-gray-300 group-hover:text-[#0e8042]`}>
              {detail}
            </p>
          </div>
        </a>
      ) : (
        <a
          href="mailto:albasha.info@mail.com"
          className="flex flex-col items-center gap-5 group cursor-pointer"
        >
          <Icon className={`group-hover:text-[#0e8042] text-white`} size={50} />
          <div className="text-center">
            <p className={`text-white group-hover:text-[#0e8042]`}>{title}</p>
            <p className={`text-gray-300 group-hover:text-[#0e8042]`}>
              {detail}
            </p>
          </div>
        </a>
      )}
    </>
  );
};
