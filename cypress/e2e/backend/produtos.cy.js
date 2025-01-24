/// <reference types="cypress" />

const generator = require('random-password'); //Esse pacote é um gerador de senha aleatório

describe('Cenário dos produtos', () => {

  //Classes e variáveis
  const backUrl = Cypress.env('backUrl')

  //Decidi deixar o nome e descrição dos produtos como um gerador de senha aleatório
  //Isso porque o gerador de senha gera vários caracteres aleatórios
  //Fica melhor para simular qualquer caractere sendo adicionado por um usuário ao produto

  //Variaveis de criação do produto
  var nome = generator(10) //Nome do produto
  var preco = cy.numeroAleatorio(0,1001) //Preço do produto
  var descricao = generator(10) //Descrição do produto
  var quantidade = cy.numeroAleatorio(0,1001) //Quantidade disponível do produto
  var idProduto

  //Variáveis de edição do produto
  var nomeAlterado = leite.pessoa.nome() //Nome do produto alterado
  var precoAlterado = leite.pessoa.email() //Email do produto alterado
  var descricaolterado = generator(10) //Senha do produto alterado

  it('Caminho feliz - Cadastro de produto', () => {
    //Realiza a chamada do serviço de criação dos produtos
    cy.request({
      method: 'POST',
      url: backUrl+'/produtos',
      body: {
        nome: nome,
        preco: preco,
        descricao: descricao,
        quantidade: quantidade
      }
    }).then((cadastroProdutosResponse) => {
        idProduto= cadastroProdutosResponse.body._id
      
      //Verifica o retorno do serviço
      expect(cadastroProdutosResponse.status).to.equal(201)
      expect(cadastroProdutosResponse.body.message).to.have.string('Cadastro realizado com sucesso')
      expect(cadastroProdutosResponse.body._id).to.be.a('string')
    })
  })
})