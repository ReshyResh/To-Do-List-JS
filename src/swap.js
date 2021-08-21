export default (arr,index1,index2) => {
    console.log("Swapping ",arr[index1].completed," with ",arr[index2].completed );
    let temp1 = arr[index1].description;
    let temp2 = arr[index1].completed;
    arr[index1].description = arr[index2].description;
    arr[index1].completed = arr[index2].completed;
    arr[index2].description = temp1;
    arr[index2].completed = temp2;
    return arr;
};