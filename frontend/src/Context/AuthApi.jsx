// import { createContext, useContext, useState } from "react";
// import { useEffect } from "react";
// import getRole from "../utils/CheckRole";

// const AuthContext = createContext();

// export const MyProvider = ({ children }) => {
//   const [role, setRole] = useState("");

//   useEffect(() => {
//     getRole(setRole); // Fetch role on mount
//   }, []);

//   return (
//     <AuthContext.Provider value={{ role, setRole }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

import { createContext, useContext, useState, useEffect } from "react";
import getRole from "../utils/CheckRole";

const AuthContext = createContext();

export const MyProvider = ({ children }) => {
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true); // ✅ New

  useEffect(() => {
    getRole((fetchedRole) => {
      setRole(fetchedRole);
      setLoading(false); // ✅ Set loading to false after role is fetched
    });
  }, []);

  return (
    <AuthContext.Provider value={{ role, setRole, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
