import Product from "./Product";

const Specials = ({ category }) => {
  return (
    <div
      className="w-full flex justify-center items-center sm:pt-20 pt-4"
      style={{
        backgroundImage: category.special
          ? `url(
          "/arabic-images/a1.png"
        )`
          : "",
        backgroundColor: category.special ? "white" : "",
      }}
    >
      <div
        className="lg:w-1/2 w-[90%] mx-auto max-h-max bg-transparent border-gray-500 
          sm:my-20 my-4 flex flex-col items-center gap-6 py-10"
        style={{ borderWidth: category.special ? "1px" : "" }}
      >
        {!category.special && <div className="w-[32px] h-1 bg-black"></div>}
        <p className="text-lg lg:text-5xl font-bold text-center">
          {category.special ? "Today's Specials" : category.name}
        </p>
        {category.special && <img src="/ourmenu/border.png" alt="Border" />}
        <p className="text-gray-600 text-center sm:w-1/2 w-full mx-auto">
          {category.special
            ? "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed doeiusmod tempor incididunt ut labore et dolore."
            : category.description}
        </p>
        <div className="flex justify-center items-center gap-10 flex-wrap">
          {category.products?.map((product, index) => (
            <Product key={index} item={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Specials;
