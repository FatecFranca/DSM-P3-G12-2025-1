import prisma from '../database/client.js'
import { includeRelations } from '../lib/utils.js'

const controller = {}   // Objeto vazio

// Cria um novo livro
controller.create = async function(req, res) {
  try {
    const novoLivro = await prisma.livro.create({
      data: req.body,
      include: {
        categoria: true
      }
    })

    res.status(201).json(novoLivro)
  }
  catch(error) {
    console.error(error)
    res.status(500).send(error)
  }
}

// Recupera todos os livros
controller.retrieveAll = async function(req, res) {
  try {
    const include = includeRelations(req.query)

    const result = await prisma.livro.findMany({
      include,
      orderBy: [{ titulo: 'asc' }]
    })

    res.send(result)
  }
  catch(error) {
    console.error(error)
    res.status(500).send(error)
  }
}

// Recupera um livro pelo ID
controller.retrieveOne = async function(req, res) {
  try {
    const include = includeRelations(req.query)

    const result = await prisma.livro.findUnique({
      where: { id: req.params.id },
      include
    })

    if(result) res.send(result)
    else res.status(404).end()
  }
  catch(error) {
    console.error(error)
    res.status(500).send(error)
  }
}

// Atualiza um livro
controller.update = async function(req, res) {
  try {
    await prisma.livro.update({
      where: { id: req.params.id },
      data: req.body
    })

    res.status(204).end()
  }
  catch(error) {
    if(error?.code === 'P2025') {
      res.status(404).end()
    } else {
      console.error(error)
      res.status(500).send(error)
    }
  }
}

// Exclui um livro
controller.delete = async function(req, res) {
  try {
    await prisma.livro.delete({
      where: { id: req.params.id }
    })

    res.status(204).end()
  }
  catch(error) {
    if(error?.code === 'P2025') {
      res.status(404).end()
    } else {
      console.error(error)
      res.status(500).send(error)
    }
  }
}

export default controller
