const todoArray = []; // Array to store To-Dos

const todoForm = document.querySelector(".todo-form");
const todoUl = document.querySelector(".todo-list");
const todoInput = document.querySelector("input[name='todo']");
const addButton = document.querySelector(".add-btn");

/* Renders the todos to the page */
const renderTodos = () => {
  todoUl.innerHTML = "";
  todoArray.forEach((todo) => {
    todoUl.appendChild(todo);
  });
};

/* Create Todo */
const createTodo = (todo) => {
  const todoLi = document.createElement("li");
  todoLi.className = "todo";

  const checkBox = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  checkBox.addEventListener("change", (e) => {
    if (e.target.checked || !e.target.checked) {
      const todo = e.target.nextSibling;
      todo.classList.toggle("todo-done");
    }
  });

  const textDiv = document.createElement("div");
  textDiv.className = "text-div";
  textDiv.appendChild(checkBox);

  const todoText = document.createElement("p");
  todoText.textContent = todo;
  textDiv.appendChild(todoText);
  todoLi.appendChild(textDiv);

  // Edit Button
  const editButton = document.createElement("button");
  editButton.className = "btn edit";
  editButton.textContent = "Edit";
  editButton.addEventListener("click", (e) => {
    e.target.previousSibling.lastChild.textContent =
      prompt("Edit Task:", e.target.previousSibling.textContent) ||
      e.target.previousSibling.textContent;
    todoArray[
      todoArray.indexOf(
        todoArray.find((todo) => todo.firstChild.nextSibling === e.target)
      )
    ] = e.target.parentNode;
    renderTodos();
  });
  todoLi.appendChild(editButton);

  // Delete Button
  const deleteButton = document.createElement("button");
  deleteButton.className = "btn delete";
  deleteButton.textContent = "Delete";
  todoLi.appendChild(deleteButton);
  deleteButton.addEventListener("click", (e) => {
    todoArray.splice(
      todoArray.indexOf(todoArray.find((todo) => todo.lastChild === e.target)),
      1
    );
    renderTodos();
  });
  todoArray.push(todoLi);

  renderTodos();
};

/* Validates the Input */
const validateTodo = () => {
  const formData = new FormData(todoForm);
  const todo = formData.get("todo").trim();
  if (!todo) {
    todoInput.value = "";
    todoInput.style.borderColor = "red";
    todoInput.placeholder = "Cannot Add Empty Task !";
    return;
  }

  createTodo(todo);

  todoInput.style.borderColor = "";
  todoInput.placeholder = "Enter new Task";
  todoInput.value = "";
};

addButton.addEventListener("click", validateTodo);

renderTodos();
