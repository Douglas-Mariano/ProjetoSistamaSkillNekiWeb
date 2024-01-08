# SistemaSkill - Frontend Web (React)

Este é um projeto React que implementa funcionalidades de login, cadastro e gerenciamento de skills. O aplicativo se comunica com o backend Spring Boot para realizar as operações necessárias.

## Funcionalidades Implementadas

### 1. Tela de Login

- **Campo de Login**
- **Campo de Senha**
- **Botão de Visualizar Senha**
- **Checkbox de Gravar Senha**
  - Ao marcar, armazenar no storage para preenchimento automático no próximo acesso. Ao desmarcar, limpar o storage.
- **Botão de Entrar**
  - Chama o endpoint de login.
  - Redireciona para a tela Home em caso de login correto.
- **Botão de Cadastrar-se**

### 2. Tela de Cadastrar-se

- **Campo de Login**
- **Campo de Senha**
- **Campo de Confirmar Senha**
- **Botões para Visualizar Senhas**
- **Botão de Salvar**
  - Valida se Senha e Confirmar Senha são iguais.
  - Chama o endpoint de cadastro.
  - Exibe mensagem de cadastro realizado com sucesso.

### 3. Tela Home

- **Lista de Skills do Usuário**
  - Imagem (URL), nome da skill, level (versão) e descrição.
  - Edição de level na própria lista.
  - Botão para excluir a skill da lista.
- **Botão de Adicionar Skill**
  - Abre uma modal de cadastro com uma combo para escolher a skill, botões de salvar e cancelar.
- **Botão de Logout**
