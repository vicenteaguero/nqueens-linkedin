document.addEventListener('DOMContentLoaded', function () {

    document.addEventListener('click', function (e) {
        if (
            (
                e.target.tagName == 'TD'
                || e.target.tagName == 'path'
                || e.target.tagName == 'svg'
                || e.target.tagName == 'g'
            )
            && e.target.classList.contains('board')
        ) {
            toggleSquare(e.target);
        }
    });

    function toggleSquare(td) {

        if (
            td.tagName === 'path'
            || td.tagName === 'svg'
            || td.tagName === 'g'
        ) {
            td = td.closest('td');
        }

        if (!td.dataset.state || td.dataset.state == 'empty') {
            td.dataset.state = 'x';
            td.textContent = '✖️';
        } else if (td.dataset.state == 'x') {
            td.dataset.state = 'crown';
            td.innerHTML = `
            <svg class="board" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_3812_70403)">
                    <path class="board" d="M23.25 7C23.25 7.69 22.69 8.25 22 8.25C21.89 8.25 21.78 8.21 21.68 8.18L19 17.99H5L2.32 8.18C2.21 8.21 2.11 8.25 2 8.25C1.31 8.25 0.75 7.69 0.75 7C0.75 6.31 1.31 5.75 2 5.75C2.69 5.75 3.25 6.31 3.25 7C3.25 7.31 3.13 7.59 2.94 7.8L9 13L11.65 4.18C11.14 4.03 10.75 3.57 10.75 3C10.75 2.31 11.31 1.75 12 1.75C12.69 1.75 13.25 2.31 13.25 3C13.25 3.56 12.87 4.02 12.35 4.18L15 13L21.06 7.8C20.87 7.58 20.75 7.31 20.75 7C20.75 6.31 21.31 5.75 22 5.75C22.69 5.75 23.25 6.31 23.25 7ZM19 19H5C4.45 19 4 19.45 4 20C4 20.55 4.45 21 5 21H19C19.55 21 20 20.55 20 20C20 19.45 19.55 19 19 19Z"></path>
                </g>
                <defs>
                    <clipPath id="clip0_3812_70403">
                        <rect width="24" height="24" fill="white"></rect>
                    </clipPath>
                </defs>
            </svg>
        `;
        } else {
            td.dataset.state = 'empty';
            td.textContent = '';
            td.innerHTML = '';
        }

        var solved = document.getElementById('solved');
        if (countQueens() === boardSize()) {
            if (checkSolution()) {
                solved.textContent = 'Congratulations! You have found a solution.';
            } else {
                solved.textContent = '';
            }
                
        } else {
            solved.textContent = '';
        }

    }

    function checkSolution() {

        console.log('Checking solution...');
        
        var table = document.querySelector('table.board');
        if (!table) {
            return false;
        }

        var rows = table.querySelectorAll('tr');
        var n = rows.length;

        var solution = new Array(n).fill(-1);

        for (var i = 0; i < n; i++) {
            var cells = rows[i].querySelectorAll('td');
            for (var j = 0; j < n; j++) {
                if (cells[j].dataset.state == 'crown') {
                    if (solution[j] != -1) {
                        return false;
                    }
                    solution[j] = i;
                }
            }
        }

        if (solution.includes(-1)) {
            return false;
        }

        for (var row = 0; row < n; row++) {
            var col = solution[row];
            if (!is_valid(row, col, solution)) {
                return false;
            }
        }

        return true;

    }

    function countQueens() {
        var table = document.querySelector('table.board');
        if (!table) {
            return 0;
        }
        return table.querySelectorAll('td[data-state="crown"]').length;
    }

    function boardSize() {
        var table = document.querySelector('table.board');
        if (!table) {
            return 0;
        }
        return table.querySelectorAll('tr').length;
    }

});