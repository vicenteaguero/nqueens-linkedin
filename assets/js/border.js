// assets/js/border.js

function applyBorders(matrix) {
    const table = document.querySelector('#board-output table');
    if (!table) return;
    const rows = table.rows;
    const n = matrix.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            const cell = rows[i].cells[j];
            // Top border: add if first row or current value differs from the one above
            const top = i === 0 || (matrix[i][j] !== matrix[i - 1][j]);
            // Right border: add if last column or current value differs from the one to the right
            const right = j === n - 1 || (matrix[i][j] !== matrix[i][j + 1]);
            // Bottom border: add if last row or current value differs from the one below
            const bottom = i === n - 1 || (matrix[i][j] !== matrix[i + 1][j]);
            // Left border: add if first column or current value differs from the one to the left
            const left = j === 0 || (matrix[i][j] !== matrix[i][j - 1]);
            const borderStyle = '2px solid black';
            const alternatingBorderStyle = '1px solid gray';
            cell.style.borderTop = top ? borderStyle : alternatingBorderStyle;
            cell.style.borderRight = right ? borderStyle : alternatingBorderStyle;
            cell.style.borderBottom = bottom ? borderStyle : alternatingBorderStyle;
            cell.style.borderLeft = left ? borderStyle : alternatingBorderStyle;
        }
    }
}  