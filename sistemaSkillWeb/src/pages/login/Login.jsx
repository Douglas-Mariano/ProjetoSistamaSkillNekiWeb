import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import Alert from "react-bootstrap/Alert";

import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { SistemaSkillContext } from "../../context/SistemaSkillContext";
import { api } from "../../api/api";
import { useTheme } from "../../context/ThemeContext";

const Login = () => {
  const theme = useTheme();
  const {
    login,
    setLogin,
    senha,
    setSenha,
    mostrarSenha,
    setMostrarSenha,
  } = useContext(SistemaSkillContext);
  const [lembrar, setLembrar] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedLogin = localStorage.getItem("storedLogin");
    const storedSenha = localStorage.getItem("storedSenha");

    if (storedLogin && storedSenha) {
      setLogin(storedLogin);
      setSenha(storedSenha);
      setLembrar(true);
    } else {
      setLogin("");
      setSenha("");
    }
  }, [setLogin, setSenha]);

  const handleMostrarSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };

  const handleLembrar = () => {
    setLembrar(!lembrar);

    if (!lembrar) {
      localStorage.setItem("storedLogin", login);
      localStorage.setItem("storedSenha", senha);
    } else {
      localStorage.removeItem("storedLogin");
      localStorage.removeItem("storedSenha");
    }
  };

  const handleLogar = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/usuarios/login", {
        login,
        senha,
      });

      if (response.status === 200) {
        const { token, usuario } = response.data;

        localStorage.setItem("token", token);
        localStorage.setItem("idUsuario", usuario.id);

        navigate("/home");
      } else {
        setShowAlert(true);
      }
    } catch (error) {
      console.error("Erro durante o login:", error);
      setShowAlert(true);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <div>
        {showAlert && (
          <Alert
            variant="danger"
            onClose={() => setShowAlert(false)}
            dismissible
          >
            Usuário ou senha inválidos!
          </Alert>
        )}

        <Card
          border="dark"
          style={{ width: "35rem", backgroundColor: theme.darkBackground, color: theme.lightHighlight }}
        >
          <Card.Header
            className="text-center"
            style={{
              borderBottom: "0",
              fontSize: "24px",
              paddingTop: "10px",
            }}
          >
            Login
          </Card.Header>

          <Card.Body>
            <Form
              onSubmit={(e) => handleLogar(e)}
              style={{ alignItems: "center" }}
            >
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formHorizontalLogin"
              >
                <Form.Label column sm={12}>
                  Login
                </Form.Label>
                <Col sm={12}>
                  <Form.Control
                    value={login}
                    type="email"
                    placeholder="Login"
                    required
                    onChange={(e) => {
                      setLogin(e.target.value);
                    }}
                    style={{ backgroundColor: theme.lightHighlight, color: theme.darkBackground }}
                  />
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formHorizontalSenha"
              >
                <Form.Label column sm={12}>
                  Senha
                </Form.Label>
                <Col sm={12}>
                  <Form.Control
                    value={senha}
                    type={mostrarSenha ? "text" : "password"}
                    placeholder="Senha"
                    required
                    onChange={(e) => {
                      setSenha(e.target.value);
                    }}
                    style={{ backgroundColor: theme.lightHighlight, color: theme.darkBackground }}
                  />
                  <Button
                    variant="link"
                    onClick={handleMostrarSenha}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "54.5%",
                      color: theme.primaryColor,
                    }}
                  >
                    {mostrarSenha ? <EyeSlash /> : <Eye />}
                  </Button>
                </Col>
              </Form.Group>

              <Form.Check
                type="switch"
                id="custom-switch"
                label="Lembrar-se"
                checked={lembrar}
                onChange={handleLembrar}
                style={{ color: theme.lightHighlight }}
              />

              <Form.Group as={Row} className="mb-3">
                <Col sm={{ span: 12, offset: 0 }} className="text-center">
                  <Button variant="secondary" size="sm" type="submit">
                    Logar
                  </Button>
                </Col>
              </Form.Group>
            </Form>
          </Card.Body>
          <Card.Footer
            className="text-center"
            style={{ borderTop: "0" }}
          >
            <Card.Text>
              Não possui cadastro?{" "}
              <Link to="/cadastro" style={{ color: theme.lightBackground, marginLeft: "5px" }}>
                Cadastre-se
              </Link>
            </Card.Text>
          </Card.Footer>
        </Card>
      </div>
    </Container>
  );
};

export default Login;
