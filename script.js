document.addEventListener('DOMContentLoaded', () => {
    const inputValue = document.querySelector('#textInput')
    const addText = document.getElementById("addText")
    const taskCanvas = document.getElementById('output_section')
    const taskList = document.getElementById("task_list")
    const completeTask = document.getElementsByClassName("complete_task")
    const deleteTask = document.getElementsByClassName("delete_task")
    const editTask = document.querySelector("#edit_canvas")
    const editInput = document.querySelector("#edit")
    const addEditTask = document.querySelector("#editText")


    const allTask = JSON.parse(localStorage.getItem('task')) || []

    allTask.forEach(task => {
        renderTask(task)
    });

    addText.addEventListener('click', (event) => {
        const taskText = inputValue.value.trim()
        const taskTime = new Date()
        if (taskText === "") return;
        const myTask = {
            id: Date.now(),
            taskName: taskText,
            time: taskTime.toLocaleString(),
            status: false
        }

        allTask.push(myTask)
        renderTask(myTask)
        saveTask()

        inputValue.value = " "//clear input
        // console.log(allTask)
    })

    document.addEventListener('dblclick', (event) => {
        const editItem = event.target
        editTaskItem(editItem)
    })



    function editTaskItem(task) {
        if (task.className === 'task_list') {
            editTask.style = 'display: flex'
            editInput.value = task.textContent.trim()
            addEditTask.addEventListener('click', (event) => {
                const li = task
                console.log(li)
                li.innerHTML = `<span id="task_section">
                                <p id="${task.firstElementChild.firstElementChild.id}">${editInput.value}</p>
                            </span>
                            <span id="action_section">
                                <span id="complete_section">
                                    <button class="complete_task"></button>
                                </span>
                                <span id="delete_section">
                                    <button class="delete_task"></button>
                                </span>
                            </span>` 

                allTask.filter((t) =>{
                    if(t.id === Number(task.firstElementChild.firstElementChild.id)){
                        t.taskName = editInput.value
                        saveTask()
                    }
                })
                editTask.style = 'display: none'    
            })
        }
    }

    function renderTask(task) {
        const li = document.createElement('li')
        li.setAttribute('class', 'task_list')
        li.innerHTML = `<span id="task_section">
                        <p id="${task.id}">${task.taskName}</p>
                    </span>
                    <span id="action_section">
                        <span id="complete_section">
                            <button class="complete_task"></button>
                        </span>
                        <span id="delete_section">
                            <button class="delete_task"></button>
                        </span>
                    </span>`
                    
                    
        li.addEventListener('click', (e)=>{
            if(e.target.className === 'complete_task'){
                task.status = !task.status
                li.firstElementChild.classList.toggle('completed')
                saveTask()
            }
        })

        li.addEventListener('click', (e)=>{
            if(e.target.className === 'delete_task'){
                allTask.filter((t)=>{
                    if(t.id !== task.id){
                        li.remove()
                        saveTask()
                    }
                })
                
            }
        })
        taskCanvas.appendChild(li)
    }

    function saveTask() {
        localStorage.setItem('task', JSON.stringify(allTask))
    }

})

