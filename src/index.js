import './style.css';
import tasks from './module/taskData.js';
import { addNewTask } from './module/functionsTasks.js';

// fnuction to iterat over the tasks array

const addedTasksContainer = document.querySelector('.addedTasks');

function renderTasks() {
  addedTasksContainer.innerHTML = '';

  tasks.sort((a, b) => a.index - b.index);

  tasks.forEach((task) => {
    const taskItem = document.createElement('div');
    taskItem.classList.add('task');
    if (task.completed) {
      taskItem.classList.add('completed');
    }

    taskItem.innerHTML = `
      <input type="checkbox" ${task.completed ? 'checked' : ''} />
      <p>${task.description}</p>
      <i class="fa-solid fa-ellipsis-vertical"></i>
    `;

    addedTasksContainer.appendChild(taskItem);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderTasks();
});