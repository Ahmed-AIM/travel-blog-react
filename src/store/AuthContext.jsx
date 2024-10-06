import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState("");

  const handlelogin = (loginData) => {
    const storedUsers = JSON.parse(localStorage.getItem('formData')) || [];
    
    // Check if any user data matches the login data
    const foundUser = storedUsers.find(
      user =>
        (user.email === loginData.username || user.firstName === loginData.username) &&
        user.password === loginData.password
    );

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("user", JSON.stringify(foundUser));
      return true;  // Login successful
    } else {
      return false; // Login failed
    }
  };

  const handleLogout = () => {
    setUser("");
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) setUser(JSON.parse(localUser));
  }, []);

  return (
    <AuthContext.Provider value={{ user, handlelogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
