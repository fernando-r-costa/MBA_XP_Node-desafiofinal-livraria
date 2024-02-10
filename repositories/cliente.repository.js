/* eslint-disable no-useless-catch */
import Cliente from '../models/cliente.model.js'

async function createCliente (cliente) {
  try {
    const novoCliente = await Cliente.create(cliente)
    return await getCliente(novoCliente.clienteId)
  } catch (err) {
    throw err
  }
}

async function updateCliente (cliente) {
  try {
    await Cliente.update(cliente, {
      where: {
        clienteId: cliente.clienteId
      }
    })
    return await getCliente(cliente.clienteId)
  } catch (err) {
    throw err
  }
}

async function deleteCliente (id) {
  try {
    await Cliente.destroy({
      where: {
        clienteId: id
      }
    })
  } catch (err) {
    throw err
  }
}

async function getClientes () {
  try {
    return await Cliente.findAll()
  } catch (err) {
    throw err
  }
}

async function getCliente (id) {
  try {
    return await Cliente.findByPk(id)
  } catch (err) {
    throw err
  }
}

async function getClienteByEmail (email) {
  try {
    return await Cliente.findOne({
      where: {
        email
      },
      attributes: ['clienteId', 'nome', 'email', 'senha']
    })
  } catch (err) {
    throw err
  }
}

export default {
  createCliente,
  updateCliente,
  deleteCliente,
  getClientes,
  getCliente,
  getClienteByEmail
}
