/// <reference types="cypress" />

const Leite = require('leite') //Esse pacote é um gerador de dados aleatórios brasileiros
const generator = require('random-password'); //Esse pacote é um gerador de senha aleatório

describe('Cenários dos usuários', () => {

  //Classes e variáveis
  const leite = new Leite()

  const backUrl = Cypress.env('backUrl')

  //Variaveis de criação do usuário
  var nome = leite.pessoa.nome() //Nome do usuário
  var email = leite.pessoa.email() //Email do usuário
  var admin = Math.random() < 0.5 //Gera um booleano aleatório entre verdadeiro ou falso (0 ou 1)
  var password = generator(10) //Senha do usuário
  var idUsuario

  //Variáveis de edição do usuário
  var nomeAlterado = leite.pessoa.nome() //Nome do usuário alterado
  var emailAlterado = leite.pessoa.email() //Email do usuário alterado
  var passwordAlterado = generator(10) //Senha do usuário alterado

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
    //Realiza a chamada do serviço de busca dos usuários
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

  it('Caminho feliz - Editar usuário', () => {
    //Realiza a chamada do serviço de edição dos usuários
    cy.request({
      method: 'PUT',
      url: backUrl+'/usuarios/'+idUsuario,
      body: {
        nome: nomeAlterado,
        email: emailAlterado,
        password: passwordAlterado,
        administrador: `${admin}`
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
      url: backUrl+'/usuarios/'+idUsuario
    }).then((excluiUsuariosResponse) => {
      
      //Verifica o retorno do serviço
      expect(excluiUsuariosResponse.status).to.equal(200)
      expect(excluiUsuariosResponse.body.message).to.have.string('Registro excluído com sucesso')
    })
  })
})