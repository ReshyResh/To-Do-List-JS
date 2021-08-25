/* eslint no-loop-func: 0, no-use-before-define: 0 */
import _, { remove } from 'lodash'; // eslint-disable-line
import './style.css';
import sort from './sort';
import add from './add-item';
import rem from './remove-item'; // eslint-disable-line
import checkbox from './checkboxes';
import defaults from './content';
import removeSplice from './remove-one';
import { setStorage, getStorage } from './storage';
import { content } from './populate'; // eslint-disable-line

const clear = document.getElementById('completed');
const form = document.getElementById('add');
let tasks = getStorage();

sort(defaults, 'index'); // Dummy functions that were only needed during the first capstone
sort(tasks, 'index');

const removeIndex = (index) => { // Remove only one item by clicking the trash bin
  setStorage(removeSplice(getStorage(), index));
  content(getStorage());
};
export { removeIndex }; // eslint-disable-line

clear.addEventListener('click', () => { // Clear all completed
  content(rem(getStorage()));
});

form.addEventListener('click', () => { // Add new task
  content(add(getStorage()));
});

document.body.addEventListener('change', () => { checkbox(getStorage()); }); // Everytime there's a change (Checkbox click)
document.addEventListener('DOMContentLoaded', () => { //  Populate
  content(tasks);
}); if (localStorage.getItem('storage_to-do')) { // If there's storage, load it
  content(getStorage());
} else {
  tasks = defaults;
  setStorage(defaults);
  content(tasks);
}
