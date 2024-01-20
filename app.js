const form = document.getElementById("new-task-form");
const input = document.getElementById("new-task-input");
const submitBtn = document.getElementById("new-task-submit");
const taskList = document.getElementById("taskList");
let isEditMode = false;
let tasks = [];
let selectedId = null;

const renderTasks = () => {
  const innerHTML = tasks
    .map((item) => {
      return `<li class="taskItem"><p>${item.name}</p>
      <button data-id="${item.id}" type="button" class="deleteButton">Delete</button> 
      <button data-id="${item.id}" type="button" class="editButton">Edit</button>
      </li>`;
    })
    .join("");

  taskList.innerHTML = innerHTML;
  submitBtn.value = isEditMode ? "Save Task" : "Add Task";
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let value = input.value;
  if (!value) {
    alert("Please insert a valid task!");
    return;
  }
  if (!isEditMode) {
    const newTask = { name: value, id: Date.now() };
    tasks.push(newTask);
  } else {
    const editedItem = tasks.find((item) => item.id == selectedId);
    editedItem.name = input.value;
    selectedId = null;
    isEditMode = false;
  }
  input.value = "";
  renderTasks();
});
document.addEventListener("click", (e) => {
  if (e.target.className == "deleteButton") {
    const selectedId = e.target.dataset.id;
    tasks = tasks.filter((item) => item.id != selectedId);
    console.log(tasks);
    renderTasks();
  }

  if (e.target.className == "editButton") {
    const editedId = e.target.dataset.id;
    const editedItem = tasks.find((item) => item.id == editedId);
    selectedId = editedId;
    console.log(editedItem);
    console.dir(e.target);
    input.value = editedItem.name;
    isEditMode = true;
    submitBtn.value = "Save Task";
  }
});
