// SELECT DOM ELEMENTS 
const input = document.getElementById("input-todos")
const addBtn = document.getElementById("add-btn")
const list = document.getElementById("todo-list")
const resetBtn = document.getElementById("reset-btn")
//TRY TO LOAD SAVED TODOS FROM LOCAL STORAGE(if any)
 const saved = localStorage.getItem("todos");
 const todos = saved ? JSON.parse(saved) : [];

 function saveTodos(){
    //SAVE CURRENT TODOS ARRAY TO LOCAL STORAGE
    localStorage.setItem('todos', JSON.stringify(todos))
 }

 //CREATE A DOM NODE FOR A TODO OBJECT AND APPEND IT TO THE LIST
 function createTodoNode(todo, index){
    const li = document.createElement('li')

    // CHECKBOX TO TOGGLE COMPLETION 
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = !!todo.completed
    checkbox.addEventListener("change", ()=>{
      todo.completed = checkbox.checked

      //TODO: VISUAL FEEDBACK: STRIKE-THROUGH WHEN COMPLETED
      textSpan.style.textDecoration = todo.completed ? 'line-through' : "";
      textSpan.style.color = todo.completed ? 'maroon' : "";

      saveTodos();
    })

   //  TEXT OF THE TODO 
   const textSpan = document.createElement('span');
   textSpan.textContent = todo.text;
   textSpan.style.margin = '0px 8px';
   if(todo.completed){
      textSpan.style.textDecoration = 'line-through';
   }
      //ADD DOUBLE CLICK EVENT LISTNER TO EDIT THE TODO
      textSpan.addEventListener('dblclick', ()=>{ 

         const newText = prompt("Edit Todo", todo.text);
         if (newText !== null && newText.trim() !== "") {
            todo.text = newText.trim();
            textSpan.textContent = todo.text;
            saveTodos();
         }
      })

      //DELETE TODO BUTTON
      const delBtn = document.createElement('button')
      delBtn.textContent = "Delete"
      delBtn.addEventListener('click', ()=>{
         todos.splice(index, 1)
         render() //FOR REMOVING TODO FROM DOM
         saveTodos()
      })

      li.appendChild(checkbox);
      li.appendChild(textSpan);
      li.appendChild(delBtn);
      return li;

   
 }

 //RENDER THE WHOLE TODO LIST FROM todos ARRAY
 function render(){
    list.innerHTML = "";

    //RECREATE EACH ITEM
    todos.forEach((todo, index)=>{
        const node = createTodoNode(todo, index);
      //   console.log(todo);
        list.appendChild(node);
 
    })
 }

 function addTodo(){
   const text = input.value.trim()
   if(!text){
      return
   }
 

 //PUSH A NEW TODO OBJECT
   todos.push({text: text, completed: false});
   input.value = " ";
   render()
   saveTodos();

}


//ATTACH EVENT LISTENER TO THE ADD BUTTON
addBtn.addEventListener('click', addTodo)
input.addEventListener('keypress', (e)=>{
   if(e.key === 'Enter'){
      addTodo()
   }
})
render()


// RESET TODO FUNCTIONALITY
function resetTodo() {
   const yess = prompt(`Type "Yes" to reset all TODO Data`);
   
   if (yess.toUpperCase() === "YES") {
       // If the user type "Yes" at any case, reset the todos
       todos.length = 0; // Clear the array
       render();         // Re-render the list
       saveTodos();      // Save the updated todos
   }
   console.warn('--------------- Reseted TODO Data & cleaned the History ---------------');
}

// Attach event listener to the reset button
resetBtn.addEventListener('click', resetTodo);