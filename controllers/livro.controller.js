/* eslint-disable no-undef */
import LivroService from '../services/livro.service.js'

async function createLivro (req, res, next) {
  try {
    let livro = req.body
    if (!livro.nome || !livro.valor || !livro.estoque || !livro.autorId) {
      throw new Error('Campos obrigatórios não preenchidos')
    }
    livro = await LivroService.createLivro(livro)
    res.send(livro)
    logger.info(`POST /livro - ${JSON.stringify(livro)}`)
  } catch (err) {
    next(err)
  }
}

async function updateLivro (req, res, next) {
  try {
    let livro = req.body
    if (!livro.livroId || !livro.valor || !livro.estoque) {
      throw new Error('Campos obrigatórios não preenchidos')
    }
    delete livro.autorId
    delete livro.nome
    livro = await LivroService.updateLivro(livro)
    res.send(livro)
    logger.info(`PUT /livro - ${JSON.stringify(livro)}`)
  } catch (err) {
    next(err)
  }
}

async function deleteLivro (req, res, next) {
  try {
    await LivroService.deleteLivro(req.params.id)
    res.end()
    logger.info('DELETE /livro')
  } catch (err) {
    next(err)
  }
}

async function getLivros (req, res, next) {
  try {
    res.send(await LivroService.getLivros(req.query.autorId))
    logger.info('GET /livros')
  } catch (err) {
    next(err)
  }
}

async function getLivro (req, res, next) {
  try {
    res.send(await LivroService.getLivro(req.params.id))
    logger.info('GET /livro')
  } catch (err) {
    next(err)
  }
}

async function createLivroInfo (req, res, next) {
  try {
    let livroInfo = req.body
    if (!livroInfo.livroId) {
      throw new Error('Livro ID é obrigatório.')
    }
    livroInfo = await LivroService.createLivroInfo(livroInfo)
    res.end()
    logger.info(`POST /livro/info - ${JSON.stringify(livroInfo)}`)
  } catch (err) {
    next(err)
  }
}

async function updateLivroInfo (req, res, next) {
  try {
    const livroInfo = req.body
    if (!livroInfo.livroId) {
      throw new Error('Livro ID é obrigatório.')
    }
    await LivroService.updateLivroInfo(livroInfo)
    res.end()
    logger.info(`PUT /livro/info - ${JSON.stringify(livroInfo)}`)
  } catch (err) {
    next(err)
  }
}

async function deleteLivroInfo (req, res, next) {
  try {
    res.send(await LivroService.deleteLivroInfo(req.params.id))
    logger.info(`DELETE /livro/info/${req.params.id}`)
  } catch (err) {
    next(err)
  }
}

async function createAvaliacao (req, res, next) {
  try {
    const livroId = req.params.id
    const avaliacao = req.body
    if (!livroId || !avaliacao.nome || !avaliacao.nota || !avaliacao.avaliacao) {
      throw new Error('Campos obrigatórios não preenchidos')
    }
    await LivroService.createAvaliacao(avaliacao, livroId)
    res.end()
    logger.info(`POST /livro/avaliacao - ${JSON.stringify(avaliacao)}`)
  } catch (err) {
    next(err)
  }
}

async function deleteAvaliacao (req, res, next) {
  try {
    await LivroService.deleteAvaliacao(req.params.id, req.params.index)
    res.end()
    logger.info(`DELETE /livro/${req.params.id}/avaliacao/${req.params.index}`)
  } catch (err) {
    next(err)
  }
}

export default {
  createLivro,
  updateLivro,
  deleteLivro,
  getLivros,
  getLivro,
  createLivroInfo,
  updateLivroInfo,
  deleteLivroInfo,
  createAvaliacao,
  deleteAvaliacao
}
