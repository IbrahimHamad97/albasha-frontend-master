import Specials from "../Specials";
import { motion } from "framer-motion";
const MenuBody = ({ menu }) => {
  let currentPos = 100;
  const dummies = [
    "/cut-images/5.png",
    "/cut-images/8.png",
    "/cut-images/4.png",
    "/cut-images/3.png",
    "/cut-images/7.png",
  ];
  // const dummies2 = [
  //   "/cut-images/6.png",
  //   "/cut-images/6.png",
  //   "/cut-images/6.png",
  // ];

  return (
    <div className="relative">
      {dummies.slice(0, menu?.length || 0).map((item, index) => {
        return (
          <div key={index}>
            <motion.img
              src={item}
              alt=""
              className="absolute lg:block hidden h-[300px]"
              style={{
                right: index % 2 === 0 ? "auto" : 0,
                left: index % 2 === 0 ? 0 : "auto",
                top: index === 0 ? currentPos : currentPos * (index + 1) * 4,
                translateX: index % 2 === 0 ? "-100px" : "100px",
                rotate: index % 2 === 0 ? "-15deg" : "",
              }}
            />
          </div>
        );
      })}
      {menu?.map((category, index) => {
        return <Specials key={index} category={category} />;
      })}
    </div>
  );
};

export default MenuBody;
