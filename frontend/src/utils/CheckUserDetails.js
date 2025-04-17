import axios from "axios";

const getUserDetails = async (token) => {
  if (!token) {
    console.error("Token is missing from localStorage");
    return null;
  }

  try {
    const response = await axios.get(
      "http://localhost:8081/api/yib/auth/check",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { customerId, name, role } = response.data;
    console.log("Fetched user details:", { customerId, name, role });

    return {
      customerId,
      name,
      role,
    };
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error("Error fetching data:", error);
      localStorage.removeItem("token");
    }
    return null;
  }
};

export default getUserDetails;
