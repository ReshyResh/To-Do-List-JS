/* eslint no-loop-func: 0, import/prefer-default-export: 0 */
import { setStorage } from './storage';
import checkbox from './checkboxes';
import { removeIndex } from './index'; // eslint-disable-line

const parent = document.getElementById('list');

const content = (arr) => {
  let active = false;
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
      li.classList.add('editing');
      li.innerHTML = `<input type="checkbox" id="${i}"></input><input id = "change${i}" class="change" type = "text" value = "${arr[i].description}"></input><i id="remm${i}" class="drag fas fa-trash-alt"></i>`;
      document.getElementById(`change${i}`).focus();
      document.getElementById(`remm${i}`).addEventListener('click', () => {
        removeIndex(i);
      });
    });
    document.body.addEventListener('click', (e) => {
      if (!(li.contains(e.target))) {
        li.classList.remove('editing');
        arr[i].description = document.getElementById(`change${i}`).value;
        checkbox(arr);
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

export { content };