import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { cartItems } from "../utils/atoms";
import OptionsDialog from "./menu/OptionsDialog";

const Product = ({ item }) => {
  const [cart, setCart] = useAtom(cartItems);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    if (cart?.length > 0) {
      let found = null;
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].index === item.index) {
          item.quantity = cart[i].quantity;
          found = item;
          break;
        }
      }
      if (!found) item.quantity = 0;
      setUpdate(!update);
    } else {
      item.quantity = 0;
      setUpdate(!update);
    }
  }, [cart]);

  const findItem = () => {
    const updatedCart = cart?.map((cartItem) => {
      if (cartItem.index === item.index) {
        return { ...cartItem, quantity: item.quantity };
      }
      return cartItem;
    });
    setCart(updatedCart);
    localStorage.setItem("carte", JSON.stringify(updatedCart));
  };

  const changeQuantity = (type) => {
    if (type === 1) {
      if (item.quantity > 0) {
        item.quantity--;
        if (item.quantity > 0) findItem();
        else {
          item.quantity = 0;
          const items = cart.filter((x) => x.index !== item.index);
          setCart(items);
          localStorage.setItem("carte", JSON.stringify(items));
        }
      }
    } else {
      if (item.quantity === 0) {
        item.quantity++;
        item.index = cart.length;
        localStorage.setItem("carte", JSON.stringify([...cart, item]));
        setCart((prev) => [...prev, item]);
      } else {
        item.quantity++;
        findItem();
      }
    }
    setUpdate(!update);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [newItem, setNewItem] = useState();
  const openModal = () => {
    if (item.groups?.length > 0) {
      setNewItem({ ...item, quantity: 0 });
      setIsOpen(true);
    }
  };

  const closeModal = () => {
    setNewItem(null);
    setIsOpen(false);
  };

  const add = (addons, meal) => {
    meal.addedOptions = addons;
    meal.index = cart.length;
    localStorage.setItem("carte", JSON.stringify([...cart, meal]));
    setCart((prev) => [...prev, meal]);
  };

  const checkIfModal = (meal) => {
    if (meal.groups?.length > 0) openModal();
    else changeQuantity(2, meal);
  };

  return (
    <div className="flex items-center gap-5 lg:px-0 px-4 mt-10 lg:w-[400px] w-full">
      {/* <div className="lg:w-36 lg:h-20 w-32 h-16 bg-gray-600 rounded-full" /> */}
      <img
        className="lg:w-[112px] lg:h-[112px] w-[96px] h-[96px] bg-gray-600 rounded-full object-cover"
        src={item.image}
        alt=""
      />
      <div className="flex flex-col w-[240px]">
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold cursor-pointer">{item.name}</p>
          {isOpen && (
            <OptionsDialog item={newItem} close={closeModal} add={add} />
          )}
          <p className="text-orange-300 font-semibold">${item.price}</p>
        </div>
        <p className="text-neutral-400">{item.description}</p>
        {item.groups?.length > 0 && (
          <button
            className="border border-neutral-300 rounded-lg w-fit py-1 px-3 ml-auto"
            onClick={() => openModal()}
          >
            Add to cart
          </button>
        )}
        {item.groups?.length === 0 && (
          <div className="space-x-2 flex items-center">
            <button
              className="w-[24px] h-[24px] items-center flex justify-center"
              onClick={() => changeQuantity(1, item)}
            >
              -
            </button>
            <p>{item.quantity}</p>
            <button
              className="w-[24px] h-[24px] flex items-center justify-center"
              onClick={() => checkIfModal(item)}
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
