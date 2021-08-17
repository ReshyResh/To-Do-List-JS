/* eslint no-loop-func: 0, no-unused-vars: 0 */
import _, { remove } from 'lodash';
import './style.css';
import sort from './sort';
import add from './add-item.js';
import rem from './remove-item';
import checkbox from './checkboxes';
import defaults from './content';
import { setStorage, getStorage } from './storage';

const parent = document.getElementById('list');
const clear = document.getElementById('completed');
const form = document.getElementById('add');
let tasks = getStorage();

sort(defaults, 'index');
sort(tasks, 'index');

let active = false;

const content = (arr) => {
  parent.innerHTML = '';
  for (let i = 0; i <= arr.length; i += 1) {
    const li = document.createElement('li');
    const box = document.createElement('input');
    const drag = document.createElement('i');
    drag.classList.add('drag', 'fas', 'fa-grip-vertical');
    box.setAttribute('type', 'checkbox');
    box.id = i;
    if (arr[i].completed === 'true') {
      box.checked = true;
      li.style.textDecoration = 'line-through';
    }
    li.id = `item${i}`;
    li.append(box);
    li.append(`${arr[i].description}`);

    li.addEventListener('dblclick', () => {
      li.innerHTML = `<input type="checkbox" id="${i}"></input><input id = "change${i}" class="change" type = "text" value = "${arr[i].description}"></input>`
    });
    document.body.addEventListener('click', (e) => {
      if (!(parent.contains(e.target))) {
        arr[i].description = document.getElementById(`change${i}`).value;
        setStorage(arr);
        content(arr);
      }
    });

    drag.addEventListener('mousedown', () => {
      active = true;
    });

    drag.addEventListener('mousemove', (e) => {
      if (active === true) {
        li.classList.add('dragging');
        li.style.position = 'absolute';
        li.style.left = `${e.clientX - 425}px`;
        li.style.top = `${e.clientY - 26}px`;
      }
    });

    drag.addEventListener('mouseup', () => {
      li.classList.remove('dragging');
      li.style.position = 'inherit';
      active = false;
    });

    li.append(drag);
    parent.appendChild(li);
  }
  setStorage(arr);
};

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
document.onload = getStorage();
if (localStorage.getItem('storage_to-do')) {
  content(getStorage());
} else {
  tasks = defaults;
  content(tasks);
}