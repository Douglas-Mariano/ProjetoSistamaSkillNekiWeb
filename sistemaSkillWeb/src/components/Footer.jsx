import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { DiJava, DiReact } from "react-icons/di";
import { FaMobileAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Footer = () => {
  const theme = useTheme();

  return (
    <div
      style={{
        backgroundColor: theme.color1,
        paddingBottom: "10px",
        fontWeight: "bold",
        color: theme.color6,
        width: "100%",
        minHeight: "10vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div>
        <Row style={{ justifyContent: "space-between" }}>
          <Col md={4}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                paddingTop: "22px",
                paddingRight: "80px",
              }}
            >
              <h4 style={{ paddingTop: "" }}>Links do Projeto</h4>
              <Link
                to={
                  "https://github.com/tiktoneli/projeto-Final-Web-Dev-Grupo-3"
                }
                target={"_blank"}
              >
                <DiJava size={40} />
              </Link>
              <Link to={"https://www.facebook.com"} target={"_blank"}>
                <DiReact size={40} />
              </Link>
              <Link to={"https://www.instagram.com/"} target={"_blank"}>
                <FaMobileAlt size={30} />
              </Link>
            </div>
          </Col>
          <Col md={4}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                paddingTop: "22px",
                paddingRight: "80px",
              }}
            >
              <h4 style={{ paddingTop: "" }}>Redes Sociais</h4>
              <Link
                to={"https://www.linkedin.com/in/dgmariano"}
                target={"_blank"}
              >
                <BsLinkedin size={30} />
              </Link>
              <Link to={"https://github.com/Douglas-Mariano"} target={"_blank"}>
                <BsGithub size={30} />
              </Link>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Footer;
