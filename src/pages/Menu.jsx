import { useContext, useEffect } from "react";
import MenuBody from "../components/menu/MenuBody";
import { AppContext } from "../AppContext";

const Menu = () => {
  const { menu, info } = useContext(AppContext);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="relative h-screen">
        <img
          className="absolute top-0 -z-10 h-screen w-screen object-cover"
          src="/hero/bg.jpg"
          alt="Food and vegetables"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <p className="font-bold lg:text-6xl p-2 mt-3 text-white">
            Quality & Taste
          </p>
          <p className="font-bold lg:text-xl p-2 mt-3 text-neutral-400">
            {info[0]?.menuDescription}
          </p>
        </div>
      </div>
      <MenuBody menu={menu} />
    </>
  );
};

export default Menu;
