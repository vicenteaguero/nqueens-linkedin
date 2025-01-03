// assets/js/board.js

function get_board(s) {

    var n = s.length;
    var t = [];

    for (var i = 0; i < n; i++) {
        t.push([[]]);
        for (var j = 0; j < n; j++) {
            t[i][j] = s[i][j] == 1 ? i+1 : 0;
        }
    }

    var b = [];
    for (var i = 0; i < n; i++) {
        b[i] = t[i].slice();
    }

    var iterations = 0;
    var max_iterations = 100;

    while (iterations < max_iterations) {

        var zeros = false;
        var possible = [];

        for (var i = 0; i < n; i++) {
            for (var j = 0; j < n; j++) {
                if (b[i][j] == 0) {
                    zeros = true;
                    possible.push([i, j]);
                }
            }
        }

        if (!zeros) {
            break;
        }

        shuffle(possible);

        for (var idx = 0; idx < possible.length; idx++) {

            var i = possible[idx][0];
            var j = possible[idx][1];

            if (b[i][j] > 0) {
                continue;
            }

            var combinations = [];
            var neighbors = [[i-1, j], [i+1, j], [i, j-1], [i, j+1]];

            for (var k = 0; k < neighbors.length; k++) {
                var row = neighbors[k][0];
                var col = neighbors[k][1];
                if (row >= 0 && row < n && col >= 0 && col < n) {
                    if (b[row][col] > 0) {
                        combinations.push([row, col]);
                    }
                }
            }

            if (combinations.length == 0) {
                continue;
            }

            var idx_combinations = Math.floor(Math.random()*combinations.length);
            var i_c = combinations[idx_combinations][0];
            var j_c = combinations[idx_combinations][1];

            b[i][j] = b[i_c][j_c];

        }

        iterations += 1;
    }
    
    return b;

}