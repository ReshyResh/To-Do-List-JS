import { setStorage } from './storage';
import { content } from './populate';

export default (arr) => {
  const form = document.getElementById('input-text').value;
  if ( form !== ''){
    let ind = 0;
    for (let p = 0; p < arr.length; p += 1) { ind = arr[p].index; }
    const blob = {
      description: form,
      completed: false,
      index: ind + 1,
    };
    document.getElementById('input-text').value = '';
    arr.push(blob);
    setStorage(arr);
    return arr;
  }
};
