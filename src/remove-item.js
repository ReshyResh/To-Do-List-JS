export default (arr) => {
  const toremove = [];
  for (let i = 0; i < arr.length; i += 1) {
    if (document.getElementById(i).checked) { toremove.push(i); }
  }
  let counter = 0;
  toremove.forEach((element) => {
    arr.splice(element - counter, 1);
    counter += 1;
  });
  return arr;
};