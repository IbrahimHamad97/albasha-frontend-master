import { Link, useLocation } from "react-router-dom";
import Cart from "./Cart";
const Header = () => {
  const location = useLocation();
  const pages = [
    {
      name: "Home",
      value: "home",
      route: "/",
    },
    {
      name: "Menu",
      value: "menu",
      route: "/menu",
    },
  ];
  return (
    <nav className="border-b border-neutral-400">
      <div className="w-[96%] flex justify-between items-center mx-auto h-full">
        <img
          className="md:w-[160px] md:h-[160px] w-[100px] h-[90px]"
          src="/logo-0١.png"
          alt="Logo"
        />
        <ul className="flex item-center md:h-[160px] h-[90px]">
          {pages.map((page, index) => (
            <Link
              style={{
                backgroundColor:
                  location.pathname === page.route ? "black" : "",
              }}
              className="md:w-[100px] w-auto px-4 h-full flex justify-center items-center 
                cursor-pointer gen-anim hover:bg-black hover:text-white"
              to={page.route}
              key={index}
            >
              <li
                style={{
                  color: location.pathname === page.route ? "white" : "",
                }}
              >
                {page.name}
              </li>
            </Link>
          ))}
        </ul>
        <div className="flex items-center justify-center md:w-[160px] md:h-[160px] w-[100px] h-[90px]">
          <Cart />
        </div>
      </div>
    </nav>
  );
};

export default Header;
