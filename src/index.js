import './style.css';
import tasks from './module/taskData.js';
import { addNewTask, removeTask, editTask } from './module/allFunctions.js';
import { setupClearAllButton } from './module/clearAll.js';

const addedTasksContainer = document.querySelector('.addedTasks');
const typeTasksInput = document.getElementById('typeTasks');

function renderTasks() {
  addedTasksContainer.innerHTML = '';

  tasks.sort((a, b) => a.index - b.index);

  tasks.forEach((task, index) => {
    const taskItem = document.createElement('div');
    taskItem.classList.add('task');
    if (task.completed) {
      taskItem.classList.add('completed');
    }

    taskItem.innerHTML = `
      <input type="checkbox" ${task.completed ? 'checked' : ''} />
      <p>${task.description}</p>
      <i class="fa-solid fa-ellipsis-vertical"></i>
      <i class="fa-regular fa-square-minus" style="display:none"></i>
    `;

    addedTasksContainer.appendChild(taskItem);

    const deleteTaskbtn = taskItem.querySelector('.fa-square-minus');
    const optionbtn = taskItem.querySelector('.fa-ellipsis-vertical');
    const checkbox = taskItem.querySelector('input[type="checkbox"]');

    optionbtn.addEventListener('click', () => {
      deleteTaskbtn.style.display = '';
      optionbtn.style.display = 'none';

      const taskDescription = taskItem.querySelector('p');
      const originalDescription = taskDescription.textContent;

      const editInput = document.createElement('input');
      editInput.type = 'text';
      editInput.classList.add('edit-input');
      editInput.value = originalDescription;

      editInput.addEventListener('input', () => {
        const newDescription = editInput.value;
        editTask(index + 1, newDescription);
      });

      taskDescription.innerHTML = '';
      taskDescription.appendChild(editInput);
    });

    deleteTaskbtn.addEventListener('click', () => {
      removeTask(index + 1);
      renderTasks();
    });

    checkbox.addEventListener('change', () => {
      const newCompleted = checkbox.checked;
      editTask(index + 1, task.description, newCompleted);
      renderTasks();
    });
  });

}

export { renderTasks };

document.addEventListener('DOMContentLoaded', () => {
  const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(...storedTasks);

  renderTasks();
});

typeTasksInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addNewTask(typeTasksInput.value);
    typeTasksInput.value = '';
    renderTasks();
  }
});

setupClearAllButton(tasks, renderTasks);