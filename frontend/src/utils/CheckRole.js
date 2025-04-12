import axios from "axios";

const getRole = async () => {
  const token = window.localStorage.getItem("token");

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

    const userRole = response.data; 
    console.log("Fetched role:", userRole);
    return userRole;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error("Error fetching role:", error);
      localStorage.removeItem("token");
    }
    return null;
  }
};

export default getRole;
