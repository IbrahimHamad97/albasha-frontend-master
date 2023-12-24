import { useEffect, useState } from "react";
import SharedFormInput from "../sharedFormInput";
import { toast } from "react-toastify";
import OptionsSelector from "./options";
import { addGroupHTTP, removeHTTP } from "../../api/admin.controller";
import { FaTrash } from "react-icons/fa";

const AddGroup = ({ addons, groups, click }) => {
  const defaultValue = {
    id: -1,
    name: "",
    min: 0,
    max: 0,
    addons: [],
  };
  const [group, setGroup] = useState({
    id: -1,
    name: "",
    min: 0,
    max: 0,
    addons: [],
  });
  const [isOpen, setIsOpen] = useState(false);
  const [allGroups, setAllGroups] = useState(groups);

  const addAddons = (adds) => {
    setGroup({ ...group, addons: adds });
  };

  const handleUpload = async () => {
    if (
      group.max >= 0 &&
      group.min >= 0 &&
      group.name &&
      group.addons.length > 0
    ) {
      let type = "create";
      if (group.id !== -1) type = "edit";
      const data = await addGroupHTTP(group, type);
      if (data?.success) click();
      if (type === "create") setGroup(defaultValue);
    } else {
      toast.error("You need to have all fields added", {
        theme: "dark",
      });
    }
  };

  useEffect(() => {
    setAllGroups(groups);
  }, [groups]);

  const set = (e) => {
    setGroup(JSON.parse(e));
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const remove = async () => {
    const res = await removeHTTP(group.id, "group");
    if (res) {
      setAllGroups(groups.filter((a) => a.id !== group.id));
      setGroup(defaultValue);
    }
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl text-center mb-4 font-bold">Upload Group</h1>
      <div className="space-y-3 mb-4">
        <div className="w-full">
          <p className="mb-1">Create / Update Group</p>
          <select
            className="w-full px-2 py-3"
            onChange={(e) => set(e.target.value)}
            value={
              group.id !== -1
                ? JSON.stringify(group)
                : JSON.stringify(defaultValue)
            }
          >
            <option value={JSON.stringify(defaultValue)}>Create New</option>
            {allGroups?.map((group, index) => {
              return (
                <option key={index} value={JSON.stringify(group)}>
                  {group.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="w-full">
          <p className="mb-1">Group Name *</p>
          <SharedFormInput
            type="text"
            placeholder="Chicken Burger"
            val={group.name}
            change={(e) => setGroup({ ...group, name: e.target.value })}
            width="100%"
          />
        </div>
        <div className="flex gap-4">
          <div className="w-fit">
            <p className="mb-1">Mininum Selection *</p>
            <SharedFormInput
              type="number"
              placeholder="Chicken Burger"
              val={group.min}
              change={(e) => setGroup({ ...group, min: e.target.value })}
              width="100%"
            />
          </div>
          <div className="w-fit">
            <p className="mb-1">Maximum Selection *</p>
            <SharedFormInput
              type="number"
              placeholder="Chicken Burger"
              val={group.max}
              change={(e) => setGroup({ ...group, max: e.target.value })}
              width="100%"
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="border border-neutral-300 rounded-lg py-1 px-3"
            onClick={() => openModal()}
          >
            View Options
          </button>
          <p>
            {group.addons?.length > 0
              ? group.addons?.length + " options selected"
              : "No options selected"}
          </p>
        </div>
        {isOpen && (
          <OptionsSelector
            options={addons}
            chosenOptions={group.addons}
            title="Options"
            onclick={addAddons}
            close={closeModal}
          />
        )}
      </div>
      <div className="flex gap-3 py-3 mt-auto">
        {group.id !== -1 && (
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
          {group.id === -1 ? "Create" : "Update"}
        </button>
      </div>
    </div>
  );
};

export default AddGroup;
