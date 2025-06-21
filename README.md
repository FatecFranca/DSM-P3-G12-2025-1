# DSM-P3-G12-2025-1
Repositório do GRUPO 12 do Projeto Interdisciplinar do 3º semestre DSM 2025/1. Aluno: José Gabriel Galvão Amorim.

# Biblioteca API REST

API REST para gerenciamento de dados de uma biblioteca, construída em Node.js utilizando Prisma como ORM para MongoDB.

---

## Sobre o projeto

Este projeto é uma API REST que permite a gestão dos dados essenciais de uma biblioteca, contemplando informações de livros, categorias, usuários e empréstimos. A API foi desenvolvida utilizando o Prisma como ferramenta ORM para interagir com o banco de dados NoSQL MongoDB, garantindo eficiência e flexibilidade nas operações.

---

## Arquitetura e Modelagem

A API foi estruturada considerando os seguintes relacionamentos principais entre as entidades, de acordo com o modelo NoAM:

| Entidades          | Tipo de Relacionamento | Descrição                                                   |
|--------------------|-----------------------|-------------------------------------------------------------|
| **Livros → Categorias** | Associação (1:N)       | Cada livro pertence a uma única categoria. Uma categoria pode ter muitos livros. O campo `id_categoria` no documento do livro referencia a categoria. |
| **Livros → Empréstimos** | Associação (1:N)       | Um livro pode ter vários empréstimos registrados. Cada empréstimo refere-se a um único livro. Referenciado pelo campo `id_livro` no empréstimo. |
| **Usuários → Empréstimos** | Associação (1:N)       | Um usuário pode realizar vários empréstimos, cada empréstimo pertence a apenas um usuário. Referenciado pelo campo `id_usuario` no empréstimo. |

Essa modelagem garante integridade e facilidade de consulta, aproveitando o modelo de documentos do MongoDB.

---

## Tecnologias utilizadas

- **Node.js**  
- **Prisma ORM** (com suporte a MongoDB)  
- **MongoDB Atlas** (banco de dados na nuvem)  
- **Express.js** (framework para criação da API REST)  
- **Dotenv** (para configuração de variáveis de ambiente)  

---

## Endpoints principais

A API contempla as seguintes rotas para cada entidade (exemplos):

- `/livros`  
- `/categorias`  
- `/usuarios`  
- `/emprestimos`  

Cada uma delas suporta operações CRUD básicas: criação, leitura, atualização e exclusão de dados.

---
