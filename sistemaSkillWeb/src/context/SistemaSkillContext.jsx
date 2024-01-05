import { createContext, useState } from "react";

export const SistemaSkillContext = createContext({})

export const SkillProvider = ({children}) => {
    const [nome, setNome] = useState('')
    const [login, setLogin] = useState('')
    const [senha, setSenha] = useState('')

    const [skill, setSkill] = useState('')
    const [descricao, setDescricao] = useState('')
    const [imagem, setImagem] = useState('')

    const [level, setLevel] = useState(0)

    const [usuarioLogado, setUsuarioLogado] = useState({})

    return(
        <SistemaSkillContext.Provider value={{
            nome, setNome, login, setLogin, senha, setSenha, skill, setSkill, descricao, setDescricao, imagem, setImagem, level, setLevel, usuarioLogado, setUsuarioLogado
        }}>{children}</SistemaSkillContext.Provider>
    )
}