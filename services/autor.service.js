import AutorRepository from '../repositories/autor.repository.js'
import VendaRepository from '../repositories/venda.repository.js'

async function createAutor (autor) {
  return await AutorRepository.createAutor(autor)
}

async function updateAutor (autor) {
  return await AutorRepository.updateAutor(autor)
}

async function deleteAutor (id) {
  const vendas = await VendaRepository.getVendasByAutorId(id)
  if (vendas.length > 0) {
    throw new Error('Autor possui vendas associadas')
  }
  await AutorRepository.deleteAutor(id)
}

async function getAutores () {
  return await AutorRepository.getAutores()
}

async function getAutor (id) {
  return await AutorRepository.getAutor(id)
}

export default {
  createAutor,
  updateAutor,
  deleteAutor,
  getAutores,
  getAutor
}
