// refine.js

function getCrossConnectionMatrix(board, i, j) {
    const mat = Array.from({ length: 4 }, () => Array(4).fill(0));
    const n = board.length;

    function valAt(rOff, cOff) {
        const rr = i + rOff, cc = j + cOff;
        if (rr < 0 || rr >= n || cc < 0 || cc >= n) return 0;
        return board[rr][cc];
    }

    const patterns = [
        { offsets: [[-1, 0], [0, 0], [1, 0]], connects: [0, 1] },
        { offsets: [[0, -1], [0, 0], [0, 1]], connects: [2, 3] },
        { offsets: [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1]], connects: [2, 3] },
        { offsets: [[1, -1], [1, 0], [1, 1], [0, -1], [0, 1]], connects: [2, 3] },
        { offsets: [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0]], connects: [0, 1] },
        { offsets: [[-1, 1], [0, 1], [1, 1], [-1, 0], [1, 0]], connects: [0, 1] },
        { offsets: [[-1, 0], [0, 0], [0, -1]], connects: [0, 2] },
        { offsets: [[-1, -1], [-1, 0], [0, -1]], connects: [0, 2] },
        { offsets: [[-1, 0], [0, 0], [0, 1]], connects: [0, 3] },
        { offsets: [[-1, 1], [-1, 0], [0, 1]], connects: [0, 3] },
        { offsets: [[1, 0], [0, 0], [0, -1]], connects: [1, 2] },
        { offsets: [[1, -1], [1, 0], [0, -1]], connects: [1, 2] },
        { offsets: [[1, 0], [0, 0], [0, 1]], connects: [1, 3] },
        { offsets: [[1, 1], [1, 0], [0, 1]], connects: [1, 3] }
    ];

    for (const pattern of patterns) {
        const [fr, fc] = pattern.offsets[0];
        const firstVal = valAt(fr, fc);
        if (firstVal <= 0) continue;
        let allSame = true;
        for (let k = 1; k < pattern.offsets.length; k++) {
            const [rr, cc] = pattern.offsets[k];
            if (valAt(rr, cc) !== firstVal) {
                allSame = false;
                break;
            }
        }
        if (!allSame) continue;
        const [sA, sB] = pattern.connects;
        mat[sA][sB] = 1;
        mat[sB][sA] = 1;
    }

    return mat;
}

function isSameMatrix(m1, m2) {
    for (let i = 0; i < m1.length; i++) {
        for (let j = 0; j < m1[i].length; j++) {
            if (m1[i][j] !== m2[i][j]) return false;
        }
    }
    return true;
}

function shuffle(array) {
    for (let i = array.length-1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i+1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function refineBoard(board, solution) {
    console.log(solution);
    const n = board.length;
    const pairs = [];

    // Only interior cells (no borders)
    for (let i = 1; i < n-1; i++) {
        for (let j = 1; j < n-1; j++) {
            pairs.push([i, j]);
        }
    }
    shuffle(pairs);

    for (const [i, j] of pairs) {

        // Skip if the cell is already filled
        if (solution[i][j] === 1) continue;

        const oldVal = board[i][j];

        // Get frequencies of colors in the cross
        // top, bottom, left, right
        const neighbors = [
            [i-1, j],
            [i+1, j],
            [i, j-1],
            [i, j+1]
        ];

        const freq = {};
        for (const [x, y] of neighbors) {
            if (x >= 0 && x < n && y >= 0 && y < n) {
                const val = board[x][y];
                if (val > 0) {
                    freq[val] = (freq[val] || 0)+1;
                }
            }
        }

        // Sort colors from less common to more common
        const sortedColors = Object.keys(freq).map(Number).sort((a, b) => freq[a]-freq[b]);

        // Initial connection matrix of the cross
        const originalMat = getCrossConnectionMatrix(board, i, j);

        // Try to change (i, j) to each color in sortedColors
        for (const color of sortedColors) {
            if (color === oldVal) continue;

            board[i][j] = color;
            const newMat = getCrossConnectionMatrix(board, i, j);

            if (isSameMatrix(originalMat, newMat)) {
                // Keep the change and stop trying new colors
                break;
            }

            // Revert
            board[i][j] = oldVal;
        }
    }
}