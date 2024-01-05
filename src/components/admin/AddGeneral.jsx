import { useContext, useEffect, useState } from "react";
import SharedFormInput from "../sharedFormInput";
import {
  editInformationHTTP,
  getInfo,
  uploadImageHTTP,
} from "../../api/admin.controller";
import { toast } from "react-toastify";
import { AppContext } from "../../AppContext";

const AddGeneral = ({ info }) => {
  const [information, setInformation] = useState();
  const { setInfor } = useContext(AppContext);

  const handleFileChange = async (event) => {
    try {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = async () => {
        const val = reader.result;
        saveImage(val, file.name, 1);
      };
      reader?.readAsDataURL(file);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFileChange2 = async (event) => {
    try {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = async () => {
        const val = reader.result;
        saveImage(val, file.name, 2);
      };
      reader?.readAsDataURL(file);
    } catch (err) {
      console.log(err);
    }
  };

  const saveImage = async (img, name, type) => {
    const image = {
      file: img,
      name: name,
    };
    const res = await uploadImageHTTP(image);
    if (res) {
      if (type === 1)
        setInformation({ ...information, aboutUsImage1: res?.image });
      else setInformation({ ...information, aboutUsImage2: res?.image });
    }
  };

  const handleUpload = async () => {
    if (
      information.phoneNumber &&
      information.location &&
      information.email &&
      information.aboutUsImage1 &&
      information.aboutUsImage2 &&
      information.aboutUsHeader &&
      information.aboutUsHeader?.length < 180 &&
      information.aboutUsDescription &&
      information.aboutUsDescription?.length < 500 &&
      information.menuDescription &&
      information.menuDescription?.length < 500
    ) {
      const res = await editInformationHTTP(information);
      if (res?.success) setInfor(await getInfo());
    } else {
      toast.error("You need to all fields filled", {
        theme: "dark",
      });
    }
  };

  useEffect(() => {
    if (info[0]) setInformation(info[0]);
  }, [info]);

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl text-center mb-4 font-bold">
        Upload Information
      </h1>
      <div className="space-y-3">
        <div className="w-full">
          <p className="mb-1">Phone Number *</p>
          <SharedFormInput
            type="text"
            placeholder="Chicken Burger"
            val={information?.phoneNumber}
            change={(e) =>
              setInformation({ ...information, phoneNumber: e.target.value })
            }
            width="100%"
          />
        </div>
        <div className="w-full">
          <p className="mb-1">Location *</p>
          <SharedFormInput
            type="text"
            placeholder="Chicken Burger"
            val={information?.location}
            change={(e) =>
              setInformation({ ...information, location: e.target.value })
            }
            width="100%"
          />
        </div>
        <div className="w-full">
          <p className="mb-1">Email Address *</p>
          <SharedFormInput
            type="text"
            placeholder="Chicken Burger"
            val={information?.email}
            change={(e) =>
              setInformation({ ...information, email: e.target.value })
            }
            width="100%"
          />
        </div>
        <div className="w-full">
          <p className="mb-1">About Us Header</p>
          <textarea
            className="w-full px-4 py-3 border-gray-600 border gen-anim"
            placeholder="Add Products Details here"
            rows={7}
            value={information?.aboutUsHeader}
            onChange={(e) =>
              setInformation({ ...information, aboutUsHeader: e.target.value })
            }
          />
        </div>
        <div className="w-full">
          <p className="mb-1">About Us Description</p>
          <textarea
            className="w-full px-4 py-3 border-gray-600 border gen-anim"
            placeholder="Add Products Details here"
            rows={15}
            value={information?.aboutUsDescription}
            onChange={(e) =>
              setInformation({
                ...information,
                aboutUsDescription: e.target.value,
              })
            }
          />
        </div>
        <div className="w-full">
          <p className="mb-1">Menu Description</p>
          <textarea
            className="w-full px-4 py-3 border-gray-600 border gen-anim"
            placeholder="Add Products Details here"
            rows={15}
            value={information?.menuDescription}
            onChange={(e) =>
              setInformation({
                ...information,
                menuDescription: e.target.value,
              })
            }
          />
        </div>
        <div className="w-full flex items-center justify-center">
          {information?.aboutUsImage1 && (
            <img
              src={information?.aboutUsImage1}
              alt="uploaded"
              className="h-[60px] w-[60px] rounded-lg mr-4"
            />
          )}
          <div
            className="h-[60px] w-[60px] rounded-lg relative border border-neutral-400 
            flex items-center justify-center gen-anim hover:bg-neutral-400 group mr-4"
          >
            <input
              type="file"
              accept="image/*"
              className="opacity-0 absolute top-0 h-full w-full cursor-pointer"
              onChange={handleFileChange}
            />
            +
          </div>
          <p>Upload About us Image 1</p>
        </div>
        <div className="w-full flex items-center justify-center">
          {information?.aboutUsImage2 && (
            <img
              src={information?.aboutUsImage2}
              alt="uploaded"
              className="h-[60px] w-[60px] rounded-lg mr-4"
            />
          )}
          <div
            className="h-[60px] w-[60px] rounded-lg relative border border-neutral-400 
            flex items-center justify-center gen-anim hover:bg-neutral-400 group mr-4"
          >
            <input
              type="file"
              accept="image/*"
              className="opacity-0 absolute top-0 h-full w-full cursor-pointer"
              onChange={handleFileChange2}
            />
            +
          </div>
          <p>Upload About us Image 2</p>
        </div>
        <div className="mt-auto py-3">
          <button
            className="border-[3px] bg-white border-black rounded-xl w-full font-medium
            gen-anim hover:bg-black hover:text-white p-3"
            onClick={handleUpload}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddGeneral;
