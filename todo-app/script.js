const input = document.querySelector("input");
const addButton = document.querySelector(".add-button");
const todosHtml = document.querySelector(".todos");
const emptyImage = document.querySelector(".empty-image");
let todosJson = JSON.parse(localStorage.getItem("todos")) || [];

showTodos();

function getTodoHtml(todo, index) {
  return `
    <li class="todo ${todo.status}" data-index="${index}" onclick="toggleComplete(this)">
      ${todo.name}
      <button class="delete-btn" data-index="${index}" onclick="remove(event, this)"><i class="fa fa-times"></i></button>
    </li>
  `;
}

function showTodos() {
  if (todosJson.length == 0) {
    todosHtml.innerHTML = '';
  } else {
    todosHtml.innerHTML = todosJson.map(getTodoHtml).join('');
  }
}

function addTodo(todo) {
  input.value = "";
  todosJson.unshift({ name: todo, status: "pending" });
  localStorage.setItem("todos", JSON.stringify(todosJson));
  showTodos();
}

input.addEventListener("keyup", e => {
  let todo = input.value.trim();
  if (!todo || e.key != "Enter") {
    return;
  }
  addTodo(todo);
});

addButton.addEventListener("click", () => {
  let todo = input.value.trim();
  if (!todo) {
    return;
  }
  addTodo(todo);
});

window.toggleComplete = function(taskItem) {
  const index = taskItem.dataset.index;
  todosJson[index].status = todosJson[index].status === 'completed' ? 'pending' : 'completed';
  localStorage.setItem("todos", JSON.stringify(todosJson));
  showTodos();
};

window.remove = function(event, button) {
  event.stopPropagation();  
  const index = button.dataset.index;
  todosJson.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todosJson));
  showTodos();
};
