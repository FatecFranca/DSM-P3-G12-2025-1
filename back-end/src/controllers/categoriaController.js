import prisma from '../database/client.js'
import { includeRelations } from '../lib/utils.js'

const controller = {}

controller.create = async (req, res) => {
  try {
    const novaCategoria = await prisma.categoria.create({ data: req.body })
    res.status(201).json(novaCategoria)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
}

controller.retrieveAll = async (req, res) => {
  try {
    const include = includeRelations(req.query)
    const categorias = await prisma.categoria.findMany({ include })
    res.json(categorias)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
}

controller.retrieveOne = async (req, res) => {
  try {
    const include = includeRelations(req.query)
    const categoria = await prisma.categoria.findUnique({
      where: { id: req.params.id },
      include
    })
    if (categoria) res.json(categoria)
    else res.status(404).end()
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
}

controller.update = async (req, res) => {
  try {
    await prisma.categoria.update({
      where: { id: req.params.id },
      data: req.body
    })
    res.status(204).end()
  } catch (error) {
    if (error?.code === 'P2025') res.status(404).end()
    else {
      console.error(error)
      res.status(500).send(error)
    }
  }
}

controller.delete = async (req, res) => {
  try {
    await prisma.categoria.delete({ where: { id: req.params.id } })
    res.status(204).end()
  } catch (error) {
    if (error?.code === 'P2025') res.status(404).end()
    else {
      console.error(error)
      res.status(500).send(error)
    }
  }
}

export default controller
