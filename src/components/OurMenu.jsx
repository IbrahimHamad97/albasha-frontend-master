import React from "react";
import { dummyMenu, meals } from "../utils/dummyMenu";

const OurMenu = () => {
  const [selectedMenu, setSelectedMenu] = React.useState(1);
  const [filteredMeals, setFilteredMeals] = React.useState([]);

  React.useEffect(() => {
    filterMeals(selectedMenu);
  }, [selectedMenu]);

  const filterMeals = (id) => {
    if (id === 1) {
      setFilteredMeals(meals);
      return;
    }
    const filtered = meals.filter((meal) => meal.category === id);
    setFilteredMeals(filtered);
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-7xl mx-auto mt-10 lg:mt-20 gap-10 mb-20">
      <p className="text-lg lg:text-5xl font-bold">Our Menu</p>
      <img src="/ourmenu/border.png" alt="Border" />

      <p className="text-gray-700 text-center font-semibold w-1/2">
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
        ut aliquip ex ea commodo consequat. Duis aute irure dolor
      </p>

      <div className="flex justify-center items-center gap-10 flex-wrap lg:w-full w-[96%]">
        {dummyMenu.map((menu) => (
          <p
            onClick={() => setSelectedMenu(menu.id)}
            className={`hover:text-[#0e8042] cursor-pointer text-xl hover:border-b hover:border-red-600 h-8 ${
              selectedMenu === menu.id
                ? `text-[#0e8042] border-b border-red-600`
                : `text-gray-600`
            }`}
          >
            {menu.name}
          </p>
        ))}
      </div>

      <div className="flex justify-center items-center gap-10 flex-wrap mt-10">
        {filteredMeals?.map((meal) => (
          <div className="flex flex-col items-center justify-center gap-5 w-72 h-96">
            <img
              src={`/meals/${meal.image}`}
              alt={meal.name}
              className="w-72 h-48 object-cover"
            />
            <p className="text-lg font-semibold">{meal.name}</p>
            <p className="text-gray-600 w-3/4 text-center">
              {meal.description}
            </p>
            <p className="text-orange-300 font-semibold">${meal.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurMenu;
