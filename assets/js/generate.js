// assets/js/generate.js

document.addEventListener('DOMContentLoaded', function() {

    var generate_button = document.getElementById('generate-button');

    generate_button.addEventListener('click', async function() {

        var solved = document.getElementById('solved');
        solved.textContent = '';

        var input = document.getElementById('n-value');
        var n = parseInt(input.value);

        if (n < 4 || n > 100) {
            alert('Please enter a number between 4 and 100.');
            return;
        }

        var solutions = find_solutions(n, 1000);

        if (solutions.length == 0) {
            alert('No solutions found.');
            return;
        }

        var index = Math.floor(Math.random()*solutions.length);
        var solution = solution_to_matrix(solutions[index]);

        // var transforms = get_transforms(solution);
        // var index = Math.floor(Math.random()*transforms.length);
        // var solution = transforms[index];

        var board = get_board(solution);
        refineBoard(board);
        
        solutions = [];

        var board_output = document.getElementById('board-output');
        board_output.innerHTML = '';

        var colors = await fetch('assets/data/colors.json')
            .then(response => response.json())
            .catch(() => {
                alert('Failed to fetch colors data.');
                return [];
            });

        if (colors.length == 0) {
            alert('No colors data available.');
            return;
        }

        while (colors.length < n) {
            colors = colors.concat(colors.slice(0, n-colors.length));
        }

        var table = document.createElement('table');
        table.className = 'board';
        table.style.borderCollapse = 'collapse';

        for (var i = 0; i < n; i++) {
            var tr = document.createElement('tr');
            tr.className = 'board';
            tr.dataset.state = 'empty';
            for (var j = 0; j < n; j++) {
                var td = document.createElement('td');
                td.className = 'board';
                td.style.backgroundColor = colors[(board[i][j]-1)%colors.length];
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }

        board_output.appendChild(table);

    });

    generate_button.click();

});