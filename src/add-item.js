import { setStorage } from './storage';

export default (arr) => { // Add new task from form input, with updated index
  let form = document.getElementById('input-text').value;
  let ind = 0;
  for (let p = 0; p < arr.length; p += 1) { ind = arr[p].index; }
  if (form.length === 0) { form = 'Empty task'; }
  const blob = {
    description: form,
    completed: false,
    index: ind + 1,
  };
  document.getElementById('input-text').value = '';
  arr.push(blob);
  setStorage(arr);
  return arr;
};
