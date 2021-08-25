/**
 * @jest-environment jsdom
 */
/* eslint no-unused-vars: 0 */
import add from './add-item';
import removeSplice from './remove-one';
import editItem from './edit-item';
import checkbox from './checkboxes';
import swap from './swap';
import { setStorage } from './storage';
import clear from './remove-item';

describe('Add/Remove', () => {
  test('Add one new item to the list', () => {
    const arr = [
      {
        description: 'Task 1',
        completed: false,
        index: 1,
      },
    ];
    document.body.innerHTML = '<input id="input-text" value="Item added for test purposes">';
    add(arr);
    add(arr);
    add(arr);
    add(arr);
    expect(arr).toHaveLength(5);
  });

  test('Remove one item from the list', () => {
    const arr = [
      {
        description: 'Task 1',
        completed: false,
        index: 0,
      },
      {
        description: 'Task 2',
        completed: false,
        index: 1,
      },
    ];
    removeSplice(arr, 0);
    expect(arr).toHaveLength(1);
  });
});

describe('Edit/Checkbox/Swap/Clear', () => {
  test('Edit a task description', () => {
    document.body.innerHTML = '<input id="change0" value="This is an edit of task at index 0">';
    const arr = [
      {
        description: 'Task 1',
        completed: false,
        index: 0,
      },
      {
        description: 'Task 2',
        completed: false,
        index: 1,
      },
    ];
    editItem(arr, 0);
    expect(arr[0].description).toBe('This is an edit of task at index 0');
  });

  test('Update completed status based on checkbox', () => {
    document.body.innerHTML = '<li id="item0"><input type="checkbox" checked id="0"><li id="item1"><input type="checkbox" id="1">';
    const arr = [
      {
        description: 'Task 1',
        completed: false,
        index: 0,
      },
      {
        description: 'Task 2',
        completed: false,
        index: 1,
      },
    ];

    checkbox(arr);
    expect(arr[0].completed).toBe('true');
  });

  test('Swap values upon drag and drop', () => {
    const arr = [
      {
        description: 'Task 1',
        completed: false,
        index: 0,
      },
      {
        description: 'Task 2',
        completed: false,
        index: 1,
      },
    ];

    swap(arr, 0, 1);
    expect(arr[0].description).toBe('Task 2');
    expect(arr[1].description).toBe('Task 1');
  });

  test('Clear all completed', () => {
    const arr = [
      {
        description: 'Task 1',
        completed: 'true',
        index: 0,
      },
      {
        description: 'Task 2',
        completed: 'false',
        index: 1,
      },
      {
        description: 'Task 3',
        completed: 'true',
        index: 2,
      },
    ];
    clear(arr);
    expect(arr).toHaveLength(1);
  });
});