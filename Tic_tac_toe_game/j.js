const game = document.querySelector('.game-info')
const boxes = document.querySelectorAll('.box')
const btn = document.querySelector('.btn')

let curentPlayer;
let gameGrid;

const winningposition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function initGame(){
    curentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    // UI empty
    boxes.forEach( (box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
       box.classList = `box B${index+1}`;

    });
    btn.classList.remove("active");
    game.innerText = `Current Player - ${curentPlayer}`;
    

}

initGame();

function swapTurn(){
    if(curentPlayer === "X"){
        curentPlayer = "0";
    }
    else{
        curentPlayer = "X";
    }

    game.innerText = `Current Player - ${curentPlayer}`;
}


function cheakGameOver(){
    let answer = "";

    winningposition.forEach((position) => {
        if((gameGrid[position[0]] !== ""  || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
        && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])) {
                

            if(gameGrid[position[0]] === "X"){
                answer = "X";
            }
            else
                answer = "0";

                boxes.forEach((box) => {
                    box.style.pointerEvents = "none";
                })
            
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
            
    }
    });

    if(answer !== ""){
        game.innerText = `winner Player - ${answer}`;
        btn.classList.add("active");
        return;
    }

    let fillcount = 0;
    gameGrid.forEach((box) => {
        if(box !== "" ){
            fillcount++;
        }
    });

    if(fillcount === 9){
        game.innerText = "game tied !";
        btn.classList.add("active");
    }
}


function handleClick(index){
    if(gameGrid[index] === "") {
        boxes[index].innerText = curentPlayer;
       gameGrid[index] = curentPlayer;
       boxes[index].style.pointerEvents = "none";
       swapTurn();
       cheakGameOver();
       
    }

}

boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        handleClick(index); 
    })
});

btn.addEventListener('click', initGame);




   