const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const EmployeeSchema = new Schema({
    id: ObjectId,
    name: String,
    job: String,
    salary: Number
})

const EmployeeModel = mongoose.model('employees', EmployeeSchema)

module.exports = EmployeeModel