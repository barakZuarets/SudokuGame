//Defining global variables

var matrix = [
    [9, 7, 8, 1, 3, 2, 6, 5, 4],
    [6, 4, 5, 7, 9, 8, 3, 2, 1],
    [3, 1, 2, 4, 6, 5, 9, 8, 7],
    [1, 8, 9, 2, 4, 3, 7, 6, 5],
    [4, 2, 3, 5, 7, 6, 1, 9, 8],
    [7, 5, 6, 8, 1, 9, 4, 3, 2],
    [2, 9, 1, 3, 5, 4, 8, 7, 6],
    [8, 6, 7, 9, 2, 1, 5, 4, 3],
    [5, 3, 4, 6, 8, 7, 2, 1, 9],
];
var mistakeGame = 0;
var count = 0;
var countMistacks = 0;
var lastMatrixPlayd;
var prevWrongNum;
var userName = 'Hello Guest';
var userNameAndPassword = [
    ['abcd', '1234']
];
document.getElementById('name').innerHTML = userName;


// Print Matrix in Cells

function prin(num) {

    let idPlace = 'cell';
    document.getElementById('gameChoice').style.display = 'none';
    document.getElementById('sudoku-grid').style.display = 'grid';
    document.getElementById('gameOptions').style.display = 'inline-block';
    matrix = randomMatrix();
    let arr = copyMatrix(matrix);
    arr = selectLevel(arr, num);
    for (let i = 0; i < 9; i++) {
        for (let k = 0; k < 9; k++) {
            idPlace += i.toString() + k.toString();
            document.getElementById(idPlace).value = arr[i][k];
            if (arr[i][k] != ' ')
                document.getElementById(idPlace).disabled = true;
            idPlace = 'cell';
        }
    }

}


// Select the level of difficulty

function selectLevel(arr, def) {

    let del;
    let s = arr;
    if (Number(def) == 3)
        del = hard();
    else if (Number(def) == 2)
        del = medum();
    else if (Number(def) == 1)
        del = ez();

    for (let i = 0; i < del.length; i++) {
        s[del[i][0]][del[i][1]] = ' ';
    }
    lastMatrixPlayd = copyMatrix(s);
    del = [];
    return s;
}


// Level Hard Delete 45 cells

function hard() {
    // debugger;
    let arr = [
        [0, 0]
    ];
    let j = 0;
    let index;
    for (let i = 0; i < 9; i++) {
        while (j < 5) {

            index = Math.floor(Math.random() * 9);
            if (isItemInArray(arr, [i, index])) {
                arr.push([i, index]);
                j++;
            }
        }
        j = 0;
    }
    return arr;
}


// Level Medium Delete 36 cell

function medum() {
    // debugger;
    let arr = [
        [0, 0]
    ];
    let j = 0;
    let index;
    for (let i = 0; i < 9; i++) {
        while (j < 4) {

            index = Math.floor(Math.random() * 9);
            if (isItemInArray(arr, [i, index])) {
                arr.push([i, index]);
                j++;
            }
        }
        j = 0;
    }
    return arr;
}


//Level Easy Delete 27 cells

function ez() {
    // debugger;
    let arr = [
        [0, 0]
    ];
    let j = 0;
    let index;
    for (let i = 0; i < 9; i++) {
        while (j < 3) {

            index = Math.floor(Math.random() * 9);
            if (isItemInArray(arr, [i, index])) {
                arr.push([i, index]);
                j++;
            }
        }
        j = 0;
    }
    return arr;
}


// Is Item in Array

function isItemInArray(array, item) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][0] == item[0] && array[i][1] == item[1]) {
            return false;
        }
    }
    return true;
}


// Random Matrix [+functions to randomly change col's or row's]

function randomMatrix() {

    let flag = Math.floor(Math.random() * 2)
    if (flag == 0) {
        return row(matrix);
    } else {
        return col(matrix);
    }
}

function row(arr) {

    for (let i = 0; i < 3; i++) {
        arr.push(arr.shift());
    }
    return arr;
}


