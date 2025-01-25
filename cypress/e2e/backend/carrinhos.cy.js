/// <reference types="cypress" />

const generator = require('random-password'); //Esse pacote é um gerador de senha aleatório

describe('Cenário dos produtos', () => {

  //Classes e variáveis
  const backUrl = Cypress.env('backUrl')
  var token

  //Decidi deixar o nome e descrição dos carrinhos como um gerador de senha aleatório
  //Isso porque o gerador de senha gera vários caracteres aleatórios
  //Fica bom para simular qualquer caractere sendo adicionado pelo sistema ao carrinho

  //Variaveis de criação do carrinho
  var idProduto = generator(10) //id do produto
  var idSegundoProduto  = generator(10) //id do segundo produto

  it('Login para buscar o token', () => {
    //Realiza o login pra buscar o token 
    cy.login().then((loginResponse) => {

      token = loginResponse
    })
  })

  it('Fluxo de exceção - Cadastro de carrinho, produto duplicado', () => {
      
    //Realiza a chamada do serviço de cadastro dos carrinhos
    cy.request({
    method: 'POST',
    url: backUrl+'/carrinhos',
    headers: {
        Authorization: `Bearer${token}`,
    },
    body: {
        produtos: [
          {
            idProduto: idProduto,
            quantidade: 100
          },
          {
            idProduto: idProduto,
            quantidade: 200
          }
        ]
      },
    failOnStatusCode: false
    }).then((cadastroProdutosResponse) => {

        expect(cadastroProdutosResponse.status).to.equal(400)
        expect(cadastroProdutosResponse.body.message).to.have.string('Não é permitido possuir produto duplicado')
    })
  })

  it('Fluxo de exceção - Cadastro de carrinho, produto não encontrado', () => {
      
    //Realiza a chamada do serviço de cadastro dos carrinhos
    cy.request({
    method: 'POST',
    url: backUrl+'/carrinhos',
    headers: {
        Authorization: `Bearer${token}`,
    },
    body: {
        produtos: [
          {
            idProduto: idProduto,
            quantidade: 100
          }
        ]
      },
    failOnStatusCode: false
    }).then((cadastroProdutosResponse) => {

        expect(cadastroProdutosResponse.status).to.equal(400)
        expect(cadastroProdutosResponse.body.message).to.have.string('Produto não encontrado')
    })
  })

  it('Fluxo de exceção - Cadastro de carrinho, token não encontrado', () => {
      
    //Realiza a chamada do serviço de cadastro dos carrinhos
    cy.request({
    method: 'POST',
    url: backUrl+'/carrinhos',
    headers: {
        Authorization: 'token de teste',
    },
    body: {
        produtos: [
          {
            idProduto: idProduto,
            quantidade: 100
          }
        ]
      },
    failOnStatusCode: false
    }).then((cadastroProdutosResponse) => {

        expect(cadastroProdutosResponse.status).to.equal(401)
        expect(cadastroProdutosResponse.body.message).to.have.string('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
    })
  })
})