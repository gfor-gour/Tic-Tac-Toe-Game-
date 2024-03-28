let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('#reset-btn');
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#message");

let turnO = true;  //playerX , playerO
let count = 0;
let winner_available = false;

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8], 
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

const resetGame = () =>{
    turnO = true;
    count = 0;
    winner_available = false;
    enableBoxes();
    msgContainer.classList.add("hide");
};

boxes.forEach( (box) => {
    box.addEventListener("click", ()=> {
        count++;
        if(turnO){
            box.innerText = "O";
            box.style.backgroundColor = "#400899";
            box.style.color = "#f3eff0";
            turnO = false;       
            
        } else{
            box.innerText = "X";
            box.style.backgroundColor = "#400899";
            box.style.color = "#000000";
            turnO= true;
        }
        box.disabled = true;
        checkWinner();
    });
});

const disableBoxes = ()=>{
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableBoxes = ()=>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
        box.style.backgroundColor = "#633ca3";
    }
}

const showWinner = (winner) => {
    msgContainer.classList.remove("hide");
    msg.innerText = "YAAHOO, WINNER is"  + " " + winner;
    disableBoxes();
}

const show_No_Winner = (winner) => {
    msgContainer.classList.remove("hide");
    msg.innerText = "NO Winner in This Game";
    disableBoxes();
}

const checkWinner = () => {
    for(let pattern of winPatterns){
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if(pos1val !="" && pos2val !="" && pos3val !=""){
            if(pos1val === pos2val && pos2val === pos3val){
                winner_available = true;
                showWinner(pos1val);
            }
        }
    }
    if(winner_available === false && count === 9){
        show_No_Winner();
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

