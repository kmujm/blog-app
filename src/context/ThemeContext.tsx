import { createContext, ReactNode, useState } from "react";

const ThemeContext = createContext({
  theme: "light",
  toggleMode: () => {},
});

interface ThemeProps {
  children: ReactNode;
}

export const ThemeContextProvider = ({ children }: ThemeProps) => {
  // 새로 고침해도 유지되도록! LocalStorage 사용
  const [theme, setTheme] = useState(
    window.localStorage.getItem("theme") || "light"
  );

  const toggleMode = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
    window.localStorage.setItem("theme", theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
