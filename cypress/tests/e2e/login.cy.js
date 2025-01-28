/// <reference types="cypress" />

describe('Cenário de Login', () => {

  //Classes e variáveis    
  const backUrl = Cypress.env('backUrl')
  
  var nome //Nome do usuario
  var email //Email do usuário
  var password //Senha do usuário
  var admin //Variavel de flag administradora

  before('Busca usuário', () => {
    function buscaUsuarioAdmin() {
    //Busca usuários
      cy.request({
        method: 'GET',
        url: backUrl+'/usuarios'
      }).then((getUsuariosResponse) => {

        var listaUsuarios = getUsuariosResponse.body.usuarios //Retorna o array dos usuários

        var usuarioAleatorio = listaUsuarios[Math.floor(Math.random()*listaUsuarios.length)] // Busca um usuário aleatório dentro do array

        if (usuarioAleatorio.administrador == 'true') {

          nome = usuarioAleatorio.nome
          email = usuarioAleatorio.email
          password = usuarioAleatorio.password
          admin = usuarioAleatorio.administrador
            
        }
        else if (usuarioAleatorio.administrador == 'false'){
          buscaUsuarioAdmin()
        }
      })
    }
    buscaUsuarioAdmin()
  })

  it('Caminho feliz - Realiza login', () => {

        //Vai para a página inicial da aplicação
        cy.visit('')

        cy.get('[data-testid="email"]').type(email) //Escreve o email
        cy.get('[data-testid="senha"]').type(password, {log: false}) //Escreve a senha

        cy.get('[data-testid="entrar"]').click() //Clica no enter para entrar na aplicação

        //Faz a distinção se é admin ou não, e verifica o login correto

        if (admin == 'false') {
            cy.contains('Serverest Store') //Verifica se foi pra página inicial da aplicação
        }
        else if (admin == 'true') {
            cy.contains('Bem Vindo ' + nome) //Verifica se foi pra página inicial da aplicação
        }
        cy.get('[data-testid="logout"]').click() //E desloga da aplicação
        cy.contains('Login') //E verifica se foi pra página inicial do login
  })

  it('Fluxo de exceção - Login incorreto', () => {
    //Vai para a página inicial da aplicação
    cy.visit('')

    cy.get('[data-testid="email"]').type('teste@gmail.com') //Escreve o email
    cy.get('[data-testid="senha"]').type('senhaTeste') //Escreve a senha

    cy.get('[data-testid="entrar"]').click() //Clica no enter para entrar na aplicação

    cy.get('.alert > :nth-child(2)').contains('Email e/ou senha inválidos') //Verifica o retorno para usuário e senha inválidos

  })
})