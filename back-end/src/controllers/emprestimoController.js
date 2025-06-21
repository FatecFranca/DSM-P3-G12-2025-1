import prisma from '../database/client.js'
import { includeRelations } from '../lib/utils.js'

const controller = {}

controller.create = async (req, res) => {
  try {
    const novoEmprestimo = await prisma.emprestimo.create({ data: req.body })
    res.status(201).json(novoEmprestimo)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
}

controller.retrieveAll = async (req, res) => {
  try {
    const include = includeRelations(req.query)
    const emprestimos = await prisma.emprestimo.findMany({ include })
    res.json(emprestimos)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
}

controller.retrieveOne = async (req, res) => {
  try {
    const include = includeRelations(req.query)
    const emprestimo = await prisma.emprestimo.findUnique({
      where: { id: req.params.id },
      include
    })
    if (emprestimo) res.json(emprestimo)
    else res.status(404).end()
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
}

controller.update = async (req, res) => {
  try {
    await prisma.emprestimo.update({
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
    await prisma.emprestimo.delete({ where: { id: req.params.id } })
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
