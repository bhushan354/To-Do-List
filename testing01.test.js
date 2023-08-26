const allFunctions = require('./src/module/allFunctions.js');

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
});
