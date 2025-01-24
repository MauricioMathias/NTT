/// <reference types="cypress" />

const Leite = require('leite') //Esse pacote é um gerador de dados aleatórios brasileiros

describe('Cenário dos usuários', () => {

  //Classes e variáveis
  const leite = new Leite()

  const backUrl = Cypress.env('backUrl')
  var nome = leite.pessoa.nome() //Nome do usuário
  var email = leite.pessoa.email() //Email do usuário
  var admin = Math.random() < 0.5 //Gera um booleano aleatório entre verdadeiro ou falso (0 ou 1)
  var password = 'teste' //Senha do usuário
  var idUsuario


  it('Caminho feliz - Cadastro de usuário', () => {
    //Realiza a chamada do serviço de criação dos usuários
    cy.request({
      method: 'POST',
      url: backUrl+'/usuarios',
      body: {
        nome: nome,
        email: email,
        password: password,
        administrador: `${admin}`
      }
    }).then((cadastroUsuariosResponse) => {
      idUsuario= cadastroUsuariosResponse.body._id
      
      //Verifica o retorno do serviço
      expect(cadastroUsuariosResponse.status).to.equal(201)
      expect(cadastroUsuariosResponse.body.message).to.have.string('Cadastro realizado com sucesso')
      expect(cadastroUsuariosResponse.body._id).to.be.a('string')
    })
  })

  it('Caminho feliz - Busca de usuário por ID', () => {
    //Realiza a chamada do serviço de criação dos usuários
    cy.request({
      method: 'GET',
      url: backUrl+'/usuarios/'+idUsuario
    }).then((buscaUsuariosResponse) => {
      
      //Verifica o retorno do serviço
      expect(buscaUsuariosResponse.status).to.equal(200)
      expect(buscaUsuariosResponse.body.nome).to.have.string(nome)
      expect(buscaUsuariosResponse.body.email).to.have.string(email)
      expect(buscaUsuariosResponse.body.password).to.have.string(password)
      expect(buscaUsuariosResponse.body.administrador).to.have.string(admin)
      expect(buscaUsuariosResponse.body._id).to.exist
    })
  })
})