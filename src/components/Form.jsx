import { useState } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SharedFormInput from "./sharedFormInput";
const Form = ({ info }) => {
  const initData = {
    fullname: "",
    phone: "",
    email: "",
    message: "",
  };
  const [data, setData] = useState(initData);

  const contacts = [info[0]?.location, info[0]?.phoneNumber, info[0]?.email];

  const submitForm = () => {
    if (!data.fullname || !data.email || !data.phone) {
      toast.error("Please fill all needed fields", {
        theme: "dark",
      });
      return;
    }
    setData(initData);
    toast.success("Your request was sent!", {
      theme: "dark",
    });
  };
  return (
    <div className="max-h-max flex flex-col items-center">
      <motion.div className="md:flex hidden w-full h-[400px] mb-32">
        <div className="h-full flex-1">
          <img
            src="/new-images/IMG_8462.jpg"
            alt=""
            className="h-1/2 w-full object-cover hover:scale-110 gen-anim"
          />
          <img
            src="/new-images/IMG_5837.JPG"
            alt=""
            className="h-1/2 w-full object-cover hover:scale-110 transition-all duration-200"
          />
        </div>
        <img
          src="/new-images/IMG_8435.jpg"
          alt=""
          className="h-full flex-1 hover:scale-110 transition-all duration-200"
        />
        <div className="h-full flex-1">
          <img
            src="/new-images/IMG_5858.JPG"
            alt=""
            className="h-1/2 w-full object-cover hover:scale-110 transition-all duration-200"
          />
          <img
            src="/new-images/IMG_8459.jpg"
            alt=""
            className="h-1/2 w-full object-cover hover:scale-110 transition-all duration-200"
          />
        </div>
        <div className="h-full flex-1">
          <img
            src="/new-images/IMG_5870.JPG"
            alt=""
            className="h-1/2 w-full object-cover hover:scale-110 transition-all duration-200"
          />
          <img
            src="/new-images/IMG_5836.JPG"
            alt=""
            className="h-1/2 w-full object-cover hover:scale-110 transition-all duration-200"
          />
        </div>
        <div className="h-full flex-1">
          <img
            src="/new-images/IMG_5836.JPG"
            alt=""
            className="h-1/2 w-full object-cover hover:scale-110 transition-all duration-200"
          />
          <img
            src="/new-images/IMG_5883.JPG"
            alt=""
            className="h-1/2 w-full object-cover hover:scale-110 transition-all duration-200"
          />
        </div>
        <img
          src="/new-images/IMG_8434.jpg"
          alt=""
          className="h-full flex-1 hover:scale-110 transition-all duration-200"
        />
      </motion.div>

      <motion.div
        className="md:w-[50%] xl:w-[40%] w-[90%] mx-auto flex flex-col items-center gap-6 relative"
        initial={{ opacity: 0.1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* <img
          src="/new-images/IMG_8467.jpg"
          className="md:block hidden w-[400px] h-[400px] absolute top-0 right-[-500px] 
            rounded-full hover:scale-110 gen-anim"
          alt=""
        /> */}

        <div className="space-y-4">
          <p className="text-3xl text-orange-400 text-center font-extrabold">
            You're always welcome!
          </p>
          <h1 className="md:text-6xl text-4xl text-gray-600 text-center font-bold">
            OUR CONTACTS
          </h1>
          <p className="text-center">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore. asdhinsaid assadjsa
            hdajsd ashdsadgsa daskd asdjasdh asd asd ghasjd gashd sa
          </p>
        </div>

        <div className="space-y-2 mt-8 mb-2">
          <p>
            <span className="font-bold">Address: </span> {contacts[0]}
          </p>
          <p>
            <span className="font-bold">Phone: </span> {contacts[1]}
          </p>
          <p>
            <span className="font-bold">Email: </span> {contacts[2]}
          </p>
        </div>

        <div className="my-4 space-y-4 w-full">
          <SharedFormInput
            width="100%"
            placeholder="Full Name"
            val={data.fullname}
            change={(e) => setData({ ...data, fullname: e.target.value })}
          />
          <div className="flex justify-between">
            <SharedFormInput
              width="48%"
              placeholder="Email"
              val={data.email}
              change={(e) => setData({ ...data, email: e.target.value })}
            />
            <SharedFormInput
              width="48%"
              placeholder="Telephone"
              val={data.phone}
              change={(e) => setData({ ...data, phone: e.target.value })}
              type="number"
            />
          </div>
          <textarea
            className="px-4 py-3 w-full border-gray-600 border gen-anim"
            rows={8}
            placeholder="Message"
            value={data.message}
            onChange={(e) => setData({ ...data, message: e.target.value })}
          />
        </div>
        <button
          onClick={submitForm}
          className="mx-auto border-[3px] border-black rounded-3xl py-3 w-[160px] font-medium
            gen-anim hover:bg-black hover:text-white"
        >
          SUBMIT
        </button>
      </motion.div>

      <div className="h-[500px] lg:w-2/3 w-[96%] md:mx-auto mx-4 my-20 relative">
        {/* <img
          className="md:block hidden w-[400px] h-[400px]
          absolute top-[-300px] left-[-300px] rounded-full -z-10 hover:scale-110 gen-anim"
          src="/new-images/IMG_5872.JPG"
          alt=""
        /> */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29061.70562329957!2d28.945410218760475!3d41.004688236867516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab9b8afa5f833%3A0x15aa1943c3015300!2sTopkapi%20Palace%20Museum!5e0!3m2!1sen!2sqa!4v1689692503323!5m2!1sen!2sqa&iwloc=near&zoom=disable"
          allowFullScreen=""
          loading="lazy"
          title="map"
          width="100%"
          height="100%"
        ></iframe>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Form;
