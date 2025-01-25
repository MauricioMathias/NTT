/// <reference types="cypress" />

describe('Cenário de Login', () => {

  //Classes e variáveis
  const frontUrl = Cypress.env('backUrl')

  //Variaveis de criação do usuário
  var email = leite.pessoa.email() //Email do usuário
  var password = generator(10) //Senha do usuário

  it('Busca o usuario e senha', () => {
    //Realiza a busca de um usuário e senha válidos
    cy.buscaUsuario().then((buscaUsuarioResponse) => {

      email = buscaUsuarioResponse.email
      password = buscaUsuarioResponse.password
    })
  })
})