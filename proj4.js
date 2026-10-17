// ===== Connect Four =====

const ROWS = 6;
const COLS = 7;

const board = [];
let currentPlayer = "red";
let gameOver = false;

const boardDiv = document.getElementById("board");
const turnText = document.getElementById("turnText");

const restartBtn = document.getElementById("restartBtn");
const themeBtn = document.getElementById("themeBtn");

const dropSound = document.getElementById("dropSound");


// Create Empty Board
function createBoard(){

    board.length = 0;

    boardDiv.innerHTML = "";

    for(let r=0;r<ROWS;r++){

        board[r]=[];

        for(let c=0;c<COLS;c++){

            board[r][c]="";

            const cell=document.createElement("div");

            cell.classList.add("cell");

            cell.dataset.row=r;
            cell.dataset.col=c;

            cell.addEventListener("click",()=>dropCoin(c));

            boardDiv.appendChild(cell);

        }

    }

}

createBoard();


// Drop Coin

function dropCoin(col){

    if(gameOver) return;

    for(let row=ROWS-1;row>=0;row--){

        if(board[row][col]==""){

            board[row][col]=currentPlayer;

            drawBoard();

            if(dropSound) dropSound.play();

            changePlayer();

            return;

        }

    }

}


// Draw Board

function drawBoard(){

    const cells=document.querySelectorAll(".cell");

    cells.forEach(cell=>{

        cell.innerHTML="";

    });

    for(let r=0;r<ROWS;r++){

        for(let c=0;c<COLS;c++){

            if(board[r][c]!=""){

                const coin=document.createElement("div");

                if(board[r][c]=="red"){

                    coin.classList.add("redCoin");

                }else{

                    coin.classList.add("yellowCoin");

                }

                const index=r*COLS+c;

                cells[index].appendChild(coin);

            }

        }

    }

}



// Change Player

function changePlayer(){

    if(currentPlayer=="red"){

        currentPlayer="yellow";

        turnText.innerHTML="🟡 Yellow Player Turn";

    }

    else{

        currentPlayer="red";

        turnText.innerHTML="🔴 Red Player Turn";

    }

}



// Restart

restartBtn.onclick=()=>{

    currentPlayer="red";

    gameOver=false;

    turnText.innerHTML="🔴 Red Player Turn";

    createBoard();

}



// Theme Toggle

themeBtn.onclick=()=>{

    document.body.classList.toggle("dark");

}
// ===============================
// WIN CHECK + SCORE + POPUP
// ===============================

const winnerPopup = document.getElementById("winnerPopup");
const winnerText = document.getElementById("winnerText");
const playAgain = document.getElementById("playAgain");

const winSound = document.getElementById("winSound");

let redScore = 0;
let yellowScore = 0;

const redScoreText = document.getElementById("redScore");
const yellowScoreText = document.getElementById("yellowScore");


// Check Winner
function checkWinner() {

    // Horizontal
    for (let r = 0; r < ROWS; r++) {

        for (let c = 0; c < COLS - 3; c++) {

            let p = board[r][c];

            if (
                p !== "" &&
                p === board[r][c + 1] &&
                p === board[r][c + 2] &&
                p === board[r][c + 3]
            ) {

                return p;

            }

        }

    }

    // Vertical
    for (let c = 0; c < COLS; c++) {

        for (let r = 0; r < ROWS - 3; r++) {

            let p = board[r][c];

            if (
                p !== "" &&
                p === board[r + 1][c] &&
                p === board[r + 2][c] &&
                p === board[r + 3][c]
            ) {

                return p;

            }

        }

    }

    // Diagonal \
    for (let r = 0; r < ROWS - 3; r++) {

        for (let c = 0; c < COLS - 3; c++) {

            let p = board[r][c];

            if (
                p !== "" &&
                p === board[r + 1][c + 1] &&
                p === board[r + 2][c + 2] &&
                p === board[r + 3][c + 3]
            ) {

                return p;

            }

        }

    }

    // Diagonal /
    for (let r = 3; r < ROWS; r++) {

        for (let c = 0; c < COLS - 3; c++) {

            let p = board[r][c];

            if (
                p !== "" &&
                p === board[r - 1][c + 1] &&
                p === board[r - 2][c + 2] &&
                p === board[r - 3][c + 3]
            ) {

                return p;

            }

        }

    }

    return null;

}



