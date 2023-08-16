import _ from 'lodash';
import './style.css';
import Data from './data.xml';
import Notes from './data.csv';
import { tasks } from './module/taskData.mjs';

// fnuction to iterat over the tasks array

const addedTasksContainer = document.querySelector('.addedTasks');

function renderTasks() {
  addedTasksContainer.innerHTML = '';

  tasks.sort((a, b) => a.index - b.index);

  tasks.forEach(task => {
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