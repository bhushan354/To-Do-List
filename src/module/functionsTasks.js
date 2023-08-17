// function to add task to tasks object

import tasks from './taskData.js';

function addNewTask() {
  const newTask = { description: ' wash the dishes ', completed: false, index: 1 };
  tasks.push(newTask);
}

export default addNewTask();