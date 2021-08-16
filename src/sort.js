const sort = (arr, key) => {
    return arr.sort((a, b) => {
     let x = a[key]; 
     let y = b[key];
     if ( x < y) {
       return -1;
     }
     else {
       return 1;
     }
     });
    };
export {sort};