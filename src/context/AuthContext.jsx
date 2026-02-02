import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Restore user on refresh (CRITICAL for socket join)
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // 🔐 LOGIN
  const login = async (email, password) => {
  const res = await api.post("/login", { email, password });

  if (res.data?.user) {
    localStorage.setItem("user", JSON.stringify(res.data.user));
    setUser(res.data.user);
  }

  return res.data;
};


  // 📝 REGISTER
  const register = async (name, email, password) => {
    const res = await api.post("/register", {
      name,
      email,
      password,
    });
    return res.data;
  };

  // 🚪 LOGOUT
  const logout = async () => {
    try {
      await api.post("logout");
    } catch (err) {
      // ignore server logout failure
    }

    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        register,
        logout,
        loading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ✅ SAFE EXPORT (fixes Vite HMR warning)
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
