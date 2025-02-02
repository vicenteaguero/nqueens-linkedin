// assets/js/game.js

function showOverlay() {

    const overlay = document.getElementById('congrats-overlay');

    overlay.classList.add('active');
    solved.style.display = "none";

}

document.addEventListener('DOMContentLoaded', function () {

    const closeBtn = document.getElementById("overlay-close");
    const solved = document.getElementById('solved');

    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            document.getElementById("congrats-overlay").classList.remove("active");
            solved.style.display = "inline";
        });
    }

    document.addEventListener('click', function (e) {
        if (
            (
                e.target.tagName == 'TD'
                || e.target.tagName == 'path'
                || e.target.tagName == 'svg'
                || e.target.tagName == 'g'
                || e.target.tagName == 'IMG'
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


        if (!td.dataset.state || td.dataset.state === 'empty') {
            td.dataset.state = 'x';
            td.textContent = '✖️';
        } else if (td.dataset.state === 'x') {
            td.dataset.state = 'crown';
            td.innerHTML = `<img class="board crown-img" src="/assets/img/crown.svg" alt="Queen">`;
        } else {
            td.dataset.state = 'empty';
            td.textContent = '';
            td.innerHTML = '';
        }

        const table = document.querySelector('table.board');
        if (!table) {
            return;
        }

        const allCrowns = Array.from(table.querySelectorAll('td[data-state="crown"]'));
        allCrowns.forEach(crown => crown.classList.remove('blocked-cells'));

        const conflictCells = new Set();

        for (let i = 0; i < allCrowns.length - 1; i++) {
            for (let j = i + 1; j < allCrowns.length; j++) {

                const cellA = allCrowns[i];
                const cellB = allCrowns[j];
                const rowA = cellA.parentNode.rowIndex;
                const colA = cellA.cellIndex;
                const rowB = cellB.parentNode.rowIndex;
                const colB = cellB.cellIndex;

                if (rowA === rowB || colA === colB) {
                    conflictCells.add(cellA);
                    conflictCells.add(cellB);
                }

                if (Math.abs(rowA - rowB) === 1 && Math.abs(colA - colB) === 1) {
                    conflictCells.add(cellA);
                    conflictCells.add(cellB);
                }
            }
        }

        const zoneColor = td.style.backgroundColor;
        const zoneCells = Array.from(table.querySelectorAll('td'))
            .filter(cell => cell.style.backgroundColor === zoneColor);

        zoneCells.forEach(cell => cell.classList.remove('blocked-cells'));

        const queenCount = zoneCells.filter(cell => cell.dataset.state === 'crown').length;

        if (queenCount > 1) {
            zoneCells.forEach(cell => conflictCells.add(cell));
        }

        conflictCells.forEach(crown => crown.classList.add('blocked-cells'));
        if (conflictCells.size > 0) {
            document.getElementById('solved').textContent = '';
            return;
        }

        var solved = document.getElementById('solved');
        const crownImgs = document.querySelectorAll('.crown-img');

        if (countQueens() === boardSize()) {
            if (checkSolution()) {
                crownImgs.forEach(img => img.src = '/assets/img/golden-crown.svg');
                solved.textContent = 'Congratulations!';
                showOverlay();
            } else {
                crownImgs.forEach(img => img.src = '/assets/img/crown.svg');
                solved.textContent = '';
            }
        } else {
            crownImgs.forEach(img => img.src = '/assets/img/crown.svg');
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