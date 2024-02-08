import ClienteRepository from '../repositories/cliente.repository.js'

async function createCliente (cliente) {
  return await ClienteRepository.createCliente(cliente)
}

async function updateCliente (cliente) {
  return await ClienteRepository.updateCliente(cliente)
}

async function deleteCliente (id) {
  // if () {
  //     throw new Error()
  // }
  await ClienteRepository.deleteCliente(id)
}

async function getClientes () {
  return await ClienteRepository.getClientes()
}

async function getCliente (id) {
  return await ClienteRepository.getCliente(id)
}

export default {
  createCliente,
  updateCliente,
  deleteCliente,
  getClientes,
  getCliente
}
