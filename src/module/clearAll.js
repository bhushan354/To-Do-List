import { changeIndexes, saveInLocalstorage } from './allFunctions.js';

export default function setupClearAllButton(tasks, renderTasks, removeTask) {
  console.log('Before filter:', tasks);

  const completedTasks = tasks.filter((task) => task.completed);

  completedTasks.forEach((completedTask) => {
    removeTask(completedTask.index);
    const taskItem = document.querySelector(`[data-task-id="${completedTask.index}"]`);
    if (taskItem) {
      taskItem.remove();
    }
  });

  changeIndexes(tasks);

  saveInLocalstorage();
  console.log('after filter:', tasks);

  renderTasks();

  console.log('after filter:', tasks);
}
