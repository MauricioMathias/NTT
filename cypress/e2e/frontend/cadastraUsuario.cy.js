/// <reference types="cypress" />

const Leite = require('leite') //Esse pacote é um gerador de dados aleatórios brasileiros
const generator = require('random-password'); //Esse pacote é um gerador de senha aleatório

describe('Cenário de Cadastro do usuário', () => {

    const leite = new Leite()

    it('Caminho feliz - Cadastra usuário', () => {
        //Vai para a página inicial da aplicação
        cy.visit(Cypress.env('frontUrl'))

        cy.get('[data-testid="cadastrar"]').click() //Clica no botão "cadastrar"

        cy.get('[data-testid="nome"]').type(leite.pessoa.nome()) //Preenche o nome
        cy.get('[data-testid="email"]').type(leite.pessoa.email()) //Preenche o email
        cy.get('[data-testid="password"]').type(generator(10), {log: false}) //Preenche senha

        cy.get('[data-testid="cadastrar"]').click() //Clica no botão cadastrar para finalzar o processo

        cy.contains('Cadastro realizado com sucesso') //Verifica a mensagem de retorno
    })
})