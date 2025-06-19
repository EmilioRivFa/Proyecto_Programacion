const InputForm = ({ type, placeHolder, isRequired, evt }) => {
  return (
    <input
      onChange={evt}
      type={type}
      placeholder={placeHolder}
      required={isRequired}
      className="w-full px-4 py-2 bg-gray-800 text-white placeholder-gray-400 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-200"
    />
  );
};

export default InputForm;
