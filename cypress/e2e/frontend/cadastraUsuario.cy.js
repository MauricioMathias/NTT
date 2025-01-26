/// <reference types="cypress" />

const Leite = require('leite') //Esse pacote é um gerador de dados aleatórios brasileiros
const generator = require('random-password'); //Esse pacote é um gerador de senha aleatório

describe('Cenário de Login', () => {

    //Classes e variáveis
    const leite = new Leite()

    const frontUrl = Cypress.env('frontUrl')

    //Variaveis de criação do usuário
    var nome = leite.pessoa.nome()
    var email = leite.pessoa.email()//Email do usuário
    var password = generator(10)//Senha do usuário

    it('Caminho feliz - Cadastra usuário', () => {
        //Vai para a página inicial da aplicação
        cy.visit(frontUrl)

        cy.get('[data-testid="cadastrar"]').click() //Clica no botão "cadastrar"

        cy.get('[data-testid="nome"]').type(nome) //Preenche o nome
        cy.get('[data-testid="email"]').type(email) //Preenche o email
        cy.get('[data-testid="password"]').type(password, {log: false}) //Preenche senha

        cy.get('[data-testid="cadastrar"]').click() //Clica no botão cadastrar para finalzar o processo

        cy.contains('Cadastro realizado com sucesso') //Verifica a mensagem de retorno
    })
})