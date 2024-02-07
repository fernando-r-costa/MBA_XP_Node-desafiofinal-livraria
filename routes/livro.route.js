import express from 'express'
import LivroController from '../controllers/livro.controller.js'

const router = express.Router()

router.get('/', LivroController.getLivros)
router.get('/:id', LivroController.getLivro)
router.post('/', LivroController.createLivro)
router.post('/info', LivroController.createLivroInfo)
router.post('/:id/avaliacao', LivroController.createAvaliacao)
router.put('/', LivroController.updateLivro)
router.put('/info', LivroController.updateLivroInfo)
router.delete('/:id', LivroController.deleteLivro)
router.delete('/info/:id', LivroController.deleteLivroInfo)
router.delete('/:id/avaliacao/:index', LivroController.deleteAvaliacao)

export default router
