import _ from 'lodash';
import './style.css';
import {sort} from './sort.js';

const parent = document.getElementById('list');
const tasks = [
  {
    description: "Task 2",
    completed: false,
    index:1
  },
  {
    description: "Task 1",
    completed: false,
    index:0
  },
  {
    description: "Task 3",
    completed: false,
    index:2
  }
];

sort(tasks, 'index');
console.log(tasks);

function component() {
    for( let i = 0; i <= tasks.length; i+= 1){
          const li = document.createElement('li');
          const box = document.createElement('input');
          const drag = document.createElement('i');
          drag.classList.add('drag','fas','fa-grip-vertical');
          box.setAttribute('type','checkbox');
          box.id = i;
          li.append(box);
          li.append (`${tasks[i].description}`);
          li.append(drag);
          parent.appendChild(li);
        }
  }

  document.body.addEventListener('click', (e) => {
    console.log(e.clientX);
    console.log(e.clientY);
  });
  
  document.onload = component();