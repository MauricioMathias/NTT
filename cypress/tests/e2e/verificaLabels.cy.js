/// <reference types="cypress" />

describe('Cenário de verificação de Labels', () => {

    //Classes e variáveis
    const backUrl = Cypress.env('backUrl')
    
    var nome //Nome do usuario
    var email //Email do usuário
    var password //Senha do usuário

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
                
            }
            else if (usuarioAleatorio.administrador == 'false'){
              buscaUsuarioAdmin()
            }
          })
        }
        buscaUsuarioAdmin()
      })

    it('Caminho feliz - Verifica Labels, tela inicial', () => {

       
        //Vai para a página inicial da aplicação
        cy.visit('')

        cy.get('[data-testid="email"]').type(email) //Escreve o email
        cy.get('[data-testid="senha"]').type(password, {log: false}) //Escreve a senha

        cy.get('[data-testid="entrar"]').click() //Clica no enter para entrar na aplicação

        //Verifica os labels do header da página
        cy.get('[data-testid="home"]').should('have.text', 'Home')
        cy.get('[data-testid="cadastrar-usuarios"]').should('have.text', 'Cadastrar Usuários')
        cy.get('[data-testid="listar-usuarios"]').should('have.text', 'Listar Usuários')
        cy.get('[data-testid="cadastrar-produtos"]').should('have.text', 'Cadastrar Produtos')
        cy.get('[data-testid="listar-produtos"]').should('have.text', 'Listar Produtos')
        cy.get('[data-testid="link-relatorios"]').should('have.text', 'Relatórios')
        cy.get('[data-testid="logout"]').should('have.text', 'Logout')

        //Verifica os labels do corpo da página
        cy.get('h1').should('have.text', 'Bem Vindo  ' + nome) //Verifica se foi pra página inicial da aplicação, através da mensagem de bem vindo
        cy.get('.lead').should('have.text', 'Este é seu sistema para administrar seu ecommerce.') //Verifica a frase abaixo da mensagem de bem vindo
        //Verifica o cartao de cadastro de usuário
        cy.get(':nth-child(2) > .card > .card-body > .card-title').should('have.text', 'Cadastrar Usuários')
        cy.get(':nth-child(2) > .card > .card-body > .card-text').should('have.text', 'Funcionalidade de cadastro de usuários para ter acesso ao ecommerce.')
        cy.get('[data-testid="cadastrarUsuarios"]').should('have.text', 'Cadastrar')
        //Verifica o cartao da lista de usuários
        cy.get(':nth-child(3) > .card > .card-body > .card-title').should('have.text', 'Listar Usuários')
        cy.get(':nth-child(3) > .card > .card-body > .card-text').should('have.text', 'Funcionalidade de listagem de usuários que estão cadastrados.')
        cy.get('[data-testid="listarUsuarios"]').should('have.text', 'Listar')
        //Verifica o cartao de cadastro dos produtos
        cy.get(':nth-child(4) > .card > .card-body > .card-title').should('have.text', 'Cadastrar Produtos')
        cy.get(':nth-child(4) > .card > .card-body > .card-text').should('have.text', 'Funcionalidade de cadastro de produtos para ser utilizado no ecommerce.')
        cy.get('[data-testid="cadastrarProdutos"]').should('have.text', 'Cadastrar')
        //Verifica o cartao de listagem de produtos
        cy.get(':nth-child(5) > .card > .card-body > .card-title').should('have.text', 'Listar Produtos')
        cy.get(':nth-child(5) > .card > .card-body > .card-text').should('have.text', 'Funcionalidade de listagem de produtos que estão cadastrados.')
        cy.get('[data-testid="listarProdutos"]').should('have.text', 'Listar')
        //Verifica o cartao de cadastro dos relatórios
        cy.get(':nth-child(6) > .card > .card-body > .card-title').should('have.text', 'Relatórios')
        cy.get(':nth-child(6) > .card > .card-body > .card-text').should('have.text', 'Funcionalidade de relatórios gerais do sistema de ecommerce.')
        cy.get('[data-testid="relatorios"]').should('have.text', 'Ver')
    })
})