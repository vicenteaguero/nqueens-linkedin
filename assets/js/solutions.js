// assets/js/solutions.js

function find_solutions(n, max_solutions) {
    
    var s = [];
    for (var i = 0; i < n; i++) {
        s.push(-1);
    }

    var solutions = [];
    var solutions_set = {};

    function add_solution(sol) {

        var n = sol.length;
        var sol1 = sol.slice();
        var sol2 = sol.slice().reverse();
        var sol3 = sol.map(function(x) { return n-1-x; });
        var sol4 = sol3.slice().reverse();

        var solutions_list = [sol1, sol2, sol3, sol4];
        var solutions_strings = solutions_list.map(function(x) { return x.join(','); });

        var canonical = solutions_strings.reduce(function(a, b) { return a < b ? a : b; });

        if (!(canonical in solutions_set)) {
            solutions.push(sol.slice());
            solutions_set[canonical] = true;
        }
    }

    function backtrack(row) {
        
        if (solutions.length >= max_solutions) {
            return true;
        }

        if (row == n) {
            add_solution(s.slice());
            return false;
        }

        var cols;

        if (row == 0) {
            cols = [];
            for (var i = 0; i < Math.floor((n+1)/2); i++) {
                cols.push(i);
            }
        } else {
            cols = [];
            for (var i = 0; i < n; i++) {
                cols.push(i);
            }
        }
        shuffle(cols);

        for (var i = 0; i < cols.length; i++) {
            if (is_valid(row, cols[i], s)) {
                s[row] = cols[i];
                if (backtrack(row+1)) {
                    return true;
                }
                s[row] = -1;
            }
        }
        return false;
    }

    backtrack(0);
    shuffle(solutions);
    return solutions;

}

function is_valid(row, col, solution) {
    for (var i = 0; i < row; i++) {
        if (col === solution[i]) {
            return false;
        }
        if (Math.abs(row-i) <= 1 && Math.abs(col-solution[i]) <= 1) {
            return false;
        }
    }
    return true;
}

function shuffle(array) {
    for (var i = array.length-1; i > 0; i--) {
        var j = Math.floor(Math.random()*(i+1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function solution_to_matrix(s) {
    var n = s.length;
    var b = [];
    for (var i = 0; i < n; i++) {
        b[i] = [];
        for (var j = 0; j < n; j++) {
            b[i][j] = s[i] == j ? 1 : 0;
        }
    }
    return b;
}