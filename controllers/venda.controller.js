/* eslint-disable no-undef */
import VendaService from '../services/venda.service.js'

async function createVenda (req, res, next) {
  try {
    let venda = req.body
    if (!venda.data || !venda.clienteId || !venda.livroId) {
      throw new Error('Campos obrigatórios não preenchidos')
    }
    venda = await VendaService.createVenda(venda)
    res.send(venda)
    logger.info(`POST /venda - ${JSON.stringify(venda)}`)
  } catch (err) {
    next(err)
  }
}

async function getVendas (req, res, next) {
  try {
    res.send(await VendaService.getVendas(req.query.clienteId, req.query.livroId, req.query.autorId))
    logger.info('GET /vendas')
  } catch (err) {
    next(err)
  }
}

async function getVenda (req, res, next) {
  try {
    res.send(await VendaService.getVenda(req.params.id))
    logger.info('GET /venda')
  } catch (err) {
    next(err)
  }
}

export default {
  createVenda,
  getVendas,
  getVenda
}
