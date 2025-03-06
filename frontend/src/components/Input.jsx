const Input = ({ id, label, placeholder, type, value, onChange, className }) => {
    return (
      <div className="flex flex-col gap-2">
        {label ? (
          <label className="text-base font-medium py-2" htmlFor={id}>
            {label}
          </label>
        ) : null}
  
        {type === "textarea" ? (
          <textarea
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`border border-gray-300 rounded-md px-3 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-seagreen ${className}`}
            rows={5} // Default row size for textarea
          />
        ) : (
          <input
            id={id}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`border border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-seagreen ${className}`}
          />
        )}
      </div>
    );
  };
  
  export default Input;
  