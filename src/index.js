/* eslint no-loop-func: 0, no-use-before-define: 0 */
import _, { remove } from 'lodash'; // eslint-disable-line
import './style.css';
import sort from './sort';
import add from './add-item';
import rem from './remove-item';
import checkbox from './checkboxes';
import defaults from './content';
import removeSplice from './remove-one';
import { setStorage, getStorage } from './storage';
import { content } from './populate'; // eslint-disable-line

const clear = document.getElementById('completed');
const form = document.getElementById('add');
let tasks = getStorage();

sort(defaults, 'index');
sort(tasks, 'index');

const removeIndex = (index) => {
  removeSplice(tasks, index);
  setStorage(tasks);
  content(tasks);
};
export { removeIndex }; // eslint-disable-line

clear.addEventListener('click', () => {
  rem(tasks);
  setStorage(tasks);
  content(tasks);
});

form.addEventListener('click', () => {
  tasks.push(add(tasks));
  setStorage(tasks);
  content(tasks);
});

document.body.addEventListener('change', () => { checkbox(tasks); setStorage(tasks); });
document.addEventListener('DOMContentLoaded', () => {
  content(tasks);
}); if (localStorage.getItem('storage_to-do')) {
  content(getStorage());
} else {
  tasks = defaults;
  content(tasks);
}