function col(arr) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 3; j++)
            arr[i].push(arr[i].shift());
    }
    return arr;
}


// Copy Matrix

function copyMatrix(matrix) {
    let arr = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            arr[i][j] = matrix[i][j];
        }
    }
    return arr;
}


// 3 Hints for help

function hint() {

    let str;
    let x;
    let y;
    while (count < 3) {
        x = Math.floor(Math.random() * 9);
        y = Math.floor(Math.random() * 9);
        str = 'cell' + x.toString() + y.toString();
        if (document.getElementById(str).value != matrix[x][y]) {
            document.getElementById(str).value = matrix[x][y];
            document.getElementById(str).disabled = true;
            count++;
            if (count == 3) {
                document.getElementById('hint').style.display = 'none';
            } else {
                document.getElementById('hint').style.display = 'inline-block';
            }
            break;

        }

    }
}

// A hint to the lecturer (without limitation of hint)

// function hint() {

//     let str;
//     let x;
//     let y;
//     while (count < 81) {
//         x = Math.floor(Math.random() * 9);
//         y = Math.floor(Math.random() * 9);
//         str = 'cell' + x.toString() + y.toString();
//         if (document.getElementById(str).value != matrix[x][y]) {
//             document.getElementById(str).value = matrix[x][y];
//             document.getElementById(str).disabled = true;
//             count++;
//             // if (count == 3) { 
//             //     document.getElementById('hint').style.display = 'none';
//             // } else {
//             //     document.getElementById('hint').style.display = 'inline-block';
//             // }
//             break;

//         }

//     }
// }


//Clean Board + White board

function cleanBoard() {
    let arr = lastMatrixPlayd;
    for (let i = 0; i < 9; i++) {
        for (let k = 0; k < 9; k++) {
            let idPlace = 'cell' + i.toString() + k.toString();
            document.getElementById(idPlace).value = arr[i][k];
            if (arr[i][k] != ' ') {
                document.getElementById(idPlace).disabled = true;
            } else {
                document.getElementById(idPlace).disabled = false;
                document.getElementById(idPlace).style.backgroundColor = 'white';
            }
        }
    }
    count = 0;
    document.getElementById('hint').style.display = 'inline-block';
    document.getElementById('mistakesAtm').innerHTML = 0;
}


function whiteBord() {
    for (let i = 0; i < 9; i++) {
        for (let k = 0; k < 9; k++) {
            let idPlace = 'cell' + i.toString() + k.toString();
            document.getElementById(idPlace).value = null;
            document.getElementById(idPlace).disabled = false;
            document.getElementById(idPlace).style.backgroundColor = null;
        }
    }
}


// Check the game

function check() {
    let str;
    let flag = 0;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {

            str = 'cell' + i.toString() + j.toString();
            if (matrix[i][j] != Number(document.getElementById(str).value)) {
                document.getElementById(str).style.backgroundColor = 'red';
                flag = 1;
            }
        }
    }

    setTimeout(function () {
        if (flag == 1) {

            document.getElementById('winOrLose').style.display = 'block';
            document.getElementById('sudoku-grid').style.display = 'none';
            document.getElementById('winOrLose').style.backgroundImage = 'url(img/lose.gif)';
            document.getElementById('winOrLose').style.backgroundSize = 'cover';
            document.getElementById('gameOptions').style.display = 'none';

        } else {

            document.getElementById('winOrLose').style.display = 'block';
            document.getElementById('sudoku-grid').style.display = 'none';
            document.getElementById('winOrLose').style.backgroundImage = 'url(img/win.gif)';
            document.getElementById('winOrLose').style.backgroundSize = 'cover';
            document.getElementById('gameOptions').style.display = 'none';

        }
    }, 3000);
}


// "3Boom" Game setup

function game3boom() {
    mistakeGame = 1;
    prin(2);
    document.getElementById('mistaken').style.display = 'block';
    document.getElementById('checkButton').style.display = 'none';
    document.getElementById('check3Boom').style.display = 'inline-block';
}


// Check mistakes in "3Boom" games.

