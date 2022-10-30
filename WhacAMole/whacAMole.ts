const displayWhacAMoleGame = document.getElementById('display-whacamole')

displayWhacAMoleGame?.addEventListener('click', () => {
    let whacAMoleGame = document.getElementsByClassName("whac-a-mole-game")
    if ((whacAMoleGame[0]as HTMLElement).style.display == "none"){
        (whacAMoleGame[0]as HTMLElement).style.display = "block"
    }
    else{
        (whacAMoleGame[0]as HTMLElement).style.display = "none"
    }
});

const squares = document.querySelectorAll('.square');
const mole = document.querySelector('.mole');
const timeLeft = document.querySelector('#time-left');
const score = document.querySelector('#score');

let whacamoleResult = 0;
let hitPosition : number | null = 0;
let currentTime = 10;
let timerId : any = null;


function randomSquare() {
    squares.forEach(square => {
        square.classList.remove('mole');
    });

    let randomSquare = squares[Math.floor(Math.random() * 9)] // math floor rounds the random number down
    randomSquare.classList.add('mole');
    hitPosition = parseInt(randomSquare.id);

}

squares.forEach(square => {
    square.addEventListener('click', () => {
        if(hitPosition != null && square.id == hitPosition.toString()) {
            whacamoleResult++;
            if (score != null) {
                score.textContent = whacamoleResult.toString();
            }
            hitPosition = null;
        }
    });
})

function moveMole() {
    timerId = setInterval(randomSquare, 1000);
}

moveMole(); // todo: attach it to a button


function countDown() {
    currentTime--;
    if (timeLeft != null) {
        timeLeft.textContent = currentTime.toString();
    }

    if(currentTime == 0){
        clearInterval(countDownTimerId);
        clearInterval(timerId);
        alert("Game over! Your final score is: " + whacamoleResult)
    }


}

let countDownTimerId = setInterval(countDown,1000)
