const form = document.querySelector('form')
const employeesList = document.querySelector('#employees-list')

form.addEventListener('submit', function(e) {
    e.preventDefault()

    const name = document.querySelector('input[name="name"]').value
    const job = document.querySelector('input[name="job"]').value
    const salary = document.querySelector('input[name="salary"]').value

    fetch('http://localhost:3000/employees', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                job: job,
                salary: salary
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao adicionar funcionário');
            }
                return response.json();
        })
        .then(employee => {
            // Adicione o novo funcionário na lista
            const li = document.createElement('li')
            li.innerHTML = `<p>Nome: ${name}</p><p>Cargo: ${job}</p><p>Salário: R$${salary}</p>`
            
            const editButton = document.createElement('button')
            editButton.innerHTML = 'Editar'
            editButton.addEventListener('click', () => {
                fetch(`http://localhost:3000/employees/${employee._id}`, {
                    method: 'PUT'
                })
                .then(() => {

                })
                .catch(error => {
                    console.error(error)
                })
            })
        
            li.appendChild(editButton)

            const deleteButton = document.createElement('button')
            deleteButton.innerHTML = 'Remover'
            deleteButton.addEventListener('click', () => {
                fetch(`http://localhost:3000/employees/${employee._id}`, {
                    method: 'DELETE'
                })
                .then(() => {
                    li.remove()
                })
                .catch(error => {
                    console.error(error)
                })
            })
        
            li.appendChild(deleteButton)

            employeesList.appendChild(li)
        })
        .catch(error => {
            console.error(error);
        });
})

window.addEventListener('load', function() {
    fetch('http://localhost:3000/employees')
    .then(response => response.json())
    .then(employees => {
        const employeesData = employees
        
        employeesData.forEach(employee => {
                const li = document.createElement('li')
                li.innerHTML = `<p>Nome: ${employee.name}</p><p>Cargo: ${employee.job}</p><p>Salário: R$${employee.salary}</p>`
                const deleteButton = document.createElement('button')
                deleteButton.innerHTML = 'Delete'
                deleteButton.addEventListener('click', () => {
                    fetch(`http://localhost:3000/employees/${employee._id}`, {
                        method: 'DELETE'
                    })
                    .then(() => {
                        li.remove()
                    })
                    .catch(error => {
                        console.error(error)
                    })
                })
                li.appendChild(deleteButton)
                employeesList.appendChild(li)
        })
    })
})