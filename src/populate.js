/* eslint no-loop-func: 0, import/prefer-default-export: 0 */
import { setStorage, getStorage } from './storage';
import checkbox from './checkboxes';
import { removeIndex } from './index'; // eslint-disable-line
import swap from './swap';

const parent = document.getElementById('list');

const content = (arr) => {
  setStorage(arr);
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
        content(removeIndex(arr,i));
        checkbox(removeIndex(arr,i));
        setStorage(removeIndex(arr,i));
      });
    });
    document.body.addEventListener('click', (e) => {
      if (!(li.contains(e.target))) {
        li.classList.remove('editing');
        let arr2 = getStorage();
        let value = document.getElementById(`change${i}`).value;
        arr2[i].description = value;
        checkbox(arr2);
        setStorage(arr2);
        content(arr2);
      }
    });
    drag.addEventListener('mousedown', () => {
      let drags = document.getElementsByClassName('drag');
      for(let k = 0; k < drags.length; k += 1) {
        if(k != i){
          drags[k].style.display = 'none';
        }
      }
      setTimeout(() => {
        active = true;
      }, 50);
      
      
    });
    drag.addEventListener('mousemove', (e) => {
      if (active === true) {
        li.style.display = "none";
        li.classList.add('dragging');
        li.style.position = 'absolute';
        li.style.left = `${e.clientX - 425}px`;
        li.style.top = `${e.clientY - 26}px`;
        let x = e.clientX;
        let y = e.clientY;
        let trgt = document.elementFromPoint(x,y);
        if(trgt.nodeName == "LI"){
          console.log("Targetting correctly");
          trgt.classList.add("editing");
          setTimeout(() => {
            trgt.classList.add("backtonormal");
          }, 500);
          setTimeout(() => {
            trgt.classList.remove('editing','backtonormal');
          }, 500);
        }
        li.style.display = "flex";
      }   
    });
    drag.addEventListener('mouseup', (e) => {
      li.style.display = "none";
      let x = e.clientX;
      let y = e.clientY;
      let trgt = document.elementFromPoint(x,y);
      if(trgt.nodeName == "LI"){
        console.log("It's an li with id ",trgt.id.replace( /^\D+/g, ''));
        let tobeswapped = trgt.id.replace( /^\D+/g, '');
        content(swap(arr,i,tobeswapped));
      }
      console.log("You have targeted",trgt);
      active = false;
      li.style.display = "flex";
      li.classList.remove('dragging');
      li.style.position = 'inherit';
      let drags = document.getElementsByClassName('drag');
      for(let i = 0; i < drags.length; i += 1) {
        drags[i].style.display = 'block';
      }
    });

    li.append(drag);
    parent.appendChild(li);
  }
  setStorage(arr);
};

export { content };