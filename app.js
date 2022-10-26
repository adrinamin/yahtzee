const displayRpsGame = document.getElementById('display-rps')
const displayMemoryGame = document.getElementById('display-memorygame')

const computerChoiceDisplay = document.getElementById('computer-choice')
const userChoiceDisplay = document.getElementById('user-choice')
const resultDisplay = document.getElementById('result')
const possibleChoices = document.querySelectorAll('button')
let userChoice
let computerChoice
let result


displayRpsGame.addEventListener('click', () => {
    let rpsGame = document.getElementsByClassName("rps-game")
    if (rpsGame[0].style.display == "none"){
        rpsGame[0].style.display = "block"
    } 
    else{
        rpsGame[0].style.display = "none"
    }
});

displayMemoryGame.addEventListener('click', () => {
    let memoryGame = document.getElementsByClassName("memorygame")
    if (memoryGame[0].style.display == "none"){
        memoryGame[0].style.display = "block"
    }
    else{
        memoryGame[0].style.display = "none"
    }
});

possibleChoices.forEach(possibleChoices => possibleChoices.addEventListener('click', (e) =>{
    generateComputerChoice()
    userChoice = e.target.id
    userChoiceDisplay.innerHTML = userChoice
    getResult()
}))


function generateComputerChoice() {
    const randomNumber = Math.floor(Math.random() * possibleChoices.length)
    // console.log(randomNumber)
    if (randomNumber == 1){
        computerChoice = "rock"
    }
    if (randomNumber == 2){
        computerChoice = "scissors"
    }
    if (randomNumber == 3){
        computerChoice = "paper"
    }
    computerChoiceDisplay.innerHTML = computerChoice
}

function getResult() {

    if(computerChoice == userChoice ) {
        result = "its a draw!"
    }

    if(computerChoice == "rock" && userChoice == "paper") {
        result = "You won!"
    }

    if(computerChoice == "rock" && userChoice == "scissors") {
        result = "You lost!"
    }

    if(computerChoice == "paper" && userChoice == "scissors") {
        result = "You won!"
    }

    if(computerChoice == "paper" && userChoice == "rock") {
        result = "You lost!"
    }

    if(computerChoice == "scissors" && userChoice == "rock") {
        result = "You won!"
    }

    if(computerChoice == "scissors" && userChoice == "paper") {
        result = "You lost!"
    }

    resultDisplay.innerHTML = result
}


const cardArray = [
    {
        name: "fries",
        img: "images/fries.png"
    },
    {
        name: "cheesburger",
        img: "images/cheeseburger.png"
    },
    {
        name: "hotdog",
        img: "images/hotdog.png"
    },
    {
        name: "ice-cream",
        img: "images/ice-cream.png"
    },
    {
        name: "milkshake",
        img: "images/milkshake.png"
    },
    {
        name: "pizza",
        img: "images/pizza.png"
    },
    {
        name: "fries",
        img: "images/fries.png"
    },
    {
        name: "cheesburger",
        img: "images/cheeseburger.png"
    },
    {
        name: "hotdog",
        img: "images/hotdog.png"
    },
    {
        name: "ice-cream",
        img: "images/ice-cream.png"
    },
    {
        name: "milkshake",
        img: "images/milkshake.png"
    },
    {
        name: "pizza",
        img: "images/pizza.png"
    }
];

cardArray.sort(() => 0.5 - Math.random()); // trick for shuffling an array randomly

const gridDisplay = document.querySelector("#grid")
const memoryResultDisplay = document.querySelector("#result")

let cardChosen = []

let cardsChosenIds = []

const cardsWon = []


function createBoard () {
    for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('img')
        card.setAttribute("src", "images/blank.png")
        card.setAttribute("data-id", i)
        card.addEventListener('click', flipCard)
        gridDisplay.appendChild(card)
    }
}

createBoard()

function flipCard() {
    const cardId = this.getAttribute("data-id")
    const cardName = cardArray[cardId].name
    cardChosen.push(cardName)
    cardsChosenIds.push(cardId)


    console.log("flip card", cardId)

    this.setAttribute("src", cardArray[cardId].img)

    if(cardChosen.length === 2) {
        setTimeout(checkMatch, 500)
    }
}

function checkMatch() {
    const cards = document.querySelectorAll("#grid img")
    const optionOneId = cardsChosenIds[0]
    const optionTwoId = cardsChosenIds[1]

    if(optionOneId === optionTwoId) {
        cards[optionOneId].setAttribute('src', 'images/blank.png')
        cards[optionTwoId].setAttribute('src', 'images/blank.png')
        alert("You have clicked the same image")
    }

    console.log("check for match")
    if(cardChosen[0] == cardChosen[1]){
        alert("You found a match!")
        cards[optionOneId].setAttribute('src', 'images/white.png')
        cards[optionTwoId].setAttribute('src', 'images/white.png')
        cards[optionOneId].removeEventListener('click', flipCard)
        cards[optionTwoId].removeEventListener('click', flipCard)

        cardsWon.push(cardChosen)
    } else {
        cards[optionOneId].setAttribute('src', 'images/blank.png')
        cards[optionTwoId].setAttribute('src', 'images/blank.png')
        alert("Sorry try again")
    }

    resultDisplay.textContent = cardsWon.length

    cardChosen = [];
    cardsChosenIds = [];

    if(cardsWon.length == cardArray.length/2) {
        memoryResultDisplay.innerHTML = "Congratulations, you found them all!"
    }

}