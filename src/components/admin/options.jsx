import { useEffect, useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { motion } from "framer-motion";

const OptionsSelector = ({ options, chosenOptions, title, onclick, close }) => {
  const [selected, setSelected] = useState([]);
  const add = (opt) => {
    const found = selected.find((a) => a._id === opt._id);
    if (found) {
      const filtered = selected.filter((a) => a._id !== opt._id);
      setSelected(filtered);
    } else {
      setSelected([...selected, opt]);
    }
  };

  const submit = () => {
    onclick(selected);
    close();
  };

  useEffect(() => {
    if (chosenOptions?.length > 0) setSelected(chosenOptions);
    else setSelected([]);
  }, [chosenOptions]);

  return (
    <div className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center">
      <div
        className="h-full w-full bg-black opacity-25 -z-10 fixed top-0 left-0 cursor-pointer"
        onClick={() => close()}
      ></div>
      <motion.div
        className="rounded-2xl bg-white px-6 pt-4 py-6 w-[90vw] md:w-[700px]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
      >
        <div>
          <h1 className="mb-3 mt-0 font-bold text-xl">Available {title}</h1>
          <div className="w-full max-h-[500px] overflow-y-auto flex gap-3 flex-wrap mb-4">
            {options.map((opt, index) => {
              return (
                <div
                  className="py-1 px-4 rounded-lg cursor-pointer border border-neutral-400 
                font-bold flex gap-1 items-center"
                  key={index}
                  onClick={() => add(opt)}
                  style={{
                    backgroundColor: selected.find((a) => a._id === opt._id)
                      ? "black"
                      : "",
                    color: selected.find((a) => a._id === opt._id)
                      ? "white"
                      : "",
                  }}
                >
                  {selected.find((a) => a._id === opt._id) && (
                    <AiOutlineCheck />
                  )}
                  {opt.name + (opt.price ? " - " + opt.price + "$" : "")}
                </div>
              );
            })}
          </div>
          <div className="flex justify-end gap-3">
            <button
              className="border bg-white border-black rounded-xl py-2 px-4 font-medium"
              onClick={() => close()}
            >
              Cancel
            </button>
            <button
              className="border bg-black border-black text-white rounded-xl 
              py-2 px-4 font-medium"
              onClick={() => submit()}
            >
              Confirm Additions
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OptionsSelector;
