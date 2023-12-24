const SharedFormInput = ({ width, placeholder, val, change, type }) => {
  return (
    <input
      className="px-4 py-3 border-gray-600 border gen-anim rounded-lg"
      required
      placeholder={placeholder}
      value={val}
      onChange={change}
      style={{ width: width }}
      type={type || "text"}
    />
  );
};

export default SharedFormInput;
