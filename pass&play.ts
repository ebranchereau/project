"use strict";
export{};
const divs = document.querySelectorAll('.grid-item');
Array.from(divs).forEach(div => {
    div.addEventListener('click', classToggler);

});

type Grid = Array<string>
var clickCount : number = 0
var winnerValue : [number,number,number] | null = null;
const text : [string,string] = ['X','O']
let index : number = 0;

const title = document.getElementById('title')!;
const playAgainButton = document.getElementById('playAgain')!;

playAgainButton.addEventListener('click', e => {
    resetGame();
});

function resetGame() {
    divs.forEach(function (div) {
        div.textContent = "";
    });
    for (let i = 1; i < 10; i++) {
        document.getElementById(i.toString())!.style.color = '#D7CEB2'
    }
    winnerValue = null;
    clickCount = 0;
    index = 0;
    title.textContent = "Pass & Play";
}

function classToggler(this: any) {
if(this.textContent === "" && winnerValue === null){
    this.textContent=text[index];
    index = 1 - index;
    clickCount++
}

var val1 = document.getElementById('1')!.innerText
var val2 = document.getElementById('2')!.innerText
var val3 = document.getElementById('3')!.innerText
var val4 = document.getElementById('4')!.innerText
var val5 = document.getElementById('5')!.innerText
var val6 = document.getElementById('6')!.innerText
var val7 = document.getElementById('7')!.innerText
var val8 = document.getElementById('8')!.innerText
var val9 = document.getElementById('9')!.innerText

var grid = [
    val1, val2, val3,
    val4, val5, val6,
    val7, val8, val9
]

console.log(winnerValue);

// horizontal 123,456,789
// vertical 147,258,369
// diagonal 159,357

function checkWinner(grid:Grid): string | null {
    for (let i = 0; i < 11; i++) {
        if (i === 9){
            return 'draw'
        }
        if(grid[i]!==""){
            break
        }         
    }
    if(grid[0]===grid[1] && grid[1]===grid[2] && grid[0] !== ""){
        winnerValue = [1,2,3]
        return grid[0]
    } else if (grid[3]===grid[4] && grid[4]===grid[5] && grid[3] !== ""){
        winnerValue = [4,5,6]
        return grid[3]
    } else if (grid[6]===grid[7] && grid[7] === grid[8] && grid[6] !== ""){
        winnerValue = [7,8,9]
        return grid[6]
    } else if (grid[0]===grid[3] && grid[6] === grid[3] && grid[0] !== ""){
        winnerValue = [1,4,7]
        return grid[0]
    }else if (grid[1]===grid[4] && grid[4] === grid[7] && grid[1] !== ""){
        winnerValue = [2,5,8]
        return grid[1]
    }else if (grid[2]===grid[5] && grid[5] ===grid[8] && grid[2] !== ""){
        winnerValue = [3,6,9]
        return grid[2]
    }else if (grid[0]===grid[4] && grid[4] ===grid[8] && grid[0] !== ""){
        winnerValue = [1,5,9]
        return grid[0]
    }else if (grid[2]===grid[4] && grid[4] ===grid[6] && grid[2] !== ""){
        winnerValue = [3,5,7]
        return grid[2]
    } else{
        return null
    }
    
}

console.log(checkWinner(grid));
console.log(clickCount);

if (checkWinner(grid) !== null){
    console.log(checkWinner(grid)+" won!")
    for (let i = 0; i < winnerValue!.length; i++) {
        document.getElementById(winnerValue![i].toString())!.style.color = "black" 
    }
    title.textContent="Player "+checkWinner(grid)+" won!"
    title.style.textAlign = "center";
    title.style.fontSize = "50px";
    title.style.margin = "10px";
}

if(clickCount===9 && checkWinner(grid)== null){
    title.textContent="Draw!"
    title.style.textAlign = "center";
    title.style.fontSize = "50px";
    title.style.margin = "10px";
    }

};
//TODO : make play again button (all ts files concerned)




