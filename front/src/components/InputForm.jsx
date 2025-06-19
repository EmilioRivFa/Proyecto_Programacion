const InputForm = ({ type, placeHolder, isRequired,evt }) => {
    return (
        <input 
        className="placeholder:text-slate-100 p-1 border-b border-slate-300 outline-none focus:border-slate-300" 
        onChange={evt}
        type={type} 
        placeholder={placeHolder} 
        required={isRequired} />
    );
};

export default InputForm;
