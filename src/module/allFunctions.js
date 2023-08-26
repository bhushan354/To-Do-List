const tasks = require('./taskData.js');

function saveInLocalstorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function changeIndexes(tasks) {
  tasks.forEach((task, index) => {
    task.index = index + 1;
  });
}

function addNewTask(description) {
  const newTask = { description, completed: false, index: tasks.length + 1 };
  tasks.push(newTask);
  changeIndexes(tasks);
  saveInLocalstorage();
}

function removeTask(index) {
  tasks.splice(index - 1, 1);
  changeIndexes(tasks);
  saveInLocalstorage();
}

function editTask(index, newDescription, newCompleted) {
  tasks[index - 1].description = newDescription;
  tasks[index - 1].completed = newCompleted;
  saveInLocalstorage();
}

module.exports = {
  addNewTask,
  removeTask,
  editTask,
  changeIndexes,
  saveInLocalstorage,
};
