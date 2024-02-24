export {};

const divs = document.querySelectorAll('.grid-item');
Array.from(divs).forEach(div => {
    div.addEventListener('click', classToggler);

});

var clickCount : number = 0
var winnerValue : [number,number,number] | null = null;
const text : [string,string] = ['X','O']
let index : number = 0;


function classToggler() {
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

function checkWinner(grid){
    if(val1===val2 && val2===val3 && val1 !== ""){
        winnerValue = [1,2,3]
        return val1
    } else if (val4===val5 && val5===val6 && val4 !== ""){
        winnerValue = [4,5,6]
        return val4
    } else if (val7===val8 && val8 === val9 && val7 !== ""){
        winnerValue = [7,8,9]
        return val7
    } else if (val1===val4 && val7 === val4 && val1 !== ""){
        winnerValue = [1,4,7]
        return val1
    }else if (val2===val5 && val5 === val8 && val2 !== ""){
        winnerValue = [2,5,8]
        return val2
    }else if (val3===val6 && val6 ===val9 && val3 !== ""){
        winnerValue = [3,6,9]
        return val3
    }else if (val1===val5 && val5 ===val9 && val1 !== ""){
        winnerValue = [1,5,9]
        return val1
    }else if (val3===val5 && val5 ===val7 && val3 !== ""){
        winnerValue = [3,5,7]
        return val3
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
    document.getElementById("title")!.textContent="Player "+checkWinner(grid)+" won!"
    document.getElementById("title")!.style.textAlign = "center";
    document.getElementById("title")!.style.fontSize = "50px";
    document.getElementById("title")!.style.margin = "10px";
}

if(clickCount===9 && checkWinner(grid)== null){
    document.getElementById("title")!.textContent="Draw!"
    document.getElementById("title")!.style.textAlign = "center";
    document.getElementById("title")!.style.fontSize = "50px";
    document.getElementById("title")!.style.margin = "10px";
    }
};

