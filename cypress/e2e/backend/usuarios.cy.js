/// <reference types="cypress" />

const Leite = require('leite') //Esse pacote é um gerador de dados aleatórios brasileiros
const generator = require('random-password'); //Esse pacote é um gerador de senha aleatório

describe('Cenário dos usuários', () => {

  const leite = new Leite()

  it.only('Caminho feliz - Cadastro de usuário', () => {
    //Realiza a chamada do serviço de criação dos usuários
    cy.request({
      method: 'POST',
      url: Cypress.env('backUrl')+'/usuarios',
      body: {
        nome: leite.pessoa.nome(),
        email: leite.pessoa.email(),
        password: generator(10),
        administrador: String((Math.random() < 0.5)) //Retorna 50% verdadeiro ou falso para flg administrador
      }
    }).then((cadastroUsuariosResponse) => {
      cy.wrap(cadastroUsuariosResponse).as('dadosUsuario')
      
      //Verifica o retorno do serviço
      expect(cadastroUsuariosResponse.status).to.equal(201)
      expect(cadastroUsuariosResponse.body.message).to.have.string('Cadastro realizado com sucesso')
      expect(cadastroUsuariosResponse.body._id).to.be.a('string')
    })
  })

  it('Caminho feliz - Busca de usuário por ID',  function() {
    cy.log(this.dadosUsuario)
    //Realiza a chamada do serviço de busca dos usuários
    /* cy.request({
      method: 'GET',
      url: Cypress.env('backUrl')+'/usuarios/'+idUsuario
    }).then((buscaUsuariosResponse) => {
      
      //Verifica o retorno do serviço
      expect(buscaUsuariosResponse.status).to.equal(200)
      expect(buscaUsuariosResponse.body.nome).to.have.string(nome)
      expect(buscaUsuariosResponse.body.email).to.have.string(email)
      expect(buscaUsuariosResponse.body.password).to.have.string(password)
      expect(buscaUsuariosResponse.body.administrador).to.have.string(admin)
      expect(buscaUsuariosResponse.body._id).to.exist
    }) */
  })

  it('Caminho feliz - Editar usuário', () => {
    //Realiza a chamada do serviço de edição dos usuários
    cy.request({
      method: 'PUT',
      url: Cypress.env('backUrl')+'/usuarios/'+idUsuario,
      body: {
        nome: leite.pessoa.nome(),
        email: leite.pessoa.email(),
        password: generator(10),
        administrador: String((Math.random() < 0.5)) //Retorna 50% verdadeiro ou falso para flg administrador
      }
    }).then((editaUsuariosResponse) => {
      
      //Verifica o retorno do serviço
      expect(editaUsuariosResponse.status).to.equal(200)
      expect(editaUsuariosResponse.body.message).to.have.string('Registro alterado com sucesso')
    })
  })

  it('Caminho feliz - Excluir usuário', () => {
    //Realiza a chamada do serviço de exclusão dos usuários
    cy.request({
      method: 'DELETE',
      url: Cypress.env('backUrl')+'/usuarios/'+idUsuario
    }).then((excluiUsuariosResponse) => {
      
      //Verifica o retorno do serviço
      expect(excluiUsuariosResponse.status).to.equal(200)
      expect(excluiUsuariosResponse.body.message).to.have.string('Registro excluído com sucesso')
    })
  })
})