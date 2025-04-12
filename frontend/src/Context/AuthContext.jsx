import { createContext, useContext, useState, useEffect } from "react";
import getRole from "../utils/CheckRole";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(localStorage.getItem('role') || null);
  const [loading, setLoading] = useState(true);

  const updateRole = (newRole) => {
    localStorage.setItem('role', newRole);
    setRole(newRole);
  };

  useEffect(() => {
    const fetchRole = async () => {
      const fetchedRole = await getRole();
      setRole(fetchedRole);
      setLoading(false);
    };
    fetchRole();
  }, []);

  return (
    <AuthContext.Provider value={{  role, setRole: updateRole, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
