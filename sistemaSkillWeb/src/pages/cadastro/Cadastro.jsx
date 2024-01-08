import React, { useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SistemaSkillContext } from "../../context/SistemaSkillContext";
import { api } from "../../api/api";
import { useTheme } from "../../context/ThemeContext";

const Cadastro = () => {
  const theme = useTheme();
  const {
    nome,
    setNome,
    senha,
    setSenha,
    mostrarSenha,
    setMostrarSenha,
    login,
    setLogin,
  } = useContext(SistemaSkillContext);
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [showAlertCadastro, setShowAlertCadastro] = useState(false);
  const navigate = useNavigate();

  const handleMostrarSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };

  const handleCadastrar = async (e) => {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      setShowAlertCadastro({
        variant: "danger",
        message: "Verifique se senha e confirmação de Senha são iguais",
      });
      return;
    }

    try {
      const novoCadastro = {
        nome: nome,
        login: login,
        senha: senha,
      };

      await api.post("/usuarios", novoCadastro);

      navigate("/");
      setLogin("");
      setSenha("");
      setConfirmarSenha("");
      setNome("");
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      setShowAlertCadastro({
        variant: "danger",
        message: "Erro ao cadastrar usuário. Tente novamente.",
      });
    }
  };

  const handleChangeNome = (e) => {
    setNome(e.target.value);
  };

  const handleChangeLogin = (e) => {
    setLogin(e.target.value);
  };

  const handleChangeSenha = (e) => {
    setSenha(e.target.value);
  };

  const handleChangeConfirmarSenha = (e) => {
    setConfirmarSenha(e.target.value);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <div>
        {showAlertCadastro && (
          <Alert
            variant="danger"
            onClose={() => setShowAlertCadastro(false)}
            dismissible
          >
            {showAlertCadastro.message}
          </Alert>
        )}

        <Card
          border="dark"
          style={{
            width: "35rem",
            backgroundColor: theme.darkBackground,
            color: theme.lightHighlight,
          }}
        >
          <Card.Header
            className="text-center"
            style={{
              borderBottom: "0",
              fontSize: "24px",
              marginTop: "10px",
            }}
          >
            Cadastro
          </Card.Header>

          <Card.Body style={{ alignItems: "center" }}>
            <Form onSubmit={handleCadastrar}>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formHorizontalNome"
              >
                <Form.Label column sm={12}>
                  Nome
                </Form.Label>
                <Col sm={12}>
                  <Form.Control
                    required
                    onChange={handleChangeNome}
                    type="text"
                    placeholder="Nome"
                    style={{
                      backgroundColor: theme.lightHighlight,
                      color: theme.darkBackground,
                    }}
                  />
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formHorizontalLogin"
              >
                <Form.Label column sm={12}>
                  Email
                </Form.Label>
                <Col sm={12}>
                  <Form.Control
                    required
                    onChange={handleChangeLogin}
                    type="email"
                    placeholder="Email"
                    style={{
                      backgroundColor: theme.lightHighlight,
                      color: theme.darkBackground,
                    }}
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
                    required
                    onChange={handleChangeSenha}
                    type={mostrarSenha ? "text" : "password"}
                    placeholder="Senha"
                    style={{
                      backgroundColor: theme.lightHighlight,
                      color: theme.darkBackground,
                    }}
                  />
                  <Button
                    variant="link"
                    onClick={handleMostrarSenha}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "55.5%",
                      color: theme.primaryColor,
                    }}
                  >
                    {mostrarSenha ? <EyeSlash /> : <Eye />}
                  </Button>
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formHorizontalConfirmarSenha"
              >
                <Form.Label column sm={12}>
                  Confirmar Senha
                </Form.Label>
                <Col sm={12}>
                  <Form.Control
                    required
                    onChange={handleChangeConfirmarSenha}
                    type={mostrarSenha ? "text" : "password"}
                    placeholder="Confirmar Senha"
                    style={{
                      backgroundColor: theme.lightHighlight,
                      color: theme.darkBackground,
                    }}
                  />
                  <Button
                    variant="link"
                    onClick={handleMostrarSenha}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "72%",
                      color: theme.primaryColor,
                    }}
                  >
                    {mostrarSenha ? <EyeSlash /> : <Eye />}
                  </Button>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Col sm={{ span: 12, offset: 0 }} className="text-center">
                  <Button variant="secondary" size="sm" type="submit">
                    Cadastrar
                  </Button>
                </Col>
              </Form.Group>
            </Form>
          </Card.Body>

          <Card.Footer className="text-center" style={{ borderTop: "0" }}>
            <Card.Text>
              Já possui cadastro?{" "}
              <Link
                to="/login"
                style={{ color: theme.lightBackground, marginLeft: "5px" }}
              >
                Logar-se
              </Link>
            </Card.Text>
          </Card.Footer>
        </Card>
      </div>
    </Container>
  );
};

export default Cadastro;
