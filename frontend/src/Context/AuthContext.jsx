import { createContext, useContext, useState, useEffect } from "react";
import getUserDetails from "../utils/CheckUserDetails";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error parsing stored user", error);
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem("token");
    } catch (error) {
      console.error("Error reading token", error);
      return null;
    }
  });

  const [loading, setLoading] = useState(true);

  const updateUser = (newUserDetails) => {
    if (newUserDetails) {
      localStorage.setItem("user", JSON.stringify(newUserDetails));
      console.log("User details updated:", newUserDetails);
    } else {
      localStorage.removeItem("user");
    }
    setUser(newUserDetails);
  };

  const updateToken = (newToken) => {
    if (newToken) {
      localStorage.setItem("token", newToken);
    } else {
      localStorage.removeItem("token");
    }
    setToken(newToken);
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const userDetails = await getUserDetails(token); // use token
        updateUser(userDetails);
      } catch (error) {
        console.error("Failed to fetch user details", error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser: updateUser,
        token,
        setToken: updateToken,
        loading,
        logout,
        role: user?.role,
        customerId: user?.customerId,
        name: user?.name,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
