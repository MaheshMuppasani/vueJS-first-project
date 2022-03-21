export function isGameOver(board){
    let gameOver = false, size = board.length;
    
    const checkRowsAndColumns = (isRowCheck) => {
        let columnOrRowMatched = false;
        for(let i=0; i<size; i++){
            let prevVal = isRowCheck ? board[i][0] : board[0][i];
            for(let j=1; j<size; j++){
                const currVal = isRowCheck ? board[i][j] : board[j][i];
                if(!prevVal || !currVal || prevVal!==currVal){
                    break;
                }
                if(j===size-1){
                    columnOrRowMatched = true;
                }
            }
            if(columnOrRowMatched){
                break;
            }
        }
        return columnOrRowMatched;
    }
    const checkDiagonals = (isLeftDiagonal) => {
        let diagonalMatched = false;
        let prevVal = isLeftDiagonal ? board[0][0] : board[0][size - 1];
        for(let i=1; i<size; i++){
            const currVal = isLeftDiagonal ? board[i][i] : board[i][(size - 1) - i];
            if(!prevVal || !currVal || prevVal!==currVal){
                break;
            }
            if(i===size-1){
                diagonalMatched = true;
            }
        }
        return diagonalMatched;
    }

    gameOver = checkRowsAndColumns() || checkRowsAndColumns(true) || checkDiagonals() || checkDiagonals(true)
    return gameOver;
}

export class GameMove{
    constructor(currentBoard, state){
        this.board = currentBoard;
        this.playedBy = state.player;
        this.gameOver = state.gameOver;
        this.gameDraw = state.gameDraw;
    }
}