import React, { createContext, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Calories from './pages/Calories';

export const ThemeContext = createContext<{
  theme: string;
  toggleTheme: (theme: string) => void;
}>({ theme: 'light', toggleTheme: () => {} });

const App = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = (newTheme: string) => setTheme(newTheme);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/calories" element={<Calories />} />
        </Routes>
      </BrowserRouter>
    </ThemeContext.Provider>
  );
};

export default App;
