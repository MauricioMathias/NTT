/// <reference types="cypress" />

describe('Cenário de Login', () => {

  //Classes e variáveis
  const frontUrl = Cypress.env('frontUrl')

  //Variaveis de criação do usuário
  var nome //Nome do usuario
  var email //Email do usuário
  var password //Senha do usuário
  var admin //Variavel de flag administradora

  it('Busca o usuario e senha', () => {
    //Realiza a busca de um usuário e senha válidos
    cy.buscaUsuario().then((buscaUsuarioResponse) => {
      nome = buscaUsuarioResponse.nome
      email = buscaUsuarioResponse.email
      password = buscaUsuarioResponse.password
      admin = buscaUsuarioResponse.administrador
    })
  })

  it('Caminho feliz - Realiza login', () => {
    //Vai para a página inicial da aplicação
    cy.visit(frontUrl)

    cy.get('[data-testid="email"]').type(email) //Escreve o email
    cy.get('[data-testid="senha"]').type(password) //Escreve a senha

    cy.get('[data-testid="entrar"]').click() //Clica no enter para entrar na aplicação

    //Faz a distinção se é admin ou não, e verifica o login correto

    if (admin == false) {
        cy.contains('Serverest Store') //Verifica se foi pra página inicial da aplicação
    }
    else if (admin == true) {
        cy.contains('Bem Vindo ' + nome) //Verifica se foi pra página inicial da aplicação
    }
    cy.get('[data-testid="logout"]').click() //E desloga da aplicação
    cy.contains('Login') //E verifica se foi pra página inicial do login

  })
})