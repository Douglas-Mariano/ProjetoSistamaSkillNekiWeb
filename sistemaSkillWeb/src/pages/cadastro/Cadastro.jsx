import "bootstrap/dist/css/bootstrap.min.css";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";

const Cadastro = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card border="dark" style={{ width: "35rem" }}>
        <Card.Header
          className="text-center"
          style={{
            background: "transparent",
            borderBottom: "0",
            fontSize: "24px",
            marginTop: "10px",
          }}
        >
          Cadastro
        </Card.Header>

        <Card.Body>
          <Form>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formHorizontalNome"
            >
              <Form.Label column sm={12}>
                Nome
              </Form.Label>
              <Col sm={12}>
                <Form.Control type="nome" placeholder="Nome" />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formHorizontalEmail"
            >
              <Form.Label column sm={12}>
                Email
              </Form.Label>
              <Col sm={12}>
                <Form.Control type="email" placeholder="Email" />
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
                <Form.Control type="senha" placeholder="Senha" />
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
                  type="confirmarSenha"
                  placeholder="Confirmar Senha"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Col sm={{ span: 12, offset: 0 }} className="text-center">
                <Button variant="dark" size="sm">
                  Cadastrar
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </Card.Body>
        <Card.Footer
          className="text-center"
          style={{ background: "transparent", borderTop: "0" }}
        >
          <Card.Text>
            Já possui cadastro?
            {/* <Link to="/login">Logar-se</Link> */}
          </Card.Text>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default Cadastro;
