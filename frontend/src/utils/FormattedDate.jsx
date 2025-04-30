import { FiClock } from 'react-icons/fi';

const FormattedDate = ({ dateString, showIcon = true, className = '' }) => {
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className={`flex items-center space-x-2 text-sm text-gray-500 ${className}`}>
      {showIcon && <FiClock />}
      <span>{formatDate(dateString)}</span>
    </div>
  );
};

export default FormattedDate;