
//Add constant variable that holds url for the backend.
const BACKEND_ROOT_URL = 'http://localhost:3001';

//connect to DOM input and ul elements.
const input = document.querySelector("input");
const list = document.querySelector("ul");

input.disabled = true;

//separate function for rendering a task.
const renderTask = (task) => {
    const li = document.createElement("li")
    li.setAttribute('class','list-group-item')
    li.innerText=task;
    list.append(li); 
}


//function that fetches data from the backend by making HTTP call.
const getTasks = async () => {
    try {
        const response = await fetch(BACKEND_ROOT_URL);
        const json = await response.json();
        //write a loop to renderTask funtion for each task.description (change meija's "jaso.result.forEch")).
        json.result.forEach((task) => {
            renderTask(task.description);
        });
        input.disabled = false;

    }   catch (error) {
        alert('Error retrieving tasks '+error.message);
    }
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
            saveTask(task).then((json) => {
                renderTask(task);

               //clear the field after adding a task.
                input.value ="Add New Task....";
            })
        }
    }
});


// call get fuction to get tasks from the backend.
getTasks();


