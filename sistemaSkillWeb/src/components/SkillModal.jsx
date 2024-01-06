import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const SkillModal = ({ showModal, handleCloseModal, handleAddSkill }) => {
  const [level, setLevel] = useState(0);

  return (
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
  );
};

export default SkillModal;
