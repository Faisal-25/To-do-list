const todoContainer = document.querySelector('.todo-container');
const submitBtn = document.querySelector('.sub-btn');
const input = document.querySelector('.f-input');
const todosContainer = document.querySelector('.todos');
const todoForm = document.querySelector('.todo-form');
const todoItem = document.querySelector('.todo-item');
const searchInput = document.querySelector('.search-input');
let todos = [];
const generateTodos = (todos) => {
   
    todosContainer.innerHTML = '';
    todos.forEach((todo)=>{
        const text = `
        <li class="todo-item">
            <span class="todo-text">
                ${todo}
            </span>
            <i class="fa-solid fa-trash delete"></i>
        </li>
    `;
     todosContainer.innerHTML+=text;
    })
   

}
function fetchTodos(){
    if(localStorage.getItem('todos')) {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    else{
       
        localStorage.setItem('todos', todos);
    }
    generateTodos(todos);
}
//add todos
todoForm.addEventListener('submit',(e)=>{
    e.preventDefault();


    //create todo
    const todo = input.value.trim();//to LLl̥l̥l̥trim the leading space and trailing spaces

    // generate a todo only if there are values in the input
    if(todo){
        
        todos.push(todo)
     
        localStorage.setItem('todos',JSON.stringify(todos));
        fetchTodos();
        generateTodos(todos);
        //clear the from
        todoForm.reset();
    }

})
function deleteFromLocalStorage(todos,e){
    todos.forEach((todo,i)=>{
        if( e.target.parentElement.outerText.trim() == todo){
            todos.splice(i,1);
            console.log(todos);
        }
    })
    localStorage.setItem('todos', JSON.stringify(todos));  
    fetchTodos();
}
//delete 
todoContainer.addEventListener('click',(e)=>{
    //if the clicked target contains the delete class,the delete the item
    if(e.target.classList.contains('delete')){
        console.log(e);
        e.target.parentElement.remove();
        console.log(  e.target.parentElement.outerText.trim())
        deleteFromLocalStorage(todos,e);

    }
});


//toggle completed
todoContainer.addEventListener('click',(e)=>{
    //toggle class
    if(e.target.classList.contains('todo-item')){
        e.target.classList.toggle('completed');
        console.log("hi")
    }
})


// Todos filter
const filterTodos = (query) => {
    const todoItems  = Array.from(todosContainer.children)
    todoItems.forEach((todo)=>{
        //if the todo text contains query then show it
       const text = todo.textContent;
       if(text.toLowerCase().includes(query)){
           todo.style.display = 'flex';
       }
       else{
           todo.style.display = 'none';
       }
    })
}



//search items
searchInput.addEventListener('keyup',(e)=>{
    e.preventDefault();
    const query = e.target.value.trim().toLowerCase();
filterTodos(query);
})
fetchTodos();