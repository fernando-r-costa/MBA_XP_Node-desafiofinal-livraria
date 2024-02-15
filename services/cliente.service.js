import ClienteRepository from '../repositories/cliente.repository.js'
import VendaRepository from '../repositories/venda.repository.js'

async function createCliente (cliente) {
  const existeCliente = await ClienteRepository.getClienteByEmail(cliente.email)
  if (existeCliente) {
    throw new Error('Cliente já cadastrado')
  }
  return await ClienteRepository.createCliente(cliente)
}

async function updateCliente (cliente) {
  return await ClienteRepository.updateCliente(cliente)
}

async function deleteCliente (id) {
  const vendas = await VendaRepository.getVendasByClienteId(id)
  if (vendas.length > 0) {
    throw new Error('Cliente possui vendas associadas')
  }
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
