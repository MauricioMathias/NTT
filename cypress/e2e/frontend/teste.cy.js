/// <reference types="cypress" />

describe('Cenário de Login', () => {

    //Classes e variáveis
    const frontUrl = Cypress.env('frontUrl')

    var nome //Nome do usuario
    var email //Email do usuário
    var password //Senha do usuário

    it('Caminho feliz - Verifica Labels', () => {

        cy.buscaUsuarioAdmin().then((buscaUsuarioResponse) => {
            cy.log(buscaUsuarioResponse)
            nome = buscaUsuarioResponse.nome
            email = buscaUsuarioResponse.email
            password = buscaUsuarioResponse.password
    
            //Vai para a página inicial da aplicação
            cy.visit(frontUrl)
    
            cy.get('[data-testid="email"]').type(email) //Escreve o email
            cy.get('[data-testid="senha"]').type(password, {log: false}) //Escreve a senha
    
            cy.get('[data-testid="entrar"]').click() //Clica no enter para entrar na aplicação
    
            //Faz a distinção se é admin ou não, e verifica o login correto
            //O ideal é não ter esse tipo de verificação, porém, nesse caso em específico acredito que não seja problemático
            //if (admin == false) {
            //    cy.contains('Serverest Store') //Verifica se foi pra página inicial da aplicação
            //}
            //else if (admin == true) {
                cy.contains('Bem Vindo ' + nome) //Verifica se foi pra página inicial da aplicação

                cy.get('[data-testid="cadastrar-usuarios"]')
            //}
        })
      
    })
})