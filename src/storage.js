const setStorage = (arr) => {
  localStorage.setItem('storage_to-do', JSON.stringify(arr));
};

const getStorage = () => {
  const newArray = [];
  if (localStorage.getItem('storage_to-do')) {
    const parsed = JSON.parse(localStorage.getItem('storage_to-do'));
    for (let i = 0; i < parsed.length; i += 1) {
      newArray.push(parsed[i]);
    }
  }
  return newArray;
};

export { setStorage };
export { getStorage };