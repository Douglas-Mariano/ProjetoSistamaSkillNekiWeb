import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useTheme } from "./context/ThemeContext";

const App = () => {
  const theme = useTheme();

  return (
    <div style={{ backgroundColor: theme.color7, width: "100%" }}>
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  );
};

export default App;
