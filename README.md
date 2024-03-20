# Projeto feito para o Desafio Final do Bootcamp em Node do MBA em Desenvolvimento FullStack da XP Educação.

## Data da entrega: 09/02/2024


### API desenvolvida em Node.js com Express, Mongoose, Sequelize, Winston e Eslint.

### Para os testes foi usado o Jest e Supertest.

### Para o banco de dados foi usado o PostgreSQL no ElephantSQL e o MongoDB no MongoDB Cloud.

### A API conta com autenticação Basic Auth, para testar use:

  1- Para administrador (acesso total):
    username: admin
    password: desafio

  2- Para cliente:
    username: fernando@email.com
    password: 12345678

    Pode ser utilizado qualquer cliente cadastrado.
    Os cliente só tem acesso para:
      - Atualização de seus dados.
      - Consultar os livros cadastrados.
      - Consultar um livro em específico.
      - Consultar os livros cadastrados de um autor em específico.
      - Cadastrar uma avaliação.
      - Cadastrar uma venda (como se ele estivesse efetuando uma compra).
      - Consultar as suas compras.

### Foi criado um CI/CD com o GitHub Actions para criação de uma imagem Docker e feito o deploy dessa imagem no Render.


#### Link para a documentação: https://documenter.getpostman.com/view/25627884/2sA358e68p