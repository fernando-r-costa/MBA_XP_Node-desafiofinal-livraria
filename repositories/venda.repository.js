/* eslint-disable no-useless-catch */
import Cliente from '../models/cliente.model.js'
import Livro from '../models/livro.model.js'
import Venda from '../models/venda.model.js'

async function createVenda (venda) {
  try {
    return await Venda.create(venda)
  } catch (err) {
    throw err
  }
}

async function getVendas () {
  try {
    return await Venda.findAll()
  } catch (err) {
    throw err
  }
}

async function getVendasByClienteId (clienteId) {
  try {
    return await Venda.findAll(
      {
        where: {
          clienteId
        },
        include: [
          {
            model: Livro
          }
        ]
      })
  } catch (err) {
    throw err
  }
}

async function getVendasByLivroId (livroId) {
  try {
    return await Venda.findAll(
      {
        where: {
          livroId
        },
        include: [
          {
            model: Cliente
          }
        ]
      })
  } catch (err) {
    throw err
  }
}

async function getVendasByAutorId (autorId) {
  try {
    return await Venda.findAll(
      {
        include: [
          {
            model: Livro,
            where: {
              autorId
            }
          }
        ]
      })
  } catch (err) {
    throw err
  }
}

async function getVenda (id) {
  try {
    return await Venda.findByPk(id, {
      include: [
        {
          model: Livro
        },
        {
          model: Cliente
        }
      ]
    })
  } catch (err) {
    throw err
  }
}

export default {
  createVenda,
  getVendas,
  getVendasByLivroId,
  getVendasByClienteId,
  getVendasByAutorId,
  getVenda
}
