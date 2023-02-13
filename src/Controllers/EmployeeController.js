const EmployeeModel = require('../Models/EmployeeModel')

class EmployeeController {
    async store(req, res) {
        const { name, job, salary } = req.body
        
        if(!name || !job || !salary) {
            return res.status(400).json({ message: "Name, job and salary are required" })
        }

        const createdEmployee = await EmployeeModel.create(req.body)

        return res.status(200).json(createdEmployee)
    }

    async index(req, res) {
        const employees = await EmployeeModel.find()
        
        return res.status(200).json(employees)
    }

    async show(req, res) {
        try {
            const { id } = req.params
            const employee = await EmployeeModel.findById(id)

            return res.status(200).json(employee)
        } catch (error) {
            return res.status(404).json({ message: "Failed to list employee" })
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params

            await EmployeeModel.findByIdAndUpdate(id, req.body)

            return res.status(200).json({ message: "Employee data updated" })
        } catch (error) {
            return res.status(404).json({ message: "Failed to update the employee data" })
        }
    }

    async remove(req, res) {
        try {
            const { id } = req.params

            const employeeRemoved = await EmployeeModel.findByIdAndDelete(id)

            if(!employeeRemoved) {
                return res.status(404).json({ message: "Product does not exists" })
            }

            return res.status(200).json({ message: "Employee removed" })
        } catch (error) {
            return res.status(404).json({ message: "Failed to remove employee" })
        }
    }
}

module.exports = new EmployeeController