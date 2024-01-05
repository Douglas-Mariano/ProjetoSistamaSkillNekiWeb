import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useState } from "react";

const Home = () => {
  const [level, setLevel] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleAddSkill = (newSkillLevel) => {
    console.log(`Nova Skill Level: ${newSkillLevel}`);
    handleCloseModal();
  };

  const handleIncreaseLevel = () => {
    setLevel(level + 1);
  };

  const handleDecreaseLevel = () => {
    if (level > 0) {
      setLevel(level - 1);
    }
  };

  return (
    <Container className="d-flex flex-column align-items-start vh-100">
      <Table striped bordered hover size="lg" className="w-100 overflow-auto mt-5">
        <thead>
          <tr>
            <th colSpan="5" className="text-center" style={{ fontSize: "24px" }}>
              Lista de Skills
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Imagem</td>
            <td>Skill</td>
            <td>Descrição</td>
            <td className="d-flex justify-content-between align-items-center">
              <span>{level}</span>
              <ButtonGroup>
                <Button className="btn btn-sm btn-success" onClick={handleIncreaseLevel}>
                  {" "}
                  +{" "}
                </Button>
                <Button className="btn btn-sm btn-danger" onClick={handleDecreaseLevel}>
                  {" "}
                  -{" "}
                </Button>
              </ButtonGroup>
            </td>
            <td>
              <Button className="btn btn-sm btn-danger">Excluir</Button>
            </td>
          </tr>
        </tbody>
      </Table>

      <Button variant="primary" onClick={handleShowModal} className="mt-2 ml-auto">
        Adicionar Skill
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header>
          <Modal.Title>Cadastro de Skill</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formGridState">
            <Form.Label>Skills:</Form.Label>
            <Form.Select defaultValue="Choose...">
              <option>Choose...</option>
            </Form.Select>
          </Form.Group>
          <Form.Group as={Row} controlId="formGridCity">
            <Form.Label column sm="12">
              Level
            </Form.Label>
            <Col sm="3">
              <Form.Control type="number" onChange={(e) => setLevel(e.target.value)} />
            </Col>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Fechar
          </Button>
          <Button variant="primary" onClick={() => handleAddSkill(level)}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Home;
