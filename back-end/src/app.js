import express, { json, urlencoded } from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'

import indexRouter from './routes/index.js'

const app = express()

app.use(logger('dev'))
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/', indexRouter)

/***************** ROTAS ***********************/

import categoriasRouter from './routes/categorias.js'
app.use('/categorias', categoriasRouter)

import usuariosRouter from './routes/users.js'
app.use('/usuarios', usuariosRouter)

import livrosRouter from './routes/livros.js'
app.use('/livros', livrosRouter)

import emprestimosRouter from './routes/emprestimos.js'
app.use('/emprestimos', emprestimosRouter)

export default app
