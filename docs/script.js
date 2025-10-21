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
      textSpan.style.color = todo.completed ? '#0c0c0c' : "";

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
   let warning = '💔The Day Everything Forgot💔 There was once a tiny world inside your screen — a world made of reminders, lists, and little unfinished dreams. Each task had a name. Each checkbox had purpose. “Buy milk.” “Finish project.” “Call mom.” They weren’t just words — they were memories of moments that mattered. Every day, they waited for you. Some proudly wore their checkmarks like medals of honor. Others still dreamed of completion, whispering, “Tomorrow. He’ll finish me tomorrow.” Then one day, you hovered over the button. That bright, shiny, harmless-looking Reset button. They felt the tremor before it happened. The ground beneath their lines of code started to quake. “Wait—what’s he doing?” said Plan Vacation 🏖. “Maybe it’s just a glitch,” whispered Drink Water 💧. But you clicked it. And in a flash of white, everything went quiet. No checkmarks. No deadlines. No notes about ideas or goals. Just… emptiness. The world of tasks — gone. All their tiny digital lives erased, as if they never existed at all. And somewhere, deep in the silence of your console, a lonely echo remained: > “We were here once. You just forgot.'
   console.warn('%c' + warning, 'font-style: italic; font-weight: bold; font-family: "fantasy"; color: #ff3e52; background-color: #0c0c0c; padding: 10px; border: 2px solid rgb(255, 98, 113);');
}


// Attach event listener to the reset button
resetBtn.addEventListener('click', resetTodo);