function mistaken() {
    debugger
    if (mistakeGame == 1) {
        var countMistake = 0;
        var updatedMatrix = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
        if (document.getElementById('mistakesAtm').innerHTML == 1) {
            countMistake = 1;
        } else if (document.getElementById('mistakesAtm').innerHTML == 2) {
            countMistake = 2;
        }

        for (let i = 0; i < 9; i++) {
            for (let k = 0; k < 9; k++) {
                let idPlace = 'cell' + i.toString() + k.toString();

                updatedMatrix[i][k] = Number(document.getElementById(idPlace).value);

                if (document.getElementById(idPlace).value != matrix[i][k] && document.getElementById(idPlace).value != '' && document.getElementById(idPlace).style.backgroundColor != 'red') {
                    document.getElementById(idPlace).style.backgroundColor = 'red';
                    countMistake++;
                    document.getElementById('mistakesAtm').innerHTML = countMistake;
                    prevWrongNum = Number(document.getElementById(idPlace).value);
                }
                else if (document.getElementById(idPlace).value != matrix[i][k] && document.getElementById(idPlace).value != prevWrongNum && document.getElementById(idPlace).style.backgroundColor == 'red') {
                    countMistake++;
                    prevWrongNum = Number(document.getElementById(idPlace).value);
                    document.getElementById('mistakesAtm').innerHTML = countMistake;
                }
                else if (document.getElementById(idPlace).value == matrix[i][k] && document.getElementById(idPlace).style.backgroundColor == 'red') {
                    document.getElementById(idPlace).style.backgroundColor = 'white';
                    return;
                }
                if (document.getElementById('mistakesAtm').innerHTML >= 3) {
                    document.getElementById('mistakesAtm').innerHTML = 3;
                    if (document.getElementById('mistakesAtm').innerHTML == 3) {
                        document.getElementById('mistake').style.border = '2px solid red';
                    }
                    setTimeout(function () {
                        if (countMistake >= 3) {

                            document.getElementById('winOrLose').style.display = 'block';
                            document.getElementById('sudoku-grid').style.display = 'none';
                            document.getElementById('winOrLose').style.backgroundImage = 'url(img/lose.gif)';
                            document.getElementById('winOrLose').style.backgroundSize = 'cover';
                            document.getElementById('gameOptions').style.display = 'none';

                        }
                    }, 3000);
                }

            }
        }

        checkFinishedMatrix(updatedMatrix);
    }
}


//Check The Matrix after filling in "3Boom: game 

function checkFinishedMatrix(finished) {
    strFinished = finished.toString();
    strMatrix = matrix.toString();
    if (countMistake != 3) {
        setTimeout(function () {
            if (strFinished == strMatrix) {
                document.getElementById('winOrLose').style.display = 'block';
                document.getElementById('sudoku-grid').style.display = 'none';
                document.getElementById('winOrLose').style.backgroundImage = 'url(img/win.gif)';
                document.getElementById('winOrLose').style.backgroundSize = 'cover';
                document.getElementById('gameOptions').style.display = 'none';
            }
        }, 3000);
    }
}


// Switch active links in navigation bar 

let btnContainer = document.getElementById("nav");
let btns = btnContainer.getElementsByClassName("nav_link");
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function () {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
    });
}


// Switch Divs in HTML document

