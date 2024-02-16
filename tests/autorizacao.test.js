/* eslint-disable no-undef */
import request from 'supertest'
import { server } from '../index.js'
import Autor from '../models/autor.model.js'
import Livro from '../models/livro.model.js'
import Cliente from '../models/cliente.model.js'
import Venda from '../models/venda.model.js'

describe('Testes de integração', () => {
  afterAll(async () => {
    // Limpar os dados inseridos durante o teste
    await Venda.destroy({ where: { data: '2024-02-16' } })
    await Livro.destroy({ where: { nome: 'Livro de Teste' } })
    await Autor.destroy({ where: { nome: 'Autor Teste' } })
    await Cliente.destroy({ where: { nome: 'Cliente Teste' } })
    // Fechar o servidor após os testes
    server.close()
  })

  // Dados de teste para o autor
  const dadosAutor = {
    nome: 'Autor Teste',
    email: 'teste@autor.com',
    telefone: '123456789'
  }
  // Dados de teste para o cliente
  const dadosCliente = {
    nome: 'Cliente Teste',
    email: 'teste@cliente.com',
    senha: 'senha123',
    telefone: '987654321',
    endereco: 'Rua Teste, 123'
  }
  // Autenticação básica
  const authHeader = 'Basic ' + Buffer.from('admin:desafio').toString('base64')
  const authCliente = 'Basic ' + Buffer.from(`${dadosCliente.email}:${dadosCliente.senha}`).toString('base64')

  test('Deve criar um autor com dados de teste', async () => {
    // Chamar o endpoint para criar um autor
    const res = await request(server)
      .post('/autor')
      .set('Authorization', authHeader)
      .send(dadosAutor)

    // Verificar se a resposta está OK
    expect(res.body.erro).toBeUndefined()
    expect(res.status).toBe(200)

    // Verificar se o autor foi criado corretamente no banco de dados
    const autorCriado = await Autor.findOne({ where: { email: dadosAutor.email } })
    expect(autorCriado.nome).toBe(dadosAutor.nome)
  })

  test('Deve criar um livro com dados de teste para o autor de teste', async () => {
    // Buscar um autor existente para associar ao livro
    const autor = await Autor.findOne({ where: { email: dadosAutor.email } })

    // Dados de teste para o livro
    const dadosLivro = {
      nome: 'Livro de Teste',
      valor: 50.00,
      estoque: 10,
      autorId: autor.autorId
    }
    // Chamar o endpoint para criar um livro
    const res = await request(server)
      .post('/livro')
      .set('Authorization', authHeader)
      .send(dadosLivro)

    // Verificar se a resposta está OK
    expect(res.body.erro).toBeUndefined()
    expect(res.status).toBe(200)

    // Verificar se o livro foi criado corretamente no banco de dados
    const livroCriado = await Livro.findOne({ where: { nome: dadosLivro.nome } })
    expect(livroCriado.nome).toBe(dadosLivro.nome)
  })

  test('Deve criar um cliente com dados de teste', async () => {
    // Chamar o endpoint para criar um cliente
    const res = await request(server)
      .post('/cliente')
      .set('Authorization', authHeader)
      .send(dadosCliente)

    // Verificar se a resposta está OK
    expect(res.body.erro).toBeUndefined()
    expect(res.status).toBe(200)

    // Verificar se o cliente foi criado corretamente no banco de dados
    const clienteCriado = await Cliente.findOne({ where: { email: dadosCliente.email } })
    expect(clienteCriado.nome).toBe(dadosCliente.nome)
  })

  test('Deve buscar o livro criado de teste utilizando os dados de login do usuário', async () => {
    // Buscar o livro criado
    const livroCriado = await Livro.findOne({ where: { nome: 'Livro de Teste' } })
    // Chamar o endpoint para buscar o livro utilizando os dados de login do usuário
    const res = await request(server)
      .get(`/livro/${livroCriado.livroId}`)
      .set('Authorization', authCliente)

    // Verificar se a resposta está OK
    expect(res.status).toBe(200)
    // Verifique aqui se os dados do livro retornado estão corretos
    expect(res.body.nome).toBe('Livro de Teste')
  })

  test('Deve criar uma venda para o usuário e livro criados para teste', async () => {
    // Buscar o cliente e o livro criados para associar à venda
    const cliente = await Cliente.findOne({ where: { email: dadosCliente.email } })
    const livro = await Livro.findOne({ where: { nome: 'Livro de Teste' } })

    // Dados de teste para a venda
    const dadosVenda = {
      data: '2024-02-16',
      clienteId: cliente.clienteId,
      livroId: livro.livroId
    }
    // Chamar o endpoint para criar uma venda
    const res = await request(server)
      .post('/venda')
      .set('Authorization', authCliente)
      .send(dadosVenda)

    // Verificar se a resposta está OK
    expect(res.body.erro).toBeUndefined()
    expect(res.status).toBe(200)

    // Verificar se a venda foi criada corretamente no banco de dados
    const vendaCriada = await Venda.findOne({ where: { clienteId: cliente.clienteId, livroId: livro.livroId } })
    expect(vendaCriada.data).toBe(dadosVenda.data)
    expect(vendaCriada.clienteId).toBe(dadosVenda.clienteId)
    expect(vendaCriada.livroId).toBe(dadosVenda.livroId)
  })
})
