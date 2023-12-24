import { useEffect, useState } from "react";
import SharedFormInput from "../sharedFormInput";
import { toast } from "react-toastify";
import { addCategoryHTTP, removeHTTP } from "../../api/admin.controller";
import OptionsSelector from "./options";
import { FaTrash } from "react-icons/fa";

const AddCategory = ({ categories, products, click }) => {
  const defaultValue = {
    id: -1,
    name: "",
    description: "",
    special: false,
    products: [],
  };
  const [category, setCategory] = useState(defaultValue);
  const [cats, setCats] = useState(categories);
  const [isOpen, setIsOpen] = useState(false);

  const handleUpload = async () => {
    if (category.description && category.name && category.products.length > 0) {
      let type = "create";
      if (category.id !== -1) type = "edit";
      const data = await addCategoryHTTP(category, type);
      if (data?.success) click();
      if (type === "create") setCategory(defaultValue);
    } else {
      toast.error("You need to all fields filled", {
        theme: "dark",
      });
    }
  };

  useEffect(() => {
    setCats(categories);
  }, [categories]);

  const set = (e) => {
    setCategory(JSON.parse(e));
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const addProducts = (prods) => {
    setCategory({ ...category, products: prods });
  };

  const remove = async () => {
    const res = await removeHTTP(category.id, "category");
    if (res) {
      setCats(cats.filter((a) => a.id !== category.id));
      setCategory(defaultValue);
    }
  };

  return (
    <div className="flex flex-col space-y-3">
      <h1 className="text-2xl text-center font-bold">Upload Category</h1>
      <div className="w-full">
        <p className="mb-1">Create / Update Category</p>
        <select
          className="w-full px-2 py-3"
          onChange={(e) => set(e.target.value)}
          value={
            category.id !== -1
              ? JSON.stringify(category)
              : JSON.stringify(defaultValue)
          }
        >
          <option value={JSON.stringify(defaultValue)}>Create New</option>
          {cats?.map((c, index) => {
            return (
              <option key={index} value={JSON.stringify(c)}>
                {c.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="w-full">
        <p className="mb-1">Category Name</p>
        <SharedFormInput
          type="text"
          placeholder="Chicken Burger"
          val={category.name}
          change={(e) => setCategory({ ...category, name: e.target.value })}
          width="100%"
        />
      </div>
      <div className="w-full">
        <p className="mb-1">Description</p>
        <textarea
          className="w-full px-4 py-3 border-gray-600 border gen-anim"
          placeholder="Add Products Details here"
          rows={5}
          value={category.description}
          onChange={(e) =>
            setCategory({ ...category, description: e.target.value })
          }
        />
      </div>
      {/* <div className="w-full flex gap-2 items-center justify-center">
        <p className="font-bold">Special Category?</p>
        <input
          type="checkbox"
          className="w-4 h-4"
          value={category.special}
          onChange={(e) => {
            setCategory({
              ...category,
              special: e.target.checked,
            });
          }}
        />
      </div> */}
      <div className="flex items-center gap-3">
        <button
          className="border border-neutral-300 rounded-lg py-1 px-3"
          onClick={() => openModal()}
        >
          View Options
        </button>
        <p>
          {category.products?.length > 0
            ? category.products?.length + " products selected"
            : "No products selected"}
        </p>
      </div>
      {isOpen && (
        <OptionsSelector
          options={products}
          chosenOptions={category.products}
          title="Products"
          onclick={addProducts}
          close={closeModal}
        />
      )}
      <div className="flex gap-3 py-3 mt-auto">
        {category.id !== -1 && (
          <button
            className="border-[3px] bg-red-600 border-red-600 rounded-xl font-medium 
              gen-anim py-3 px-4"
            onClick={remove}
          >
            <FaTrash color="white" />
          </button>
        )}
        <button
          className="border-[3px] bg-white border-black rounded-xl w-full font-medium
            gen-anim hover:bg-black hover:text-white p-3"
          onClick={handleUpload}
        >
          {category.id === -1 ? "Create" : "Update"}
        </button>
      </div>
    </div>
  );
};

export default AddCategory;
