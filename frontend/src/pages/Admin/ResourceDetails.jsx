import React from 'react'
import Sidebar from '../../components/SideBar'

const ResourceDetails = () => {
  // const [resource, setResource] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchResources = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:8081/api/yib/");
  //       setCustomers(response.data);
  //     } catch (err) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchCustomers();
  // }, []);

  // const handleDelete = async (customerId) => {
  //   try {
  //     await axios.delete(`http://localhost:8081/api/yib/customers/${customerId}`);
  //     setCustomers((prevCustomers) => prevCustomers.filter((customer) => customer.customerId !== customerId));
  //     alert("Customer deleted successfully");
  //   } catch (err) {
  //     alert.error(`Failed to delete customer: ${err.message}`);
  //   }
  // };
  
  // Define columns for the table
  // const columns = [
  //   { key: "index", label: "S. No.", render: (_, __, i) => i + 1 },
  //   { key: "name", label: "Name" },
  //   { key: "address", label: "Address" },
  //   { key: "email", label: "Email" },
  //   { key: "phoneNumber", label: "Phone Number" },
  //   { key: "customerType", label: "Customer Type" },
  // ];

  return (
    <>
    <div className="flex">
      <div className="w-64 fixed left-0 top-0 h-full bg-gray-800 text-white">
        <Sidebar />
      </div>

      {/* <div className="flex-1 ml-64 p-8">
        <h2 className="text-2xl font-bold mb-4">User details: </h2>

        <Table
          columns={columns}
          data={customers}
          loading={loading}
          error={error}
          onDelete={handleDelete}
        />
      </div> */}
    </div>
    </>
  );
};

export default ResourceDetails
