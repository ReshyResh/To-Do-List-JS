/* eslint no-loop-func: 0, no-unused-vars: 0 */
import _ from 'lodash';
import './style.css';
import sort from './sort';
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

    box.addEventListener('change', () => {
      for (let k = 0; k < arr.length; k += 1) {
        if (document.getElementById(k).checked) {
          arr[k].completed = 'true';
          setStorage(arr);
          document.getElementById(`item${k}`).style.textDecoration = 'line-through';
        } else {
          arr[k].completed = 'false';
          setStorage(arr);
          document.getElementById(`item${k}`).style.textDecoration = 'none';
        }
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
  const toremove = [];
  for (let i = 0; i < tasks.length; i += 1) {
    if (document.getElementById(i).checked) { toremove.push(i); }
  }
  let counter = 0;
  toremove.forEach((element) => {
    tasks.splice(element - counter, 1);
    counter += 1;
  });
  setStorage(tasks);
  content(tasks);
});

form.addEventListener('click', () => {
  const form = document.getElementById('input-text').value;
  let ind = 0;
  for (let p = 0; p < tasks.length; p += 1) { ind = tasks[p].index; }
  const blob = {
    description: form,
    completed: false,
    index: ind + 1,
  };
  tasks.push(blob);
  setStorage(tasks);
  content(tasks);
});

document.onload = getStorage();
if (localStorage.getItem('storage_to-do')) {
  content(getStorage());
} else {
  tasks = defaults;
  content(tasks);
}