// Winner Function

function showWinner(player) {

    gameOver = true;

    winnerPopup.classList.remove("hidden");

    if (player == "red") {

        winnerText.innerHTML = "🔴 Red Wins!";

        redScore++;

        redScoreText.innerHTML = redScore;

    }

    else {

        winnerText.innerHTML = "🟡 Yellow Wins!";

        yellowScore++;

        yellowScoreText.innerHTML = yellowScore;

    }

    if (winSound) {

        winSound.play();

    }

}



// Close Popup

playAgain.onclick = () => {

    winnerPopup.classList.add("hidden");

    currentPlayer = "red";

    turnText.innerHTML = "🔴 Red Player Turn";

    gameOver = false;

    createBoard();

};



// ===============================
// UPDATE DROP FUNCTION
// ===============================

// Part 1 wali dropCoin() function ko is wali se REPLACE kar do

function dropCoin(col){

    if(gameOver) return;

    for(let row=ROWS-1; row>=0; row--){

        if(board[row][col]==""){

            board[row][col]=currentPlayer;

            drawBoard();

            if(dropSound) dropSound.play();

            const winner = checkWinner();

            if(winner){

                showWinner(winner);

                return;

            }

            changePlayer();

            return;

        }

    }

}
// ===============================
// DRAW CHECK
// ===============================

function checkDraw(){

    for(let r=0;r<ROWS;r++){

        for(let c=0;c<COLS;c++){

            if(board[r][c]==""){

                return false;

            }

        }

    }

    return true;

}



// ===============================
// LOCAL STORAGE
// ===============================

function saveScore(){

    localStorage.setItem("redScore",redScore);

    localStorage.setItem("yellowScore",yellowScore);

}

function loadScore(){

    redScore=Number(localStorage.getItem("redScore"))||0;

    yellowScore=Number(localStorage.getItem("yellowScore"))||0;

    redScoreText.innerHTML=redScore;

    yellowScoreText.innerHTML=yellowScore;

}

loadScore();



// Update showWinner Function
// showWinner() ke end me ye line add karna

saveScore();



// ===============================
// DRAW POPUP
// ===============================

function showDraw(){

    gameOver=true;

    winnerPopup.classList.remove("hidden");

    winnerText.innerHTML="🤝 Match Draw";

}



// ===============================
// UPDATE dropCoin()
// Purani dropCoin() ko isse replace kar do
// ===============================

function dropCoin(col){

    if(gameOver) return;

    for(let row=ROWS-1;row>=0;row--){

        if(board[row][col]==""){

            board[row][col]=currentPlayer;

            drawBoard();

            if(dropSound){

                dropSound.currentTime=0;

                dropSound.play();

            }

            const winner=checkWinner();

            if(winner){

                showWinner(winner);

                if(typeof confetti==="function"){

                    confetti({

                        particleCount:180,

                        spread:120,

                        origin:{y:0.6}

                    });

                }

                return;

            }

            if(checkDraw()){

                showDraw();

                return;

            }

            changePlayer();

            return;

        }

    }

}



// ===============================
// ENTER KEY SUPPORT
// ===============================

document.addEventListener("keydown",function(e){

    if(e.key==="r"){

        restartBtn.click();

    }

});



// ===============================
// THEME SAVE
// ===============================

if(localStorage.getItem("theme")=="dark"){

    document.body.classList.add("dark");

}

themeBtn.onclick=function(){

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        localStorage.setItem("theme","dark");

    }

    else{

        localStorage.setItem("theme","light");

    }

};



// ===============================
// RESET SCORE
// ===============================

function resetScore(){

    redScore=0;

    yellowScore=0;

    saveScore();

    redScoreText.innerHTML=0;

    yellowScoreText.innerHTML=0;

}



// Double Click Restart = Reset Score

restartBtn.addEventListener("dblclick",function(){

    resetScore();

    alert("Score Reset Successfully");

});