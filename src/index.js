import _ from 'lodash';
import './style.css';
import {sort} from './sort.js';
import {tasks} from './content.js';

const parent = document.getElementById('list');
sort(tasks, 'index');

let active = false;

content = () => {
    for( let i = 0; i <= tasks.length; i+= 1){
          const li = document.createElement('li');
          const box = document.createElement('input');
          const drag = document.createElement('i');
          drag.classList.add('drag','fas','fa-grip-vertical');
          box.setAttribute('type','checkbox');
          box.id = i;
          li.append(box);
          li.append (`${tasks[i].description}`);
          drag.addEventListener('mousedown', (e) => {
            console.log("Mouse down!");
            console.log(e.clientX);
            console.log(e.clientY);
            active = true;
          });
          drag.addEventListener('mousemove', (e) => {
            if (active == true) {
            console.log("Mouse moving!");
            console.log(e.clientX);
            console.log(e.clientY);
            }
            else {
              console.log("Not active!");
            }
          });
          drag.addEventListener('mouseup', (e) => {
            console.log("Mouse up!");
            console.log(e.clientX);
            console.log(e.clientY);
            active = false;
          });
          li.append(drag);
          parent.appendChild(li);
        }
  }



  
  document.onload = content();