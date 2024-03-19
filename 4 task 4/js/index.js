const BACKEND_ROOT_URL = 'http://localhost:3001';
//Add constant variable that holds url for the backend.
import { Todos } from './class/Todos.js'



const todos = new Todos(BACKEND_ROOT_URL);

//connect to DOM input and ul elements.
const list = document.querySelector("ul");
const input = document.querySelector("input");

//input.disabled = true;

//separate function for rendering a task.
const renderTask = (task) => {
    const li = document.createElement("li")
    li.setAttribute('class','list-group-item')
    li.innerHTML = task.getText();
    list.append(li); 
}

//function that fetches data from the backend by making HTTP call.

const getTasks = () => {
    todos.getTasks().then((tasks) => {
        tasks.forEach(task => {
            renderTask(task);
        });
        
    }).catch((error) => {
        alert(error);
    });
}

// saving task to backend database 'task' table- 'description' column.


const saveTask = async (task) => {
    try {
        const json = JSON.stringify({description:task});
        const response = await fetch(BACKEND_ROOT_URL + '/new', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: json
        });
        return response.json();
    } catch (error) {
        alert('Error saving task '+error.message);
    }

}

// key press function with above renderTask function.
input.addEventListener('keypress',(event)=> {

//if press Enter key then add new task. ("if" for the task not empty)  
    if (event.key === 'Enter'){
        event.preventDefault()
        const task =input.value.trim();
        if (task !== '') {
            //addtask or (savetask in 3 pdf)
            todos.addTask(task).then((task) => {
                renderTask(task);
                input.value ='';
                input.focus();
                
            })
        }
    }
});


// call get fuction to get tasks from the backend.
getTasks();


