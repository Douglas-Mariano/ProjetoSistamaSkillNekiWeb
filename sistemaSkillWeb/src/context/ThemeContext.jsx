import React, { createContext, useContext } from "react";

const ThemeContext = createContext();

const useTheme = () => {
  return useContext(ThemeContext);
};

const ThemeProvider = ({ children }) => {
  const theme = {
    color1: "#1f1f20",
    color2: "#4D3EFC",
    color3: "#8C83ED",
    color4: "#606d80",
    color5: "#D9D9D9",
    color6: "#F6FCFF",
    color7: "#EAEAEA",
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export { ThemeProvider, useTheme };
