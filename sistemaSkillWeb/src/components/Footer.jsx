import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { DiJava, DiReact } from "react-icons/di";
import { FaMobileAlt } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

const Footer = () => {
  const theme = useTheme();

  const iconStyle = {
    margin: "0 10px",
    color: theme.lightHighlight,
  };

  return (
    <div
      style={{
        backgroundColor: theme.azulEscuro,
        paddingBottom: "10px",
        fontWeight: "bold",
        color: theme.azulAlice,
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
              }}
            >
              <h4>Links do Projeto</h4>
              <a
                href="https://github.com/Douglas-Mariano/ProjetoSistamaSkillNeki"
                target="_blank"
                rel="noopener noreferrer"
              >
                <DiJava size={40} style={iconStyle} />
              </a>
              <a
                href="https://github.com/Douglas-Mariano/ProjetoSistamaSkillNekiWeb"
                target="_blank"
                rel="noopener noreferrer"
              >
                <DiReact size={40} style={iconStyle} />
              </a>
              <a
                href="https://github.com/Douglas-Mariano/ProjetoSistamaSkillNekiMobile"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaMobileAlt size={30} style={iconStyle} />
              </a>
            </div>
          </Col>
          <Col md={4}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                paddingTop: "22px",
              }}
            >
              <h4>Redes Sociais</h4>
              <a
                href="https://www.linkedin.com/in/dgmariano"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsLinkedin size={30} style={iconStyle} />
              </a>
              <a
                href="https://github.com/Douglas-Mariano"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsGithub size={30} style={iconStyle} />
              </a>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Footer;
