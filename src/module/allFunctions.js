// function to add task to tasks object

import tasks from './taskData.js';

// localsstrorage saving function
export function saveInLocalstorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

export function addNewTask(description) {
  const newTask = { description, completed: false, index: tasks.length + 1 };
  tasks.push(newTask);
  saveInLocalstorage();
}

export function changeIndexes() {
  tasks.forEach((task, index) => {
    task.index = index + 1;
  });
}

export function removeTask(index) {
  // splice(rememberThisArgumentIsTheNo.OfIndexWhichWillBeDeleted   ,
  //  andThisParameterSpecifiesHowManyItemsWillBeDeleted)
  tasks.splice(index - 1, 1);
  changeIndexes();
  saveInLocalstorage();
}

export function editTask(index, newDescription, newCompleted) {
  tasks[index - 1].description = newDescription;
  tasks[index - 1].completed = newCompleted;
  saveInLocalstorage();
}
