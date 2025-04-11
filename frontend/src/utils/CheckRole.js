import axios from "axios";

const getRole = async (setRole) => {
  const token = window.localStorage.getItem("token");

  if (!token) {
    console.error("Token is missing from localStorage");
    return;
  }
  axios
    .get("http://localhost:8081/api/yib/auth/check", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, 
      },
    })
    .then((response) => {
      const user_role = response.data;
      setRole(user_role);
      console.log("Role :", user_role);
    })
    .catch((error) => {
      if (error.response && error.response.status === 401) {
        console.error("Error fetching role:", error);
        localStorage.removeItem("token");
      }
    });
};

export default getRole;
