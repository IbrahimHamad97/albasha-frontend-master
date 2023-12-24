import { useEffect, useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
const OptionsDialog = ({ item, close, add, edit }) => {
  const [added, setAdded] = useState([]);
  const [addedIds, setAddedIds] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (edit) {
      setQuantity(item.quantity);
      let opts = [];
      let optsIds = [];
      item.addedOptions?.forEach((i) => {
        opts.push(i);
        optsIds.push(i.id);
      });
      setAdded(opts);
      setAddedIds(optsIds);
    }
  }, [edit]);

  const addItem = (opt) => {
    if (addedIds.includes(opt.id)) {
      const filteredIds = addedIds.filter((id) => id !== opt.id);
      setAddedIds(filteredIds);
      setAdded(added.filter((item) => item.id !== opt.id));
    } else {
      setAddedIds([...addedIds, opt.id]);
      setAdded([...added, opt]);
    }
  };

  const changeQuantity = (type) => {
    if (type === 1) {
      if (quantity > 1) {
        const c = quantity - 1;
        setQuantity(c);
      } else setQuantity(1);
    } else {
      const c = quantity + 1;
      setQuantity(c);
    }
  };

  const submit = () => {
    item.quantity = quantity;
    add(added, item);
    close();
  };
  return (
    <div className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center z-[1000]">
      <div
        className="h-full w-full bg-black opacity-25 -z-10 fixed top-0 left-0 cursor-pointer"
        onClick={() => close()}
      ></div>
      <motion.div
        className="rounded-2xl bg-white p-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
      >
        <div className="mb-2">
          <AiOutlineClose
            size={20}
            fontWeight={900}
            fontSize={20}
            className="ml-auto cursor-pointer"
            onClick={() => close()}
          />
        </div>
        <img
          src={item.image}
          className="w-[600px] h-[300px] object-cover rounded-lg mb-2"
        />
        <h1 className="text-2xl font-bold">{item.name}</h1>
        <h1 className="text-lg text-neutral-600 mb-1">{item.description}</h1>
        <div className="max-h-[40vh] overflow-y-auto no-scrollbar">
          {item.options.map((option, i) => {
            return (
              <div key={i}>
                <p className="text-neutral-400 text-md mb-2">
                  Select up to {option.min} options
                </p>
                {option.options.map((opt, index) => {
                  return (
                    <div
                      key={index}
                      className="border border-neutral-400 p-2 flex items-center 
                      gap-3 cursor-pointer mb-3 rounded-md hover:bg-neutral-100 gen-anim"
                      onClick={() => addItem(opt)}
                      style={{
                        backgroundColor: addedIds.includes(opt.id)
                          ? "#5cb85c"
                          : "",
                      }}
                    >
                      <AiOutlineCheck
                        color="white"
                        fontWeight={900}
                        fontSize={20}
                        size={24}
                      />
                      <p
                        className="font-bold"
                        style={{
                          color: addedIds.includes(opt.id) ? "white" : "",
                        }}
                      >
                        {opt.name}
                      </p>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className="flex justify-between">
          {/* <button
            onClick={() => close()}
            className="border-2 border-black px-5 py-2 rounded-lg w-[48%] font-bold"
          >
            Cancel
          </button> */}
          <div className="space-x-2 flex items-center">
            <button
              className="w-[24px] h-[24px] items-center flex justify-center"
              onClick={() => changeQuantity(1, item)}
            >
              -
            </button>
            <p>{quantity}</p>
            <button
              className="w-[24px] h-[24px] flex items-center justify-center"
              onClick={() => changeQuantity(2, item)}
            >
              +
            </button>
          </div>
          <button
            onClick={() => submit()}
            className="border-2 border-black px-5 py-2 rounded-lg w-[48%] font-bold 
            text-white bg-black"
          >
            Add To Cart
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default OptionsDialog;
