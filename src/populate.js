/* eslint no-loop-func: 0, import/prefer-default-export: 0 */
import { setStorage, getStorage } from './storage';
import checkbox from './checkboxes';
import { removeIndex } from './index'; // eslint-disable-line
import swap from './swap';
import editItem from './edit-item';

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

    li.addEventListener('dblclick', () => { // Double click to edit
      setStorage(arr);
      li.classList.add('editing');
      li.innerHTML = `<input type="checkbox" id="${i}"></input><input id = "change${i}" class="change" type = "text" value = "${arr[i].description}"></input><i id="remm${i}" class="drag fas fa-trash-alt"></i>`;
      document.getElementById(`change${i}`).focus();
      document.getElementById(`remm${i}`).addEventListener('click', () => {
        removeIndex(i);
      });
    });
    document.body.addEventListener('click', (e) => { // Click outside to confirm changes
      if (!(li.contains(e.target)) && document.getElementById(`change${i}`)) {
        li.classList.remove('editing');
        const arr = getStorage();
        checkbox(editItem(arr, i));
        setStorage(editItem(arr, i));
        content(editItem(arr, i));
      }
    });

    drag.addEventListener('mousedown', () => { // On click down start dragging, make all other drag icons disappear
      active = true;
      const drags = document.getElementsByClassName('drag');
      for (let k = 0; k < drags.length; k += 1) {
        if (k !== i) {
          drags[k].style.display = 'none';
        }
      }
      setTimeout(() => {
        active = true;
      }, 50);
    });
    drag.addEventListener('mousemove', (e) => { //  While moving mouse keep track of the mouse position
      if (active === true) {
        li.style.display = 'none';
        li.classList.add('dragging');
        li.style.position = 'absolute';
        li.style.left = `${e.clientX - 425}px`;
        li.style.top = `${e.clientY - 26}px`;
        const x = e.clientX;
        const y = e.clientY;
        const trgt = document.elementFromPoint(x, y);
        if (trgt.nodeName === 'LI') {
          trgt.classList.add('editing');
          setTimeout(() => {
            trgt.classList.add('backtonormal');
          }, 500);
          setTimeout(() => {
            trgt.classList.remove('editing', 'backtonormal');
          }, 500);
        }
        li.style.display = 'flex';
      }
    });
    drag.addEventListener('mouseup', (e) => { // On mouse up get element on target mouse and swap elements
      li.style.display = 'none';
      const x = e.clientX;
      const y = e.clientY;
      const trgt = document.elementFromPoint(x, y);
      if (trgt.nodeName === 'LI') {
        const tobeswapped = trgt.id.replace(/^\D+/g, '');
        setStorage(swap(getStorage(), i, tobeswapped));
        content(getStorage());
        checkbox(getStorage());
      }
      active = false;
      li.style.display = 'flex';
      li.classList.remove('dragging');
      li.style.position = 'inherit';
      const drags = document.getElementsByClassName('drag');
      for (let i = 0; i < drags.length; i += 1) {
        drags[i].style.display = 'block';
      }
    });

    li.append(drag);
    parent.appendChild(li);
  }
  setStorage(arr);
};

export { content };