import express from 'express'
import VendaController from '../controllers/venda.controller.js'

const router = express.Router()

router.get('/', VendaController.getVendas)
router.get('/:id', VendaController.getVenda)
router.post('/', VendaController.createVenda)

export default router