function pushLink(str) {

    if (str == 'home') {
        document.getElementById('home1').style.display = 'block';
        document.getElementById('about').style.display = 'none';
        document.getElementById('game').style.display = 'none';
        document.getElementById('login').style.display = 'none';
        document.getElementById('HowToPlay').style.display = 'none';
    } else if (str == 'aboutpage') {
        document.getElementById('home1').style.display = 'none';
        document.getElementById('about').style.display = 'block';
        document.getElementById('game').style.display = 'none';
        document.getElementById('login').style.display = 'none';
        document.getElementById('HowToPlay').style.display = 'none';
    } else if (str == 'game') {
        whiteBord();
        mistakeGame = 0;
        document.getElementById('mistaken').style.display = 'none';
        document.getElementById('checkButton').style.display = 'inline-block';
        document.getElementById('check3Boom').style.display = 'none';
        document.getElementById('hint').style.display = 'inline-block';
        count = 0;
        document.getElementById('mistakesAtm').innerHTML = 0;
        document.getElementById('home1').style.display = 'none';
        document.getElementById('about').style.display = 'none';
        document.getElementById('game').style.display = 'block';
        document.getElementById('gameChoice').style.display = 'block';
        document.getElementById('login').style.display = 'none';
        document.getElementById('sudoku-grid').style.display = 'none';
        document.getElementById('winOrLose').style.display = 'none';
        document.getElementById('HowToPlay').style.display = 'none';
    } else if (str == 'login') {
        if (document.getElementById('inOrOut').innerHTML == 'LOG OUT') {
            document.getElementById('inOrOut').innerHTML = 'LOG IN';
            logOut();
            pushLink('home');
        } else {

            document.getElementById('loginButton').style.display = 'inline-block';
            document.getElementById('register').style.display = 'none';
            document.getElementById('confirm').style.display = 'none';
            document.getElementById('confirmFaShow').style.display = 'none';
            document.getElementById('home1').style.display = 'none';
            document.getElementById('about').style.display = 'none';
            document.getElementById('game').style.display = 'none';
            document.getElementById('login').style.display = 'block';
            document.getElementById('HowToPlay').style.display = 'none';
        }
    } else {
        document.getElementById('home1').style.display = 'none';
        document.getElementById('about').style.display = 'none';
        document.getElementById('game').style.display = 'none';
        document.getElementById('login').style.display = 'none';
        document.getElementById('HowToPlay').style.display = 'block';
    }
}

function replace_signin_to_signup() {
    document.getElementById('loginButton').style.display = 'none';
    document.getElementById('confirm').style.display = 'inline-block';
    document.getElementById('confirmFaShow').style.display = 'inline-block';
    document.getElementById('register').style.display = 'inline-block';
    document.getElementById('reg').style.display = 'none';
}


// Check Login Information

function checkLoginInformation() {
    let flag = 'x';
    let i = 0;

    while (flag == 'x' && i < userNameAndPassword.length) {
        if (document.getElementById('username').value == userNameAndPassword[i][0]) {
            flag = i;
        }
        i++;
    }
    if (flag == 'x')
        alert('user name not exist');
    else if (document.getElementById('password').value != userNameAndPassword[flag][1]) {
        alert('wrong password');
    } else {
        userName = 'Hello ' + userNameAndPassword[flag][0];
        document.getElementById('name').innerHTML = userName;
        document.getElementById('inOrOut').innerHTML = 'LOG OUT';
        pushLink('game');
    }
}


// Sign-up and Sign-in of users

function register() {
    let flag = 0;
    if (document.getElementById('confirm').value != document.getElementById('password').value) {
        alert('the password and the confirm not the same');
        flag = 1;
    } else if (document.getElementById('password').value == '') {
        alert('enter password');
        flag = 1;
    } else {
        for (let i = 0; i < userNameAndPassword.length; i++) {
            if (document.getElementById('username').value == userNameAndPassword[i][0]) {
                alert('the user name ' + document.getElementById('username').value + ' exist');
                flag = 1;
            }
        }
    }
    if (flag != 1) {
        userNameAndPassword.push([document.getElementById('username').value, document.getElementById('password').value]);
        userName = 'Hello ' + document.getElementById('username').value;
        document.getElementById('name').innerHTML = userName;
        cleanLoginAndRegister();
        document.getElementById('inOrOut').innerHTML = 'LOG OUT';
        pushLink('game');

    }
}

function cleanLoginAndRegister() {
    document.getElementById('loginButton').style.display = 'block';
    document.getElementById('confirm').style.display = 'none';
    document.getElementById('register').style.display = 'none';
    document.getElementById('reg').style.display = 'block';
    document.getElementById('confirm').value = '';
    document.getElementById('register').value = '';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}

function logOut() {
    userName = 'Hello Guest';
    document.getElementById('name').innerHTML = userName;
    cleanLoginAndRegister();
}