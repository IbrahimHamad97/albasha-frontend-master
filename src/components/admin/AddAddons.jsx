import { useEffect, useState } from "react";
import SharedFormInput from "../sharedFormInput";
import { toast } from "react-toastify";
import { addAddonsHTTP, removeHTTP } from "../../api/admin.controller";
import { FaTrash } from "react-icons/fa";

const AddAddons = ({ addons, click }) => {
  const defaultValue = {
    id: -1,
    price: 0,
    name: "",
  };
  const [option, setOption] = useState(defaultValue);
  const [adds, setAdds] = useState(addons);

  const handleUpload = async () => {
    if (option.price >= 0 && option.name) {
      let type = "create";
      if (option.id !== -1) type = "edit";
      const data = await addAddonsHTTP(option, type);
      if (data?.success) click();
      if (type === "create") setOption(defaultValue);
    } else {
      toast.error("Need to have both name and price filled", {
        theme: "dark",
      });
    }
  };

  useEffect(() => {
    setAdds(addons);
  }, [addons]);

  const set = (e) => {
    setOption(JSON.parse(e));
  };

  const remove = async () => {
    const res = await removeHTTP(option.id, "addon");
    if (res) {
      setAdds(adds.filter((a) => a.id !== option.id));
      setOption(defaultValue);
    }
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl text-center mb-4 font-bold">Upload Addon</h1>
      <div className="space-y-2 mb-6">
        <div className="w-full mb-4">
          <p className="mb-1">Create / Update Options</p>
          <select
            className="w-full px-2 py-3"
            onChange={(e) => set(e.target.value)}
          >
            <option value={JSON.stringify(defaultValue)}>Create New</option>
            {adds?.map((add, index) => {
              return (
                <option key={index} value={JSON.stringify(add)}>
                  {add.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="w-full">
          <p className="mb-1">Addon Name *</p>
          <SharedFormInput
            type="text"
            placeholder="Extra Ketchup"
            val={option.name}
            change={(e) => setOption({ ...option, name: e.target.value })}
            width="100%"
          />
        </div>
        <div className="w-full">
          <p className="mb-1">Price *</p>
          <SharedFormInput
            type="number"
            width="100%"
            placeholder="2"
            val={option.price}
            change={(e) => setOption({ ...option, price: e.target.value })}
          />
        </div>
      </div>
      <div className="flex gap-3 py-3 mt-auto">
        {option.id !== -1 && (
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
          {option.id === -1 ? "Create" : "Update"}
        </button>
      </div>
    </div>
  );
};

export default AddAddons;
