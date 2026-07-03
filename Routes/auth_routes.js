const exprss = require('express')
const { login, register } = require('../controllers/auth_controller')
const authRoutes = exprss.Router()

authRoutes.post('/login', login)

authRoutes.post('/register', register)

module.exports = authRoutes
