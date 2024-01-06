import { createContext, useState } from "react";

export const SistemaSkillContext = createContext({})

export const SkillProvider = ({children}) => {
    const [nome, setNome] = useState('')
    const [login, setLogin] = useState('')
    const [senha, setSenha] = useState('')
    const [email, setEmail] = useState("")

    const [skill, setSkill] = useState('')
    const [descricao, setDescricao] = useState('')
    const [imagem, setImagem] = useState('')

    const [level, setLevel] = useState(0)

    const [usuarioLogado, setUsuarioLogado] = useState({})
    const [mostrarSenha, setMostrarSenha] = useState(false);

    return(
        <SistemaSkillContext.Provider value={{
            nome, setNome, login, setLogin, senha, setSenha, skill, setSkill, descricao, setDescricao, imagem, setImagem, level, setLevel, usuarioLogado, setUsuarioLogado, mostrarSenha, setMostrarSenha, email, setEmail
        }}>{children}</SistemaSkillContext.Provider>
    )
}