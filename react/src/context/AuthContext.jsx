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
          id: res.payload.id,
          name: res.payload.name,
          email: res.payload.email,
          rating: res.payload.rating,
          department: res.payload.department,
          role: res.payload.role || 'USER',
        });
        
        const lastGreeting = localStorage.getItem("last_greeting");
        const now = new Date().getTime();
        // Cek jika sudah lebih dari 4 jam (4 * 60 * 60 * 1000)
        if (!lastGreeting || now - parseInt(lastGreeting) > 4 * 60 * 60 * 1000) {
          const roleLabel = res.payload.role === 'ADMIN' ? 'Admin ' : '';
          toast.success(`Selamat datang kembali, ${roleLabel}${res.payload.name}!`);
          localStorage.setItem("last_greeting", now.toString());
        }
      }
      setIsInitializing(false);
    };
    checkSession();
  }, []);

  const login = (userData) => {
    setUser({
      isLoggedIn: true,
      id: userData.id,
      name: userData.name,
      email: userData.email,
      rating: userData.rating,
      department: userData.department,
      role: userData.role || 'USER',
    });
  };

  const logout = () => {
    setUser({ isLoggedIn: false, name: '' });
    localStorage.removeItem("last_greeting");
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
