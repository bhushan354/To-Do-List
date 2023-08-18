import { changeIndexes, saveInLocalstorage } from './allFunctions.js';

export default function setupClearAllButton(tasks, renderTasks, removeTask) {
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

  renderTasks();
}
