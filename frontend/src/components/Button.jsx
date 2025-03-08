const Button = ({ name }) => {
  return (
    <div>
      <button className="bg-seagreen text-white text-base px-6 py-3 rounded-md cursor-pointer font-medium opacity-100 hover:opacity-80 hover:-translate-y-1 transition-all duration-300">
        {name}
      </button>
    </div>
  );
};

export default Button;
