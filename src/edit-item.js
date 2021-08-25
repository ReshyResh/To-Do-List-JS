export default (arr, index) => {
  arr[index].description = document.getElementById(`change${index}`).value;
  return arr;
};