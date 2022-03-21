export const create2dArray = (size, initValue=undefined) => {
    let x = new Array();
    for(let i=0; i< size; i++){
        x[i] = new Array();
        for(let j=0; j<size; j++){
            x[i][j] = initValue;
        }
    }
    return x;
}