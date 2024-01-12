import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import { api } from "../../api/api";
import SkillModal from "../../components/SkillModal";
import {
  IoCheckmarkSharp,
  IoCloseOutline,
  IoTrashBinSharp,
} from "react-icons/io5";
import { BsPencil } from "react-icons/bs";
import { FaCirclePlus } from "react-icons/fa6";
import { Alert, Image } from "react-bootstrap";
import { useTheme } from "../../context/ThemeContext";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [skillDelete, setSkillDelete] = useState(null);
  const [usuarioData, setUsuarioData] = useState(null);
  const [novaSkill, setNovaSkill] = useState({
    level: 0,
    skills: {
      id: 0,
    },
  });
  const [editarSkillId, setEditingSkillId] = useState(null);
  const [editarLevel, setEditingLevel] = useState(false);
  const [novoLevel, setNewLevel] = useState();
  const theme = useTheme();

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleAdicionarSkill = async () => {
    const token = localStorage.getItem("token");
    const idUsuario = localStorage.getItem("idUsuario");

    try {
      await api.post(`/skillsUsuario`, novaSkill, {
        headers: {
          Authorization: `${token}`,
        },
      });

      const updatedUsuarioData = await api.get(`/usuarios/${idUsuario}`, {
        headers: {
          Authorization: `${token}`,
        },
      });

      setUsuarioData(updatedUsuarioData.data);

      setNovaSkill({
        level: 0,
        skills: {
          id: 0,
        },
      });

      handleCloseModal();
    } catch (error) {
      console.error("Erro ao adicionar a nova habilidade:", error);
    }
  };

  const handleEditarLevel = (skillId) => {
    setEditingSkillId(skillId);
    setEditingLevel(true);
    setNewLevel(usuarioData.skills.find((skill) => skill.id === skillId).level);
  };

  const handleConfirmarEdicao = async () => {
    await handleUpdateSkillLevel(editarSkillId, novoLevel);
    setEditingLevel(false);
    setEditingSkillId(null);
  };

  const handleCancelarEdicao = () => {
    setEditingLevel(false);
    setEditingSkillId(null);
    setNewLevel(
      usuarioData.skills.find((skill) => skill.id === editarSkillId).level
    );
  };

  const handleChangeLevel = (e) => {
    setNewLevel(e.target.value);
  };

  const handleUpdateSkillLevel = async (skillId, novoLevel) => {
    const token = localStorage.getItem("token");

    try {
      const updatedUserData = { ...usuarioData };
      const updatedSkills = updatedUserData.skills.map((skill) => {
        if (skill.id === skillId) {
          return { ...skill, level: novoLevel };
        }
        return skill;
      });
      updatedUserData.skills = updatedSkills;
      setUsuarioData(updatedUserData);

      await api.put(
        `/skillsUsuario/${skillId}`,
        { level: novoLevel },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Erro ao atualizar o nível da habilidade:", error);
    }
  };

  const showConfirmacaoDelete = (skillId) => {
    setSkillDelete(skillId);
    setShowDeleteAlert(true);
  };

  const closeDeleteAlert = () => {
    setShowDeleteAlert(false);
    setSkillDelete(null);
  };

  const confirmDeleteSkill = async () => {
    await handleDeleteSkill(skillDelete);
    closeDeleteAlert();
  };

  const handleDeleteSkill = async (skillId) => {
    const token = localStorage.getItem("token");
    const idUsuario = localStorage.getItem("idUsuario");

    try {
      await api.delete(`/skillsUsuario/${skillId}`, {
        headers: {
          Authorization: `${token}`,
        },
      });

      const updatedUserData = await api.get(`/usuarios/${idUsuario}`, {
        headers: {
          Authorization: `${token}`,
        },
      });

      setUsuarioData(updatedUserData.data);
    } catch (error) {
      console.error("Erro ao excluir a skill:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const idUsuario = localStorage.getItem("idUsuario");

      if (!token || !idUsuario) {
        console.error("Token ou ID do usuário ausentes.");
        return;
      }

      try {
        const response = await api.get(`/usuarios/${idUsuario}`, {
          headers: {
            Authorization: `${token}`,
          },
        });

        setUsuarioData(response.data);
      } catch (error) {
        console.error("Erro ao obter dados do usuário:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container className="d-flex flex-column align-items-center vh-100" style={{ backgroundColor: theme.cinzaClaro, minWidth: "100%" }}>
      <Table
        striped
        bordered
        hover
        size="sm"
        responsive
        className="w-100 overflow-auto mt-5 align-items-center"
      >
        <thead>
          <tr>
            {usuarioData && (
              <th
                colSpan="5"
                className="text-center"
                style={{ fontSize: "24px", position: "relative", backgroundColor:theme.preto, color: theme.branco }}
              >
                Lista de Skills de {usuarioData.nome}
                <div
                  style={{
                    position: "absolute",
                    right: 15,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: theme.verde,
                  }}
                >
                  <FaCirclePlus size={30} onClick={handleShowModal} />
                </div>
              </th>
            )}
          </tr>
          <tr>
            <th
              className="text-center"
              style={{ fontSize: "16px", maxWidth: "75px", backgroundColor: theme.branco, color: theme.preto }}
            >
              Imagem
            </th>
            <th
              className="text-center"
              style={{ fontSize: "16px", minWidth: "200px", maxWidth: "205px", backgroundColor: theme.branco, color: theme.preto }}
            >
              Nome
            </th>
            <th
              className="text-center"
              style={{ fontSize: "16px", minWidth: "700px", maxWidth: "750px", backgroundColor: theme.branco, color: theme.preto }}
            >
              Descrição
            </th>
            <th
              className="text-center"
              style={{ fontSize: "16px", minWidth: "75px", maxWidth: "100px", backgroundColor: theme.branco, color: theme.preto }}
            >
              Nível
            </th>
            <th
              className="text-center align-items-center"
              style={{ fontSize: "16px", minWidth: "50px", backgroundColor: theme.branco, color: theme.preto }}
            >
              Ação
            </th>
          </tr>
        </thead>
        <tbody className="text-center">
          {usuarioData &&
            usuarioData.skills.map((skill) => (
              <tr key={skill.id}>
                <td>
                  <Image
                    src={skill.skills.imagem}
                    alt={skill.skills.nome}
                    fluid
                    style={{ width: "75px", height: "40px" }}
                  />
                </td>
                <td>{skill.skills.nome}</td>
                <td>{skill.skills.descricao}</td>
                <td>
                  {editarLevel && editarSkillId === skill.id ? (
                    <div className="d-flex align-items-center">
                      <Form.Control
                        type="number"
                        value={novoLevel}
                        onChange={handleChangeLevel}
                        style={{ width: "50px", marginRight: "5px" }}
                      />
                      <IoCheckmarkSharp
                        size={17}
                        onClick={handleConfirmarEdicao}
                        style={{ cursor: "pointer", marginRight: "5px" }}
                      />
                      <IoCloseOutline
                        size={17}
                        onClick={handleCancelarEdicao}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  ) : (
                    <div className="d-flex justify-content-around align-items-center">
                      <span>{skill.level}</span>
                      <BsPencil
                        size={12}
                        onClick={() => handleEditarLevel(skill.id)}
                        style={{ cursor: "pointer", marginLeft: "5px" }}
                      />
                    </div>
                  )}
                </td>

                <td style={{ color: "red", paddingLeft: "11px" }}>
                  <IoTrashBinSharp
                    size={25}
                    onClick={() => showConfirmacaoDelete(skill.id)}
                  />
                  {showDeleteAlert && skill.id === skillDelete && (
                    <Alert show={true} variant="danger" className="mt-2">
                      <Alert.Heading style={{ fontSize: "10px" }}>
                        Tem certeza que deseja deletar?
                      </Alert.Heading>
                      <div className="d-flex justify-content-end">
                        <IoCloseOutline
                          size={15}
                          style={{ cursor: "pointer", marginRight: "10px" }}
                          onClick={closeDeleteAlert}
                        />
                        <IoCheckmarkSharp
                          size={15}
                          style={{ cursor: "pointer" }}
                          onClick={confirmDeleteSkill}
                        />
                      </div>
                    </Alert>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      <SkillModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        handleAdicionarSkill={handleAdicionarSkill}
        novaSkill={novaSkill}
        setNovaSkill={setNovaSkill}
        usuarioSkills={
          usuarioData ? usuarioData.skills.map((skill) => skill.skills.id) : []
        }
      />
    </Container>
  );
};

export default Home;
