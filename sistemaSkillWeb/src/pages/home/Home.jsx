import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { useState, useEffect } from "react";
import { api } from "../../api/api";
import SkillModal from "../../components/SkillModal";
import { IoTrashBinSharp } from "react-icons/io5";
import { BsFileArrowUp, BsFileArrowDown } from "react-icons/bs";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [usuarioData, setUsuarioData] = useState(null);
  const [novaSkill, setNovaSkill] = useState({
    level: 0,
    skills: {
      id: 0,
    },
  });

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

      console.log("Nova habilidade adicionada com sucesso.");

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

  const handleUpdateSkillLevel = async (skillId, newLevel) => {
    const token = localStorage.getItem("token");

    try {
      const updatedUserData = { ...usuarioData };
      const updatedSkills = updatedUserData.skills.map((skill) => {
        if (skill.id === skillId) {
          return { ...skill, level: newLevel };
        }
        return skill;
      });
      updatedUserData.skills = updatedSkills;
      setUsuarioData(updatedUserData);

      await api.put(
        `/skillsUsuario/${skillId}`,
        { level: newLevel },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      console.log("Nível da habilidade atualizado com sucesso.");
    } catch (error) {
      console.error("Erro ao atualizar o nível da habilidade:", error);
    }
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

      console.log("Habilidade excluída com sucesso.");

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
    <Container className="d-flex flex-column align-items-start vh-100">
      {usuarioData && (
        <div className="d-flex flex-column mt-3">
          <div className="mb-2">
            <h4>Olá, {usuarioData.nome}!</h4>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <p className="mb-0">Gostaria de adicionar uma nova skill?</p>
            <Button
              className="btn btn-sm btn-primary"
              onClick={handleShowModal}
            >
              Clique aqui
            </Button>
          </div>
        </div>
      )}
      
      <Table
        striped
        bordered
        hover
        responsive
        size="sm"
        variant="secondary"
        className="w-100 overflow-auto mt-5"
      >
        <thead>
          <tr>
            <th
              colSpan="5"
              className="text-center"
              style={{ fontSize: "24px" }}
            >
              Lista de Skills
            </th>
          </tr>
          <tr>
            <th className="text-center" style={{ fontSize: "16px", minWidth: "300px" }}>
              Imagem
            </th>
            <th className="text-center" style={{ fontSize: "16px", minWidth: "250px" }}>
              Nome
            </th>
            <th className="text-center" style={{ fontSize: "16px", minWidth: "600px" }}>
              Descrição
            </th>
            <th className="text-center" style={{ fontSize: "16px", minWidth: "75px" }}>
              Nivel
            </th>
            <th className="text-center" style={{ fontSize: "16px", minWidth: "50px" }}>
              Ação
            </th>
          </tr>
        </thead>
        <tbody className="text-center">
          {usuarioData &&
            usuarioData.skills.map((skill) => (
              <tr key={skill.id}>
                <td>{/* Imagem */}</td>
                <td>{skill.skills.nome}</td>
                <td>{skill.skills.descricao}</td>
                <td className="d-flex justify-content-between align-items-center">
                  <BsFileArrowUp
                    onClick={() =>
                      handleUpdateSkillLevel(skill.id, skill.level + 1)
                    }
                    size={25}
                  />
                  <span>{skill.level}</span>
                  <BsFileArrowDown
                    onClick={() =>
                      handleUpdateSkillLevel(skill.id, skill.level - 1)
                    }
                    size={25}
                  />
                </td>
                <td style={{ color: "red", paddingLeft: "11px" }}>
                  <IoTrashBinSharp
                    size={25}
                    onClick={() => handleDeleteSkill(skill.id)}
                  />
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
