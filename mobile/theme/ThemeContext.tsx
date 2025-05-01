import { createContext, useContext, useState } from "react";

type themeContextType = {
  theme: "light" | "dark";
  toggleTheme: () => void;
};

const ThemeContext = createContext<themeContextType | null>(null);

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context)
    throw new Error("useTheme() must be used within a ThemeProvider.");

  return context;
};

export { ThemeProvider, useTheme };
