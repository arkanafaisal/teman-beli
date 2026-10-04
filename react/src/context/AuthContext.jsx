import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { toast } from "sonner";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState({ isLoggedIn: false, name: '' });
  const [isInitializing, setIsInitializing] = useState(true);

  // Cek sesi otomatis saat pertama kali aplikasi dimuat (mengandalkan cookies)
  useEffect(() => {
    const checkSession = async () => {
      const res = await api.user.getProfile();
      if (res.success && res.payload) {
        setUser({
          isLoggedIn: true,
          name: res.payload.name,
          email: res.payload.email,
          rating: res.payload.rating,
          department: res.payload.department,
        });
        toast.success(`Selamat datang, ${res.payload.name}!`);
      }
      setIsInitializing(false);
    };
    checkSession();
  }, []);

  const login = (userData) => {
    setUser({
      isLoggedIn: true,
      name: userData.name,
      email: userData.email,
      rating: userData.rating,
      department: userData.department,
    });
  };

  const logout = () => {
    setUser({ isLoggedIn: false, name: '' });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isInitializing }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
