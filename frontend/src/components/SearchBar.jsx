import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ value, onChange, className, ...props }) => {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FaSearch className="text-gray-400" />
      </div>
      <input
        type="text"
        placeholder="Search resources..."
        className="block w-full pl-10 pr-3 py-2 rounded-full border border-gray-300 
                 focus:outline-none focus:ring-2 focus:ring-seagreen focus:border-transparent
                 transition-all duration-200"
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  );
};

export default SearchBar;