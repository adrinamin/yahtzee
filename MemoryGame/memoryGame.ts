const displayMemoryGame = document.getElementById('display-memorygame')

displayMemoryGame?.addEventListener('click', () => {
    let memoryGame = document.getElementsByClassName("memorygame")
    if ((memoryGame[0] as HTMLElement).style.display == "none"){
        (memoryGame[0] as HTMLElement).style.display = "block"
    }
    else{
        (memoryGame[0] as HTMLElement).style.display = "none"
    }
});

const cardArray = [
    {
        name: "fries",
        img: new URL("../images/fries.png", import.meta.url).toString()
    },
    {
        name: "cheesburger",
        img: new URL("../images/cheeseburger.png", import.meta.url).toString()
    },
    {
        name: "hotdog",
        img: new URL("../images/hotdog.png", import.meta.url).toString()
    },
    {
        name: "ice-cream",
        img: new URL("../images/ice-cream.png", import.meta.url).toString()
    },
    {
        name: "milkshake",
        img: new URL("../images/milkshake.png", import.meta.url).toString()
    },
    {
        name: "pizza",
        img: new URL("../images/pizza.png", import.meta.url).toString()
    },
    {
        name: "fries",
        img: new URL("../images/fries.png", import.meta.url).toString()
    },
    {
        name: "cheesburger",
        img: new URL("../images/cheeseburger.png", import.meta.url).toString()
    },
    {
        name: "hotdog",
        img: new URL("../images/hotdog.png", import.meta.url).toString()
    },
    {
        name: "ice-cream",
        img: new URL("../images/ice-cream.png", import.meta.url).toString()
    },
    {
        name: "milkshake",
        img: new URL("../images/milkshake.png", import.meta.url).toString()
    },
    {
        name: "pizza",
        img: new URL("../images/pizza.png", import.meta.url).toString()
    }
];

cardArray.sort(() => 0.5 - Math.random()); // trick for shuffling an array randomly

const gridDisplay = document.querySelector("#grid")
const memoryResultDisplay = document.querySelector("#result")

let cardChosen : string[] = []

let cardsChosenIds : string[] = []

const cardsWon : any[] = []


function createBoard () {
    for (let i : number = 0; i < cardArray.length; i++) {
        const card = document.createElement('img')
        card.src = new URL("../images/blank.png", import.meta.url).toString() // for parcel bundler
        card.setAttribute("data-id", i.toString())
        card.addEventListener('click', flipCard)
        gridDisplay?.appendChild(card)
    }
}

createBoard()

function flipCard(this: any) {
    const cardId = this.getAttribute("data-id")
    const cardName = cardArray[cardId].name
    cardChosen.push(cardName)
    cardsChosenIds.push(cardId)

    console.log("flip card", cardId);

    this.setAttribute("src", cardArray[cardId].img)

    if(cardChosen.length === 2) {
        setTimeout(checkMatch, 500)
    }
}

function checkMatch() {
    const cards = document.querySelectorAll("#grid img")
    const optionOneId : number = parseInt(cardsChosenIds[0])
    const optionTwoId : number = parseInt(cardsChosenIds[1])

    if(optionOneId === optionTwoId) {
        (cards[optionOneId] as HTMLImageElement).src = new URL("../images/blank.png", import.meta.url).toString();
        (cards[optionTwoId] as HTMLImageElement).src = new URL("../images/blank.png", import.meta.url).toString();
        alert("You have clicked the same image")
    }

    console.log("check for match")
    if(cardChosen[0] == cardChosen[1]){
        alert("You found a match!");
        (cards[optionOneId] as HTMLImageElement).src = new URL("../images/white.png", import.meta.url).toString();
        (cards[optionTwoId] as HTMLImageElement).src = new URL("../images/white.png", import.meta.url).toString();
        cards[optionOneId].removeEventListener('click', flipCard)
        cards[optionTwoId].removeEventListener('click', flipCard)

        cardsWon.push(cardChosen)
    } else {
        (cards[optionOneId] as HTMLImageElement).src = new URL("../images/blank.png", import.meta.url).toString();
        (cards[optionTwoId] as HTMLImageElement).src = new URL("../images/blank.png", import.meta.url).toString();
        alert("Sorry try again")
    }

    if (resultDisplay != null) {
        resultDisplay.textContent = cardsWon.length.toString()
    }

    cardChosen = [];
    cardsChosenIds = [];

    if(cardsWon.length == cardArray.length/2 && memoryResultDisplay != null) {
        memoryResultDisplay.innerHTML = "Congratulations, you found them all!"
    }
}