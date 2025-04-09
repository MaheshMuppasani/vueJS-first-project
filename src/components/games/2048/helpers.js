export function getRandomCoordinates(size) {
    let x = Math.floor(Math.random() * size);
    let y = Math.floor(Math.random() * size);
    return [x, y];
}

export function getRandomValueFromArray(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// function boardLeftMove(board) {
//     for (let i = 0; i < board.length; i++) {
//       for (let j = 1; j < board.length; j++) {
//         if (board[i][j]) {
//           let current = j;
//           while (current !== 0 && !board[i][current - 1]) {
//             board[i][current - 1] = board[i][current];
//             board[i][current] = undefined;
//             current--;
//           }
//         }
//       }
//     }
//     return board;
//   }
//   function addLeft(board, next) {
//     for (let i = 0; i < board.length; i++) {
//       for (let j = 1; j < board.length; j++) {
//         if (board[i][j]) {
//           let current = j;
//           if (board[i][current - 1] === board[i][current]) {
//             next(board[i][current - 1] *= 2);
//             board[i][current] = undefined;
//           }
//         }
//       }
//     }
//     return board;
//   }
//   function boardTopMove(board) {
//     for (let j = 0; j < board.length; j++) {
//       for (let i = 1; i < board.length; i++) {
//         if (board[i][j]) {
//           let current = i;
//           while (current !== 0 && !board[current - 1][j]) {
//             board[current - 1][j] = board[current][j];
//             board[current][j] = undefined;
//             current--;
//           }
//         }
//       }
//     }
//     return board;
//   }
//   function addTop(board, next) {
//     for (let j = 0; j < board.length; j++) {
//       for (let i = 1; i < board.length; i++) {
//         if (board[i][j]) {
//           let current = i;
//           if (board[current - 1][j] === board[current][j]) {
//             next(board[current - 1][j] *= 2);
//             board[current][j] = undefined;
//           }
//         }
//       }
//     }
//     return board;
//   }
//   function boardRightMove(board) {
//     for (let i = 0; i < board.length; i++) {
//       for (let j = board.length - 2; j >= 0; j--) {
//         if (board[i][j]) {
//           let current = j;
//           while (current !== board.length - 1 && !board[i][current + 1]) {
//             board[i][current + 1] = board[i][current];
//             board[i][current] = undefined;
//             current++;
//           }
//         }
//       }
//     }
//     return board;
//   }
//   function addRight(board, next) {
//     for (let i = 0; i < board.length; i++) {
//       for (let j = board.length - 2; j >= 0; j--) {
//         if (board[i][j]) {
//           let current = j;
//           if (board[i][current + 1] === board[i][current]) {
//             next(board[i][current + 1] *= 2)
//             board[i][current] = undefined;
//           }
//         }
//       }
//     }
//     return board;
//   }
//   function boardBottomMove(board) {
//     for (let j = 0; j < board.length; j++) {
//       for (let i = board.length - 2; i >= 0; i--) {
//         if (board[i][j]) {
//           let current = i;
//           while (current !== board.length - 1 && !board[current + 1][j]) {
//             board[current + 1][j] = board[current][j];
//             board[current][j] = undefined;
//             current++;
//           }
//         }
//       }
//     }
//     return board;
//   }
//   function addBottom(board, next) {
//     for (let j = 0; j < board.length; j++) {
//       for (let i = board.length - 2; i >= 0; i--) {
//         if (board[i][j]) {
//           let current = i;
//           if (board[current + 1][j] === board[current][j]) {
//             next(board[current + 1][j] *= 2);
//             board[current][j] = undefined;
//           }
//         }
//       }
//     }
//     return board;
//   }
// export const boardUtils = {
//     addTop,
//     addBottom,
//     addLeft,
//     addRight,
//     boardBottomMove,
//     boardLeftMove,
//     boardRightMove,
//     boardTopMove,
// }

export function getPossibleMoves(board, size) {
    return board.filter((row, i) => {
      return row.some((val, j) => {
        if (!val) return false;
        let neighbours = [];
        if (i > 0 && i < size - 1) {
          if (j > 0 && j < size - 1) {
            neighbours = [board[i - 1][j], board[i + 1][j], board[i][j - 1], board[i][j + 1]];
          } else if (j === 0) {
            neighbours = [board[i - 1][j], board[i + 1][j], board[i][j + 1]];
          } else if (j === size - 1) {
            neighbours = [board[i - 1][j], board[i + 1][j], board[i][j - 1]];
          }
        } else if (i === 0) {
          if (j > 0 && j < size - 1) {
            neighbours = [board[i + 1][j], board[i][j - 1], board[i][j + 1]];
          } else if (j === 0) {
            neighbours = [board[i + 1][j], board[i][j + 1]];
          } else if (j === size - 1) {
            neighbours = [board[i + 1][j], board[i][j - 1]];
          }
        } else if (i === size - 1) {
          if (j > 0 && j < size - 1) {
            neighbours = [board[i - 1][j], board[i][j - 1], board[i][j + 1]];
          } else if (j === 0) {
            neighbours = [board[i - 1][j], board[i][j + 1]];
          } else if (j === size - 1) {
            neighbours = [board[i - 1][j], board[i][j - 1]];
          }
        }

        if (val && neighbours.includes(val)) return true;
        return false;
      });
    });
  }

export function setStyleProperties(elem, props) {
  Object.keys(props).forEach((key) => {
    elem.style.setProperty(key, props[key]);
  });
}

export const initBoardParams = (size) => {
  const screenWidth = window.innerWidth;
  let cs = 10, csLen = 100;
  if(screenWidth < 1024){
    cs = 8;
    csLen = 80;
  }
  const cellSpace = cs * (3 / size);
  const cellSideLength = csLen * (4 / size);
  return {
    size: size,
    cellSpace,
    cellSideLength,
    fontSize: (cellSideLength * 35) / 100,
    containerWidth: cellSideLength * size + cellSpace * (size + 1),
  };
}

export function getNumberBackgroundColor(number){
  switch(number){
      case 2:return"#fffaf2";
      case 4:return"#f7ffda";
      case 8:return"#c9ff8b";
      case 16:return"#89ff6c";
      case 32:return"#5ec046";
      case 64:return"#42962d";
      case 128:return"#009c8f";
      case 256:return"#0bc7b7";
      case 512:return"#04a1bd";
      case 1024:return"#0079be";
      case 2048:return"#0c59be";
      case 4096:return"#a6c";
      case 8192:return"#93c";
  }
  return "black";
}

export function getTextColor(number){
  if(number<=4) return '#303030';
  return 'white';
}
export function domNodes(nodeList){
  function remove(){
      nodeList.forEach(node => {
          node.remove();
      })
  }
  return {
      remove
  }
}
function canMoveLeft(board){
  const size = board.length;
  for(let i= 0 ;i<size;i++) {
      for (let j = 1; j < size; j++) {
          if(board[i][j]!=0)
              if(board[i][j-1]==0||board[i][j-1]==board[i][j])
              return true;
      }
  }
  return false;
}
function canMoveUp(board){
  const size = board.length;
  for(var i= 1 ;i<size;i++) {
      for (var j = 0; j < size; j++) {
          if(board[i][j]!=0)
              if(board[i-1][j]==0||board[i-1][j]==board[i][j])
                  return true;
      }
  }
  return false;
}
function canMoveDown(board){
  const size = board.length;
  for(var i= size-2;i>=0;i--) {
      for (var j = 0; j < size; j++) {
          if(board[i][j]!=0)
              if(board[i+1][j]==0||board[i+1][j]==board[i][j])
                  return true;
      }
  }
  return false;
}
function noBlockHorizontal(row,col1,col2,board){
  for(var i=col1+1;i<col2;i++){
      if(board[row][i]!=0){
          return false;
      }
  }
  return true;
}
export function moveLeft(board, hasConflicted, showMoveAnimation, incrementScore){
  if(!canMoveLeft(board)) {
    return false;
  }
  const size = board.length;
  for(var i= 0; i<size; i++) {
    for (var j=1; j<size; j++) {
        if(board[i][j]!=0){
            for(var k=0;k<j;k++){
                if(board[i][k]==0&& noBlockHorizontal(i,k,j,board)){
                    showMoveAnimation(i,j,i,k);
                    board[i][k]=board[i][j];
                    board[i][j]=0;
                    break;
                }
                else if(board[i][k]==board[i][j]&& noBlockHorizontal(i,k,j,board)&&!hasConflicted[i][k])
                {
                    showMoveAnimation(i,j,i,k);
                    board[i][k]+=board[i][j];
                    board[i][j]=0;
                    hasConflicted[i][k]=true;
                    if(incrementScore){
                      incrementScore(board[i][k]);
                    }
                    break;
                }
            }
        }
    }
}
    return true;
}
function noBlockVertical(col,row1,row2,board){
  for(var i=row1+1;i<row2;i++){
      if(board[i][col]!=0){
          return false;
      }
  }
  return true;

}
export function moveUp(board, hasConflicted, showMoveAnimation, incrementScore){
  if(!canMoveUp(board)) {
    return false;
  }
  const size = board.length;
  for(var i= 1 ;i<size;i++) {
      for (var j = 0; j < size; j++) {
          if(board[i][j]!=0){
              for(var k=0;k<i;k++){
                  if(board[k][j]==0&& noBlockVertical(j,k,i,board)){
                      showMoveAnimation(i,j,k,j);
                      board[k][j]=board[i][j];
                      board[i][j]=0;
                      break;
                  }
                  else if(board[k][j]==board[i][j]&& noBlockVertical(j,k,i,board)&&!hasConflicted[k][j])
                  {
                      showMoveAnimation(i,j,k,j);
                      board[k][j]+=board[i][j];
                      board[i][j]=0;
                      hasConflicted[k][j]=true;
                      if(incrementScore){
                        incrementScore(board[k][j]);
                      }
                      break;
                  }
              }
          }
      }
  }
  return true;
}
function canMoveRight(board){
  const size = board.length;
  for(var i= 0 ;i<size;i++) {
      for (var j = size-2;j>=0; j--) {
          if(board[i][j]!=0)
              if(board[i][j+1]==0||board[i][j+1]==board[i][j])
                  return true;
      }
  }
  return false;
}

export function moveRight(board, hasConflicted, showMoveAnimation, incrementScore){
  if(!canMoveRight(board)) {
    return false;
  }
  const size = board.length;
  for(var i= 0 ;i<size;i++) {
      for (var j = size-2; j >=0; j--) {
          if(board[i][j]!=0){
              for(var k=size-1; k>j; k--){
                  if(board[i][k]==0&& noBlockHorizontal(i,j,k,board)){
                      showMoveAnimation(i,j,i,k);
                      board[i][k]=board[i][j];
                      board[i][j]=0;
                      break;
                  }
                  else if(board[i][k]==board[i][j]&& noBlockHorizontal(i,j,k,board)&&!hasConflicted[i][k])
                  {
                      showMoveAnimation(i,j,i,k);
                      board[i][k]+=board[i][j];
                      board[i][j]=0;
                      hasConflicted[i][k]=true;
                      if(incrementScore){
                        incrementScore(board[i][k]);
                      }
                      break;
                  }
              }
          }
      }
  }
  return true;
}
export function moveDown(board,hasConflicted, showMoveAnimation, incrementScore){
  if(!canMoveDown(board)) {
    return false;
  }
  const size = board.length;
  for(let i=size-2; i>=0; i--) {
      for (let j=0; j<size; j++) {
          if(board[i][j]!=0){
              for(let k=size-1; k>i; k--){
                  if(board[k][j]==0&& noBlockVertical(j,i,k,board)){
                      showMoveAnimation(i,j,k,j);
                      board[k][j]=board[i][j];
                      board[i][j]=0;
                      break;
                  }
                  else if(board[k][j]==board[i][j]&& noBlockVertical(j,i,k,board)&&!hasConflicted[k][j])
                  {
                      showMoveAnimation(i,j,k,j);
                      board[k][j]+=board[i][j];
                      board[i][j]=0;
                      hasConflicted[k][j]=true;
                      if(incrementScore){
                        incrementScore(board[k][j]);
                      }
                      break;
                  }
              }
          }
      }
  }
  return true;
}

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