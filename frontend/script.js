const form = document.querySelector('form')
const employeesList = document.querySelector('#employees-list')

form.addEventListener('submit', function(e) {
    e.preventDefault()

    let name = document.querySelector('input[name="name"]').value
    let job = document.querySelector('input[name="job"]').value
    let salary = document.querySelector('input[name="salary"]').value

    const addEmployee = fetch('http://localhost:3000/employees', {
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
            editButton.addEventListener('click', function() {
                // cria um elemento input que irá receber 
                // a string anterior e permitir alteração pelo usuário
                const editModal = document.querySelector('#editModal')
                editModal.style.display = 'flex'

                const editedName = document.querySelector('input[name="editName"]')
                editedName.value = name
                const editedJob = document.querySelector('input[name="editJob"]')
                editedJob.value = job
                const editedSalary = document.querySelector('input[name="editSalary"]')
                editedSalary.value = salary

                const confirmButton = document.querySelector('#confirmButton')
        
                // cria um listener para caso o usuário aperte o botão 'enter', 
                // impedindo-o de enviar uma string vazia
                confirmButton.addEventListener('click', () => {
                    if (editedName.value === '' || editedJob.value === '' || editedSalary.value === '') {
                        alert('Não deixe campos vazios!')
                        return
                    }

                    name = editedName.value
                    job = editedJob.value
                    salary = editedSalary.value

                    fetch(`http://localhost:3000/employees/${employee._id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            name: name,
                            job: job,
                            salary: salary
                        })
                    })
                    .then(() => {
                        editModal.style.display = 'none'
                        li.innerHTML = `<p>Nome: ${name}</p><p>Cargo: ${job}</p><p>Salário: R$${salary}</p>`
                        li.appendChild(editButton)
                        li.appendChild(deleteButton)
                    })
                    .catch(error => {
                        console.log(error)
                    })
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