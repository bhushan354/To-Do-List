import { changeIndexes, saveInLocalstorage } from './allFunctions.js';


export function setupClearAllButton(tasks, renderTasks) {
  const clearAllButton = document.querySelector('.clearAll');

  clearAllButton.addEventListener('click', () => {

    console.log('Before filter:', tasks);

    tasks = tasks.filter(task => !task.completed);

    console.log('after filter:', tasks);

    changeIndexes();
    saveInLocalstorage();

    renderTasks();
  });
}
