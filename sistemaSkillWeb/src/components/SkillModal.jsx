import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { api } from "../api/api";
import { useTheme } from "../context/ThemeContext";

const SkillModal = ({
  showModal,
  handleCloseModal,
  handleAdicionarSkill,
  novaSkill,
  setNovaSkill,
}) => {
  const theme = useTheme();
  const [skills, setSkills] = useState([]);
  const [selectedSkillId, setSelectedSkillId] = useState(null);
  const [level, setLevel] = useState(novaSkill.level);

  const limparFormulario = () => {
    setSelectedSkillId(null);
    setLevel("");
    setNovaSkill({ ...novaSkill, level: "", skills: { id: null } });
  };

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/skills", {
          headers: {
            Authorization: `${token}`,
          },
        });

        setSkills(response.data);
        if (!selectedSkillId && response.data.length > 0) {
          const firstSkillId = response.data[0].id;
          setSelectedSkillId(firstSkillId);
          setNovaSkill({ ...novaSkill, skills: { id: firstSkillId } });
        }
      } catch (error) {
        console.error("Erro ao obter a lista de skills:", error);
      }
    };

    if (showModal) {
      limparFormulario();
      fetchSkills();
    }
  }, [showModal]);

  const handleLevelChange = (e) => {
    const newLevel = e.target.value;
    setLevel(newLevel);
    setNovaSkill({ ...novaSkill, level: newLevel });
  };

  const handleSkillChange = (e) => {
    const selectedId = e.target.value;
    setSelectedSkillId(selectedId);
    setNovaSkill({ ...novaSkill, skills: { id: selectedId } });
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header
        style={{
          backgroundColor: theme.darkBackground,
          color: theme.lightHighlight,
        }}
      >
        <Modal.Title>Cadastro de Skill</Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          backgroundColor: theme.darkBackground,
          color: theme.lightHighlight,
        }}
      >
        <Form.Group controlId="formGridState">
          <Form.Label>Skills</Form.Label>
          <Form.Select
            defaultValue="..."
            onChange={handleSkillChange}
            style={{
              backgroundColor: theme.lightBackground,
              color: theme.darkBackground,
            }}
          >
            {skills.map((skill) => (
              <option key={skill.id} value={skill.id}>
                {skill.nome}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group as={Row} controlId="formGridCity">
          <Form.Label column sm="12">
            Level
          </Form.Label>
          <Col sm="3">
            <Form.Control
              type="number"
              value={level}
              onChange={handleLevelChange}
              style={{
                backgroundColor: theme.lightBackground,
                color: theme.darkBackground,
              }}
            />
          </Col>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: theme.darkBackground }}>
        <Button variant="secondary" onClick={handleCloseModal}>
          Fechar
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            handleAdicionarSkill();
            limparFormulario();
          }}
        >
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SkillModal;
