import LivroRepository from '../repositories/livro.repository.js'
import LivroInfoRepository from '../repositories/livroInfo.repository.js'
import AutorRepository from '../repositories/autor.repository.js'
import VendaRepository from '../repositories/venda.repository.js'

async function createLivro (livro) {
  if (await AutorRepository.getAutor(livro.autorId)) {
    return await LivroRepository.createLivro(livro)
  }
  throw new Error('O Autor ID informado não existe')
}

async function updateLivro (livro) {
  return await LivroRepository.updateLivro(livro)
}

async function deleteLivro (id) {
  const vendas = await VendaRepository.getVendasByLivroId(id)
  if (vendas.length > 0) {
    throw new Error('Livro possui vendas associadas')
  }
  return await LivroRepository.deleteLivro(id)
}

async function getLivro (id) {
  const livro = await LivroRepository.getLivro(id)
  livro.info = await LivroInfoRepository.getLivroInfo(parseInt(id))
  return livro
}

async function getLivros (autorId) {
  if (autorId) {
    return await LivroRepository.getLivrosByAutor(autorId)
  }
  return await LivroRepository.getLivros()
}

async function createLivroInfo (livroInfo) {
  if (await LivroRepository.getLivro(livroInfo.livroId)) {
    return await LivroInfoRepository.createLivroInfo(livroInfo)
  }
  throw new Error('O Livro ID informado não existe')
}

async function updateLivroInfo (livroInfo) {
  if (await LivroRepository.getLivro(livroInfo.livroId)) {
    return await LivroInfoRepository.updateLivroInfo(livroInfo)
  }
  throw new Error('O Livro ID informado não existe')
}

async function deleteLivroInfo (id) {
  return await LivroInfoRepository.deleteLivroInfo(id)
}

async function createAvaliacao (avaliacao, livroId) {
  if (await LivroRepository.getLivro(livroId)) {
    return await LivroInfoRepository.createAvaliacao(avaliacao, livroId)
  }
  throw new Error('O Livro ID informado não existe')
}

async function deleteAvaliacao (livroId, index) {
  return await LivroInfoRepository.deleteAvaliacao(livroId, index)
}

export default {
  createLivro,
  updateLivro,
  deleteLivro,
  getLivro,
  getLivros,
  createLivroInfo,
  updateLivroInfo,
  deleteLivroInfo,
  createAvaliacao,
  deleteAvaliacao
}
