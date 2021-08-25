export default (arr, index) => { // Trash bin click function
  arr.splice(index, 1);
  for (let j = 0; j < arr.length; j += 1) {
    arr[j].index = j;
  }
  return arr;
};