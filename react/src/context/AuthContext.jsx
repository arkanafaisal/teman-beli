import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('TB_USER');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return { isLoggedIn: false, name: '' };
      }
    }
    return { isLoggedIn: false, name: '' };
  });

  useEffect(() => {
    localStorage.setItem('TB_USER', JSON.stringify(user));
  }, [user]);

  const login = () => {
    setUser({
      isLoggedIn: true,
      isVerified: true,
      name: "Mahasiswa Verified",
      email: "mhs@student.uns.ac.id",
    });
  };

  const logout = () => {
    setUser({ isLoggedIn: false, name: '' });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
