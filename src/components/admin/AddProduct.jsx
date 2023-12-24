import { useEffect, useState } from "react";
import SharedFormInput from "../sharedFormInput";
import { toast } from "react-toastify";
import {
  addProductHTTP,
  removeHTTP,
  uploadImageHTTP,
} from "../../api/admin.controller";
import OptionsSelector from "./options";
import { FaTrash } from "react-icons/fa";

const AddProduct = ({ products, groups, click }) => {
  const defaultValue = {
    id: -1,
    name: "",
    description: "",
    image: "",
    price: 0,
    groups: [],
  };
  const [product, setProduct] = useState(defaultValue);
  const [pros, setPros] = useState(products);
  const [isOpen, setIsOpen] = useState(false);

  const handleFileChange = async (event) => {
    try {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = async () => {
        const val = reader.result;
        saveImage(val, file.name);
      };
      reader?.readAsDataURL(file);
    } catch (err) {
      console.log(err);
    }
  };

  const saveImage = async (img, name) => {
    const image = {
      file: img,
      name: name,
    };
    const res = await uploadImageHTTP(image);
    if (res) setProduct({ ...product, image: res?.image });
  };

  const handleUpload = async () => {
    if (product.description && product.price >= 0 && product.name) {
      let type = "create";
      if (product.id !== -1) type = "edit";
      const data = await addProductHTTP(product, type);
      if (data?.success) click();
      if (type === "create") setProduct(defaultValue);
    } else {
      toast.error("Need to have all data filled", {
        theme: "dark",
      });
    }
  };

  useEffect(() => {
    setPros(products);
  }, [products]);

  const set = (e) => {
    setProduct(JSON.parse(e));
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const addGroups = (grps) => {
    setProduct({ ...product, groups: grps });
  };

  const remove = async () => {
    const res = await removeHTTP(product.id, "product");
    if (res) {
      setPros(pros.filter((a) => a.id !== product.id));
      setProduct(defaultValue);
    }
  };

  return (
    <div className="flex flex-col space-y-3">
      <h1 className="text-2xl text-center font-bold">Upload Product</h1>
      <div className="w-full">
        <p className="mb-1">Create / Update Product</p>
        <select
          className="w-full px-2 py-3"
          onChange={(e) => set(e.target.value)}
          value={
            product.id !== -1
              ? JSON.stringify(product)
              : JSON.stringify(defaultValue)
          }
        >
          <option value={JSON.stringify(defaultValue)}>Create New</option>
          {pros?.map((product, index) => {
            return (
              <option key={index} value={JSON.stringify(product)}>
                {product.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="flex justify-between">
        <div className="w-full">
          <p className="mb-1">Product Name</p>
          <SharedFormInput
            type="text"
            placeholder="Chicken Burger"
            val={product.name}
            change={(e) => setProduct({ ...product, name: e.target.value })}
          />
        </div>
        &nbsp;&nbsp;&nbsp;
        <div className="w-fit">
          <p className="mb-1">Price</p>
          <SharedFormInput
            type="number"
            width="100%"
            placeholder="30"
            val={product.price}
            change={(e) => setProduct({ ...product, price: e.target.value })}
          />
        </div>
      </div>
      <div className="w-full">
        <p className="mb-1">Description</p>
        <textarea
          className="w-full px-4 py-3 border-gray-600 border gen-anim"
          placeholder="Add Products Details here"
          rows={5}
          value={product.description}
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
        />
      </div>
      <div className="w-full flex items-center justify-center">
        {product.image && (
          <img
            src={product.image}
            alt="uploaded"
            className="h-[60px] w-[60px] rounded-lg mr-4"
          />
        )}
        <div
          className="h-[60px] w-[60px] rounded-lg relative border border-neutral-400 
            flex items-center justify-center gen-anim hover:bg-neutral-400 group mr-4"
        >
          <input
            type="file"
            accept="image/*"
            className="opacity-0 absolute top-0 h-full w-full cursor-pointer"
            onChange={handleFileChange}
          />
          +
        </div>
        <p>Upload Image</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          className="border border-neutral-300 rounded-lg py-1 px-3"
          onClick={() => openModal()}
        >
          View Options
        </button>
        <p>
          {product.groups?.length > 0
            ? product.groups?.length + " groups Selected"
            : "No groups Selected"}
        </p>
      </div>
      {isOpen && (
        <OptionsSelector
          options={groups}
          chosenOptions={product.groups}
          title="Groups"
          onclick={addGroups}
          close={closeModal}
        />
      )}
      <div className="flex gap-3 py-3 mt-auto">
        {product.id !== -1 && (
          <button
            className="border-[3px] bg-red-600 border-red-600 rounded-xl font-medium gen-anim py-3 px-4"
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
          {product.id === -1 ? "Create" : "Update"}
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
