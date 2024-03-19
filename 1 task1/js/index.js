//console.log("Hellow World!")
const input = document.querySelector("input");
const list = document.querySelector("ul");

input.addEventListener('keypress',(event)=> {
    if (event.key === 'Enter'){
        event.preventDefault()
        const task =input.value.trim();
        if (task !== '') {
            const li = document.createElement("li")
            li.setAttribute('class','list-group-item')
            li.innerText=task;
            list.append(li);
            input.value ="Add New Task....";

        }

    }

});
