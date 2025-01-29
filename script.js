let submitBtn = document.querySelector('.submitBtn')
let titleInput = document.querySelector('#title')
let textInput = document.querySelector('#text')
let todoCon = document.querySelector('.todo-container')
let deleteBtn = document.querySelector('.deleteBtn')


let titleValue;
let textValue;


submitBtn.addEventListener('click', function (e) {
    e.preventDefault()

    titleValue = titleInput.value.trim();
    textValue = textInput.value.trim();


    if (titleValue && textValue) {
        if (checkDuplicateTodo()) {
            alert('This todo already exists')
        }
        else {
            setDataLocalStorage()

            getDataLocalStorage()
        }
    }
    else {
        alert("please provide both values")
    }


    titleInput.value = ' '
    textInput.value = ' '

})

const checkDuplicateTodo = () => {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    return todos.some(todo => todo.title === titleValue && todo.todotext === textValue);
};



const setDataLocalStorage = () => {

    let data = { title: titleValue, todotext: textValue, time: new Date().toLocaleString() };


    let todos = JSON.parse(localStorage.getItem('todos')) || [];


    todos.push(data)


    if (!data.title == ' ' && !data.todotext == ' ') {
        localStorage.setItem(`todos`, JSON.stringify(todos))
    }

}


const getDataLocalStorage = () => {

    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    todoCon.innerHTML = '';


    if (todos.length == 0) {
        todoCon.innerHTML = '<p class="notodohere"> No todos yet</p>'
    }
    else {
        todos.forEach(todo => {

            todoCon.innerHTML += `
            <div class="todo">
                <h4>${todo.title}</h4>
                <p>${todo.todotext}</p>
                <p><strong>Added on:</strong> ${todo.time}</p>
            </div>
        `;
        });
    }

};

getDataLocalStorage()

deleteBtn.addEventListener('click', function () {
    localStorage.clear()
    getDataLocalStorage()
})