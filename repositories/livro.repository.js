/* eslint-disable no-useless-catch */
import Livro from '../models/livro.model.js'

async function createLivro (livro) {
  try {
    return await Livro.create(livro)
  } catch (err) {
    throw err
  }
}

async function updateLivro (livro) {
  try {
    await Livro.update(livro, {
      where: {
        livroId: livro.livroId
      }
    })
    return await getLivro(livro.livroId)
  } catch (err) {
    throw err
  }
}

async function deleteLivro (id) {
  try {
    await Livro.destroy({
      where: {
        livroId: id
      }
    })
  } catch (err) {
    throw err
  }
}

async function getLivros () {
  try {
    return await Livro.findAll()
  } catch (err) {
    throw err
  }
}

async function getLivrosByAutor (autorId) {
  try {
    return await Livro.findAll({
      where: {
        autorId
      }
    })
  } catch (err) {
    throw err
  }
}

async function getLivro (id) {
  try {
    return await Livro.findByPk(id, { raw: true })
  } catch (err) {
    throw err
  }
}

export default {
  createLivro,
  updateLivro,
  deleteLivro,
  getLivros,
  getLivro,
  getLivrosByAutor
}
