export default (arr) => {
  for (let k = 0; k < arr.length; k += 1) {
    if (document.getElementById(k).checked) {
      arr[k].completed = 'true';
      document.getElementById(`item${k}`).style.textDecoration = 'line-through';
    } else {
      arr[k].completed = 'false';
      document.getElementById(`item${k}`).style.textDecoration = 'none';
    }
  }
};