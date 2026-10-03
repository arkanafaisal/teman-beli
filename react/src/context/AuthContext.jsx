import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

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
          isVerified: res.payload.verified || true,
          name: res.payload.name || "Mahasiswa Verified",
          email: res.payload.email || "mhs@student.uns.ac.id",
        });
      }
      setIsInitializing(false);
    };
    checkSession();
  }, []);

  const login = (userData) => {
    setUser({
      isLoggedIn: true,
      isVerified: userData.verified || true,
      name: userData.name || "Mahasiswa Verified",
      email: userData.email || "mhs@student.uns.ac.id",
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
