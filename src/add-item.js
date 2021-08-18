export default (arr) => {
  const form = document.getElementById('input-text').value;
  let ind = 0;
  for (let p = 0; p < arr.length; p += 1) { ind = arr[p].index; }
  const blob = {
    description: form,
    completed: false,
    index: ind + 1,
  };
  document.getElementById('input-text').value = '';
  return blob;
};
