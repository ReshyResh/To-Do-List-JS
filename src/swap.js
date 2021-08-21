import { setStorage } from './storage';

export default (arr, index1, index2) => {
  const temp1 = arr[index1].description;
  const temp2 = arr[index1].completed;
  arr[index1].description = arr[index2].description;
  arr[index1].completed = arr[index2].completed;
  arr[index2].description = temp1;
  arr[index2].completed = temp2;
  setStorage(arr);
  return arr;
};