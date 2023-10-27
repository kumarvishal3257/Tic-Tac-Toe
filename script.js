const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// Initialising game
function initGame() {
    currentPlayer = "X";
    gameGrid = ["", "","","","","","","",""];

    // emptying UI
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";

        // Initialise css properties again
        box.classList = `box box${index+1}`;
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `current Player - ${currentPlayer}`;
}

initGame();

function swapTurn() {
    if(currentPlayer === "X") {
        currentPlayer = "0";
    }
    else {
        currentPlayer = "X"
    }

    // UI update
    gameInfo.innerText = `current Player - ${currentPlayer}`;
}

function checkGameOver() {
    let answer = "";


    winningPosition.forEach((position) => {
        // all 3 boxes should be non-empty and exactly same in value
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
            && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])) {
              
                // check if winner is x
                if(gameGrid[position[0]] === "X")
                    answer = "X"
                else
                    answer = "0";

                // disable pointer events
                boxes.forEach((box) => {
                    box.style.pointerEvents = "none";
                });

                // Now winner is declared
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
            }
    });

    // Activate New game and showing winner information
    if(answer !== ""){
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        
    }

    // Tie Check
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "")
            fillCount++;
    });

    // Box is full, game tied
    if(fillCount === 9){
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
    }
}

function handleClick(index) {
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";

        // Swap turn
        swapTurn();

        // Check if anyone wins
        checkGameOver();
    }

}

boxes.forEach((box, index) => (
    box.addEventListener("click", () => {
        handleClick(index);
    })
));

newGameBtn.addEventListener("click", initGame);