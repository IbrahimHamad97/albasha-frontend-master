import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GiShoppingCart } from "react-icons/gi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { cartItems } from "../utils/atoms";
import { useAtom } from "jotai";
import OptionsDialog from "./menu/OptionsDialog";
const Cart = () => {
  const [clicked, setClicked] = useState(false);
  const [cart, setCart] = useAtom(cartItems);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleClicked = () => {
    setClicked(true);
  };

  useEffect(() => {
    const items = localStorage.getItem("cart");
    if (items) {
      const parsed = JSON.parse(items);
      if (parsed) {
        setCart(parsed);
        // parsed?.forEach((item) => {
        //   totalPrice = totalPrice + item.price * item.quantity;
        //   setTotalPrice()
        // });
      }
    }
  }, []);

  const phoneNumber = "+905345713224";
  const handleWhatsAppClick = () => {
    let message = "Order was placed: \n";
    let totalPrice = 0;
    cart.forEach((item) => {
      message = message + item.name + "  Quantity: " + item.quantity + "\n";
    });
    message = message + "Total Price: " + totalPrice;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    localStorage.removeItem("cart");
    window.open(url, "_blank");
  };

  const removeItem = (item) => {
    localStorage.setItem(
      "cart",
      cart.filter((obj) => obj.index !== item.index)
    );
    setCart((current) => current.filter((obj) => obj.index !== item.index));
  };

  const [isOpen, setIsOpen] = useState(false);
  const [newItem, setNewItem] = useState();
  const openModal = (item) => {
    if (item.groups.length > 0) {
      setNewItem(item);
      setIsOpen(true);
    }
  };

  const closeModal = () => {
    setNewItem(null);
    setIsOpen(false);
  };

  const add = (addons, meal) => {
    meal.addedOptions = addons;
    cart[meal.index] = meal;
    localStorage.setItem("cart", JSON.stringify([...cart, meal]));
  };

  return (
    <div className="relative">
      <GiShoppingCart
        className="cursor-pointer text-[30px] md:text-[40px]"
        onClick={handleClicked}
      />
      <div
        className="absolute top-5 -right-1 bg-[#0e8042] rounded-full 
        h-5 w-5 flex justify-center items-center text-white text-xs"
        onClick={handleClicked}
      >
        {cart.length}
      </div>

      <AnimatePresence>
        {clicked && (
          <motion.div
            initial={{ opacity: 0, x: 600 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 600 }}
            transition={{ duration: 0.65 }}
            className="fixed top-0 right-0 bottom-0 h-screen w-[96%] md:w-[400px] z-50"
          >
            <div className="bg-white h-full w-full text-center flex flex-col">
              <div className="flex justify-between items-center p-5">
                <h1 className="text-2xl font-bold">Cart</h1>
                <AiOutlineCloseCircle
                  size={28}
                  onClick={() => setClicked(false)}
                />
              </div>
              <div className="mb-4 overflow-y-auto">
                {cart.length === 0 && (
                  <h1 className="text-xl font-bold">Cart is Empty</h1>
                )}
                {cart.map((item) => (
                  <div
                    key={item.index}
                    className="flex justify-between items-center p-5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={item.image}
                      />
                      <div>
                        <h1 className="text-lg font-bold">
                          {item.quantity}x {item.name}
                        </h1>
                        <div className="flex flex-col">
                          {item.addedOptions?.map((option, index) => {
                            return (
                              <p
                                key={index}
                                className="text-left hide-one-line"
                              >
                                {option.name}
                              </p>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <h1 className="text-base text-orange-300">
                        ${item.price}
                      </h1>
                      <div className="flex items-center gap-1">
                        <BsFillTrashFill
                          className="cursor-pointer"
                          color="red"
                          size={20}
                          onClick={() => removeItem(item)}
                        />
                        <FaEdit
                          className="cursor-pointer"
                          color="rgb(92, 184, 92)"
                          size={22}
                          onClick={() => openModal(item)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* <button
                onClick={handleWhatsAppClick}
                disabled={cart.length == 0}
                className="hover:bg-black border-2 border-black hover:text-white 
                px-5 py-2 rounded-full w-[80%] mx-auto gen-anim font-bold mb-5"
              >
                CHECKOUT
              </button> */}
              {cart.length > 0 && (
                <a href={`tel:+852381263892`}>
                  <button
                    className="hover:bg-black border-2 border-black hover:text-white 
                px-5 py-2 rounded-full w-[80%] mx-auto gen-anim font-bold mb-5"
                  >
                    Call us!
                  </button>
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {isOpen && (
        <OptionsDialog
          item={newItem}
          close={closeModal}
          add={add}
          edit={true}
        />
      )}
    </div>
  );
};

export default Cart;
