import prisma from '../database/client.js'
import { includeRelations } from '../lib/utils.js'

const controller = {}

controller.create = async (req, res) => {
  try {
    const novoUsuario = await prisma.usuario.create({ data: req.body })
    res.status(201).json(novoUsuario)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
}

controller.retrieveAll = async (req, res) => {
  try {
    const include = includeRelations(req.query)
    const usuarios = await prisma.usuario.findMany({ include })
    res.json(usuarios)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
}

controller.retrieveOne = async (req, res) => {
  try {
    const include = includeRelations(req.query)
    const usuario = await prisma.usuario.findUnique({
      where: { id: req.params.id },
      include
    })
    if (usuario) res.json(usuario)
    else res.status(404).end()
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
}

controller.update = async (req, res) => {
  try {
    await prisma.usuario.update({
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
    await prisma.usuario.delete({ where: { id: req.params.id } })
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
