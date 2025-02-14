/// <reference types="cypress" />

describe('Cenário de Login', () => {

  beforeEach(() => {
    cy.buscaUsuario().as('usuario')

    //Vai para a página inicial da aplicação
    cy.visit(Cypress.env('frontUrl'))
  })

  it('Caminho feliz - Realiza login', () => {
    cy.get('@usuario').then((usr) =>{

      cy.get('[data-testid="email"]').type(usr.email) //Escreve o email
      cy.get('[data-testid="senha"]').type(usr.password, {log: false}) //Escreve a senha

      cy.get('[data-testid="entrar"]').click() //Clica no enter para entrar na aplicação

      //Faz a distinção se é admin ou não, e verifica o login correto

      if (usr.administrador == 'false') {
          cy.contains('Serverest Store') //Verifica se foi pra página inicial da aplicação
          cy.url().should('contain', '/home')

          //Precisa realizar as verificaçoes dos usuarios comuns
      }
      else if (usr.administrador == 'true') {
          cy.contains('Bem Vindo ' + usr.nome) //Verifica se foi pra página inicial da aplicação
          cy.url().should('contain', '/admin/home')

          //Verifica os labels do header da página
          cy.get('[data-testid="home"]').should('have.text', 'Home')
          cy.get('[data-testid="cadastrar-usuarios"]').should('have.text', 'Cadastrar Usuários')
          cy.get('[data-testid="listar-usuarios"]').should('have.text', 'Listar Usuários')
          cy.get('[data-testid="cadastrar-produtos"]').should('have.text', 'Cadastrar Produtos')
          cy.get('[data-testid="listar-produtos"]').should('have.text', 'Listar Produtos')
          cy.get('[data-testid="link-relatorios"]').should('have.text', 'Relatórios')
          cy.get('[data-testid="logout"]').should('have.text', 'Logout')

      }       
    })
  })

  it('Fluxo de exceção - Login incorreto', () => {

    cy.get('[data-testid="email"]').type('teste@gmail.com') //Escreve o email
    cy.get('[data-testid="senha"]').type('senhaTeste') //Escreve a senha

    cy.get('[data-testid="entrar"]').click() //Clica no enter para entrar na aplicação

    cy.contains('Email e/ou senha inválidos') //Verifica o retorno para usuário e senha inválidos

  })
})