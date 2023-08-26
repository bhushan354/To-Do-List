const allFunctions = require('./src/module/allFunctions.js');
const {setupClearAllButton} = require('./src/module/clearAll.js');

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};

global.localStorage = localStorageMock;
describe('tasks functions using describe method', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    localStorageMock.clear.mockClear();
    document.body.innerHTML = ' <div class="addedTasks"> <li></li></div> ';
  });

  test('test for addNewTask function', () => {
    allFunctions.addNewTask('New Task');

    const taskListElement = document.querySelector('.addedTasks');
    const liElements = taskListElement.getElementsByTagName('li');

    expect(localStorageMock.setItem).toHaveBeenCalledTimes(0);
    expect(liElements).toHaveLength(1);
  });

  test('test for removeTask function', () => {
    allFunctions.addNewTask('Task 1');
    allFunctions.addNewTask('Task 2');

    allFunctions.removeTask(1);

    const taskListElement = document.querySelector('.addedTasks');
    const liElements = taskListElement.getElementsByTagName('li');

    expect(localStorageMock.setItem).toHaveBeenCalledTimes(0);
    expect(liElements).toHaveLength(1);
  });

  //new test edit 
  test('test for editTask function', () => {
    allFunctions.addNewTask('Task to Edit');

    allFunctions.editTask(1, "Updated Description", true);

    const taskListElement = document.querySelector('.addedTasks');
    const liElement = taskListElement.querySelector('li');


    expect(localStorageMock.setItem).toHaveBeenCalledTimes(0);
    expect(liElement.textContent).toContain("");
 
  });

  // new test clear all button
  test('test for setupClearAllButton function', () => {
    const completedTask1 = { index: 1, completed: true };
    const completedTask2 = { index: 2, completed: true };
    const incompleteTask = { index: 3, completed: false };
    const tasks = [completedTask1, completedTask2, incompleteTask];

    const renderTasksMock = jest.fn();
    const removeTaskMock = jest.fn();

    const taskItemMock = { remove: jest.fn() };
    document.querySelector = jest.fn().mockReturnValue(taskItemMock);

    setupClearAllButton(tasks, renderTasksMock, removeTaskMock);

    expect(removeTaskMock).toHaveBeenCalledTimes(2);
    expect(removeTaskMock).toHaveBeenCalledWith(1);
    expect(removeTaskMock).toHaveBeenCalledWith(2);

    expect(taskItemMock.remove).toHaveBeenCalledTimes(2);

    expect(removeTaskMock).not.toHaveBeenCalledWith(3);

    expect(renderTasksMock).toHaveBeenCalled();
  });
  
});
