let nightMode = false;
let editId;
const nightModeToggleBtn = document.querySelector("#nightModeToggle");
const body = document.querySelector("body");

function nightModeToggle() {
  if (nightMode) {
    body.style.backgroundColor = "white";
    nightModeToggleBtn.innerText = "Dark Mode";
    body.style.color = "black";
    nightMode = false;
  } else {
    body.style.backgroundColor = "black";
    nightModeToggleBtn.innerText = "Light Mode";
    body.style.color = "white";
    nightMode = true;
  }
}
nightModeToggleBtn.addEventListener("click", nightModeToggle);

// add list here

const parentTodoListUl = document.querySelector("#todoList");
const addTodoBtn = document.querySelector("#addTodo");
const newTodoInput = document.querySelector("#newTodo");

let todoList = JSON.parse(localStorage.getItem("todos"));

function renderList(array) {
  let index = 1;
  parentTodoListUl.innerHTML = "";
  for (let list of array) {
    let div = document.createElement("div");
    div.className = "task";

    let todoItem = document.createElement("li");
    let todoStatus = document.createElement("button");
    let deleteBtn = document.createElement("button");
    let editTodo = document.createElement("button");
    editTodo.innerText = 'Edit'
    editTodo.addEventListener('click', function(){
      editId = list.id
    })

    deleteBtn.innerText = 'Delete'
    deleteBtn.addEventListener('click', function(){
      deleteTask(list.id)
    })

    todoStatus.addEventListener("click", function () {
      if (todoStatus.innerText === "Status: Completed") {
        updateMyTask(list.id, "Status: Pending", index);
      } else {
        updateMyTask(list.id, "Status: Completed", index);
      }
    });

    todoStatus.innerText = list.status;
    todoItem.innerText = index + ". " + list.title;
    index++;
    div.append(todoItem, todoStatus, deleteBtn, editTodo);
    parentTodoListUl.append(div);
  }
}
renderList(todoList);

let id = todoList.length || 0;
addTodoBtn.addEventListener("click", function () {
  const valueOfNewTodo = newTodoInput.value;
  const task = { id, title: valueOfNewTodo, status: "Status: Pending" };
  todoList.push(task);
  renderList(todoList);
  id++;
  localStorage.setItem('todos', JSON.stringify(todoList))

});

function updateMyTask(index = 0, updateStatus, index1) {
  todoList[index].status = updateStatus;
  renderList([...todoList]);
  localStorage.setItem('todos', JSON.stringify(todoList))

}

function deleteTask(index){
  const newTodoList = todoList.filter((el)=>el.id != index)
  renderList(todoList)
  todoList = newTodoList
  localStorage.setItem('todos', JSON.stringify(newTodoList))
}

function editTask(){
  const newValue = document.querySelector('#editInput').value
  const newTodoList = todoList.map((el)=>{
    if(editId === el.id){
      return {...el,title:newValue}
    }else{
      return el
    }
  })
  renderList(todoList)
  todoList = newTodoList
  localStorage.setItem('todos', JSON.stringify(newTodoList))
}