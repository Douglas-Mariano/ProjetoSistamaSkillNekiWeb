import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { SlLogout } from "react-icons/sl";
import { Link } from "react-router-dom";
import icone from "../assets/iconeG.png";

const Header = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("idUsuario");

    navigate("/");
  };

  return (
    <div
      style={{
        backgroundColor: theme.color1,
        paddingBottom: "15px",
        fontWeight: "bold",
        color: theme.color6,
        width: "100%",
        minHeight: "10vh",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "30px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={icone}
          alt="Logo"
          style={{ marginRight: "10px", width: "30px" }}
        />
      </div>
      <div style={{ display: "flex", alignItems: "center" }}></div>
      <div>
        <Link onClick={handleLogout}>
          <SlLogout size={20} />
        </Link>
      </div>
    </div>
  );
};

export default Header;