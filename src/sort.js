export default (arr, key) => arr.sort((a, b) => { // Sort based on key (Example index)
  const x = a[key];
  const y = b[key];
  if (x < y) {
    return -1;
  }

  return 1;
});