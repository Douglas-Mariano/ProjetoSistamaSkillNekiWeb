import React, { createContext, useContext } from "react";

const ThemeContext = createContext();

const useTheme = () => {
  return useContext(ThemeContext);
};

const ThemeProvider = ({ children }) => {
  const theme = {
    darkBackground: "#f7f7f7",
    c: "##98a1aa",
    primaryColor: "#2c4156",
    secondaryColor: "#39586d",
    highlightColor: "#7f99b2",
    azulEscuro: "#000080",
    azulClaro: "#ADD8E6",
    azulAlice: "#F0F8FF",
    branco: "#F5F5F5",
    cinza: "#808080",
    cinzaClaro: "#d2d7db",
    preto: "#202020",
    verde: "#28a745"
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export { ThemeProvider, useTheme };
