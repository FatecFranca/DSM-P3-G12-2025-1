import { Router } from 'express'
import livroController from '../controllers/livroController.js'

const router = Router()

// GET /livros - busca todos os livros
router.get('/', livroController.retrieveAll)

// GET /livros/:id - busca um livro por ID
router.get('/:id', livroController.retrieveOne)

// POST /livros - cria um novo livro
router.post('/', livroController.create)

// PUT /livros/:id - atualiza um livro existente
router.put('/:id', livroController.update)

// DELETE /livros/:id - remove um livro
router.delete('/:id', livroController.delete)

export default router
