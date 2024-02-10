const assert = require('assert');


const COLORS = {
    WHITE: 'white',
    BLACK: 'black'
};

const DIRECTIONS = {
    UP: -1,
    DOWN: 1
};

const PIECES = {
    EMPTY: "-",
    KING: "K",
    QUEEN: "Q",
    ROOK: "R",
    BISHOP: "B",
    KNIGHT: "N",
    PAWN: "P"
};


function initializeBoard() {
    return [
        ["R", "N", "B", "Q", "K", "B", "N", "R"],
        ["P", "P", "P", "P", "P", "P", "P", "P"],
        ["-", "-", "-", "-", "-", "-", "-", "-"],
        ["-", "-", "-", "-", "-", "-", "-", "-"],
        ["-", "-", "-", "-", "-", "-", "-", "-"],
        ["-", "-", "-", "-", "-", "-", "-", "-"],
        ["p", "p", "p", "p", "p", "p", "p", "p"],
        ["r", "n", "b", "q", "k", "b", "n", "r"]
    ];
}


function isValidSquare(board, row, col) {
    return row >= 0 && row < board.length && col >= 0 && col < board[0].length;
}


function isEmptySquare(board, row, col) {
    return board[row][col] === PIECES.EMPTY;
}


function isOpponentPiece(board, row, col, color) {
    if (!isValidSquare(board, row, col) || isEmptySquare(board, row, col)) {
        return false;
    }
    const piece = board[row][col];
    return piece !== PIECES.EMPTY && (piece.toUpperCase() !== piece ? COLORS.WHITE : COLORS.BLACK) !== color;
}


function canMoveOneSquare(board, startRow, startCol, endRow, endCol) {
    const rowDiff = Math.abs(endRow - startRow);
    const colDiff = Math.abs(endCol - startCol);


    return rowDiff <= 1 && colDiff <= 1;
}


describe('King Movement Tests', function() {
    let board;

    beforeEach(function() {

        board = initializeBoard();
    });

    it('should allow the king to move one square horizontally', function() {

        assert.strictEqual(canMoveOneSquare(board, 0, 4, 0, 3), true);
    });

    it('should allow the king to move one square vertically', function() {

        assert.strictEqual(canMoveOneSquare(board, 0, 4, 1, 4), true);
    });

    it('should allow the king to move one square diagonally', function() {

        assert.strictEqual(canMoveOneSquare(board, 0, 4, 1, 3), true);
    });

    it('should not allow the king to move two squares', function() {

        assert.strictEqual(canMoveOneSquare(board, 0, 4, 2, 4), false);
    });
});
