import { createContext, useContext, useState, useEffect } from "react";
import getUserDetails from "../utils/CheckUserDetails";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize state from localStorage
  const [authState, setAuthState] = useState(() => {
    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user") || "null");
      return {
        token,
        user,
        isLoggedIn: !!token, // Initialize isLoggedIn based on token presence
        loading: true
      };
    } catch (error) {
      console.error("Error initializing auth state", error);
      return {
        token: null,
        user: null,
        isLoggedIn: false,
        loading: false
      };
    }
  });

  // Maintain the same external API by destructuring
  const { token, user, isLoggedIn, loading } = authState;

  const updateAuthState = (newState) => {
    setAuthState(prev => ({
      ...prev,
      ...newState
    }));
  };

  // Keep the same function signatures for compatibility
  const updateUser = (newUserDetails) => {
    if (newUserDetails) {
      localStorage.setItem("user", JSON.stringify(newUserDetails));
      updateAuthState({ user: newUserDetails });
    } else {
      localStorage.removeItem("user");
      updateAuthState({ user: null });
    }
  };

  const updateToken = (newToken) => {
    if (newToken) {
      localStorage.setItem("token", newToken);
      updateAuthState({ 
        token: newToken,
        isLoggedIn: true // Automatically set isLoggedIn when token is set
      });
    } else {
      localStorage.removeItem("token");
      updateAuthState({ 
        token: null,
        isLoggedIn: false // Automatically set isLoggedIn when token is removed
      });
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    updateAuthState({
      token: null,
      user: null,
      isLoggedIn: false,
      loading: false
    });
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (!authState.token) {
        updateAuthState({ loading: false });
        return;
      }

      try {
        const userDetails = await getUserDetails(authState.token);
        updateAuthState({
          user: userDetails,
          isLoggedIn: true, // Ensure isLoggedIn stays true
          loading: false
        });
      } catch (error) {
        console.error("Failed to fetch user details", error);
        logout();
      }
    };

    fetchUser();
  }, [authState.token]);

  // Maintain the exact same provider value structure
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
        setIsLoggedIn: (value) => updateAuthState({ isLoggedIn: value })
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};