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

function displayBoard(board) {
    let boardString = "";
    for (const row of board) {
        boardString += row.join(" ") + "\n";
    }
    console.log(boardString);
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

function moveForwardOneSquare(board, startRow, startCol, color) {
    const direction = (color === COLORS.WHITE) ? DIRECTIONS.UP : DIRECTIONS.DOWN;
    const endRow = startRow + direction;

    if (!isValidSquare(board, endRow, startCol)) {
        return false;
    }

    if (!isEmptySquare(board, endRow, startCol)) {
        return false;
    }

    return true;
}

function captureDiagonally(board, startRow, startCol, endRow, endCol, color) {
    const direction = (color === COLORS.WHITE) ? DIRECTIONS.UP : DIRECTIONS.DOWN;

    if (Math.abs(endCol - startCol) !== 1 || endRow !== startRow + direction) {
        return false;
    }

    if (!isOpponentPiece(board, endRow, endCol, color)) {
        return false;
    }

    return true;
}

describe('Pawn Movement Tests', function() {
    let board;

    beforeEach(function() {
        board = initializeBoard();
    });

    it('should allow a white pawn to move forward one square', function() {
        assert.strictEqual(moveForwardOneSquare(board, 6, 3, COLORS.WHITE), true);
    });

    it('should allow a black pawn to move forward one square', function() {
        assert.strictEqual(moveForwardOneSquare(board, 1, 3, COLORS.BLACK), true);
    });

    it('should not allow a pawn to capture diagonally without an opponent piece', function() {
        assert.strictEqual(captureDiagonally(board, 6, 3, 5, 4, COLORS.WHITE), false);
    });

    it('should not allow a pawn to capture diagonally to an empty square', function() {
        assert.strictEqual(captureDiagonally(board, 1, 3, 2, 4, COLORS.BLACK), false);
    });
});
