/// <reference types="cypress" />

const generator = require('random-password'); //Esse pacote é um gerador de senha aleatório

describe('Cenários dos produtos', () => {

  //Classes e variáveis
  const backUrl = Cypress.env('backUrl')
  var token

  //Decidi deixar o nome e descrição dos produtos como um gerador de senha aleatório
  //Isso porque o gerador de senha gera vários caracteres aleatórios
  //Fica bom para simular qualquer caractere sendo adicionado por um usuário ao produto

  //Variaveis de criação do produto
  var nome = generator(10) //Nome do produto
  var descricao = generator(10) //Descrição do produto
  var preco = 300
  var quantidade = 500
  var produto
  var produtosArray

  //Variáveis de edição do produto
  var nomeAlterado = generator(10) //Nome do produto alterado
  var descricaolterado = generator(10) //Senha do produto alterado

  it('Login para buscar o token', () => {
    //Realiza o login pra buscar o token 
    cy.login().then((loginResponse) => {

      token = loginResponse
    })
  })

  it('Fluxo de excessão - Cadastro de produto', () => {
    
    //Realiza a chamada do serviço de criação dos produtos
    cy.request({
      method: 'POST',
      url: backUrl+'/produtos',
      auth: {
        bearer: token
      },
      body: {
        nome: nome,
        preco: preco,
        descricao: descricao,
        quantidade: quantidade
      },
      failOnStatusCode: false
    }).then((cadastroProdutosResponse) => {
      
      //Verifica o retorno do serviço
      expect(cadastroProdutosResponse.status).to.equal(401)
      expect(cadastroProdutosResponse.body.message).to.have.string('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
    })
  })

  it('Caminho feliz - Listar produtos', () => {
    
    //Realiza a chamada do serviço de listagem dos produtos
    cy.request({
      method: 'GET',
      url: backUrl+'/produtos'
    }).then((listarrodutosResponse) => {

      produtosArray = listarrodutosResponse.body.produtos
      produto = produtosArray[Math.floor(Math.random()*produtosArray.length)]
      
      //Verifica o retorno do serviço
      expect(listarrodutosResponse.status).to.equal(200)
      expect(listarrodutosResponse.body.quantidade).to.exist
      expect(produto).to.have.keys('descricao', 'nome', 'preco', 'quantidade', '_id')
    })
  })
})