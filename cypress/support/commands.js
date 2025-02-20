// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('buscaUsuario', () => {

    //Busca usuários
    cy.request({
        method: 'GET',
        url: Cypress.env('backUrl')+'/usuarios'
      }).then((getUsuariosResponse) => {
        var listaUsuarios = getUsuariosResponse.body.usuarios //Retorna o array dos usuários
        var usuarioAleatorio = listaUsuarios[Math.floor(Math.random()*listaUsuarios.length)] // Busca um usuário aleatório dentro do array

        return usuarioAleatorio
    })
})

//Função para realizar login
Cypress.Commands.add('getToken', () => {

    //Busca usuários
    cy.request({
        method: 'GET',
        url: Cypress.env('backUrl')+'/usuarios'
      }).then((getUsuariosResponse) => {

        var listaUsuarios = getUsuariosResponse.body.usuarios //Retorna o array dos usuários
        var usuarioAleatorio = listaUsuarios[Math.floor(Math.random()*listaUsuarios.length)] // Busca um usuário aleatório dentro do array

        //Realiza o login
        cy.request({
            method: 'POST',
            url: Cypress.env('backUrl')+'/login',
            body:{
                email: usuarioAleatorio.email,
                password: usuarioAleatorio.password
            }
        }).then((loginResponse) => {
            const token = (loginResponse.body.authorization).replace("Bearer", "")

            return token
        })
    })
})
