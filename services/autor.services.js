import AutorRepository from '../repositories/autor.repository.js'

async function createAutor (autor) {
  return await AutorRepository.createAutor(autor)
}

async function updateAutor (autor) {
  return await AutorRepository.updateAutor(autor)
}

async function deleteAutor (id) {
  // if () {
  //     throw new Error()
  // }
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
