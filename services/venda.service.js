import VendaRepository from '../repositories/venda.repository.js'
import LivroRepository from '../repositories/livro.repository.js'
import ClienteRepository from '../repositories/cliente.repository.js'

async function createVenda (venda) {
  let error = ''
  if (!await ClienteRepository.getCliente(venda.clienteId)) {
    error = ' O Cliente ID informado não existe. '
  }
  const livro = await LivroRepository.getLivro(venda.livroId)
  if (!livro) {
    error += ' O Livro ID informado não existe. '
  }
  if (error) {
    throw new Error(error)
  }
  if (livro.estoque > 0) {
    venda.valor = livro.valor
    venda = await VendaRepository.createVenda(venda)
    livro.estoque--
    await LivroRepository.updateLivro(livro)
    return venda
  } else {
    throw new Error('O livro informado não possui estoque.')
  }
}

async function getVendas (clienteId, livroId, autorId) {
  if (clienteId) {
    return await VendaRepository.getVendasByClienteId(clienteId)
  }
  if (livroId) {
    return await VendaRepository.getVendasByLivroId(livroId)
  }
  if (autorId) {
    return await VendaRepository.getVendasByAutorId(autorId)
  }
  return await VendaRepository.getVendas()
}

async function getVenda (id) {
  return await VendaRepository.getVenda(id)
}

export default {
  createVenda,
  getVendas,
  getVenda
}
