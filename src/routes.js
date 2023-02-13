const { Router } = require('express')

const ProductController = require('./Controllers/EmployeeController')

const routes = Router()

routes.get('/health', (req, res) => {
    return res.status(200).json({ message: 'Server is on' })
})

// as funções seguintes injetam o req e o res automaticamente
routes.post('/employees', ProductController.store)
routes.get('/employees', ProductController.index)
routes.get('/employees/:id', ProductController.show)
routes.put('/employees/:id', ProductController.update)
routes.delete('/employees/:id', ProductController.remove)

module.exports = routes