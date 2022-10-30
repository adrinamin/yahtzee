import { Card } from './card';

export interface IMemoryGame {
    displayMemoryGame() : void;
}

export class MemoryGame implements IMemoryGame {
    private readonly gridDisplay : Element | null = document.querySelector("#grid");
    private readonly memoryResultDisplay : Element | null = document.querySelector("#result");
    private cardArray : Card[] = [];
    private cardChosen : string[] = [];
    private cardsChosenIds : string[] = []
    private cardsWon : any[] = []


    displayMemoryGame(): void {
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
    }

    constructor() {
        this.cardArray = [
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
        
        this.cardArray.sort(() => 0.5 - Math.random()); // trick for shuffling an array randomly

        this.createBoard();
    }
    
    private createBoard () : void {
        for (let i : number = 0; i < this.cardArray.length; i++) {
            const card = document.createElement('img')
            card.src = new URL("../images/blank.png", import.meta.url).toString() // for parcel bundler
            card.setAttribute("data-id", i.toString())
            card.addEventListener('click', () => this.flipCard(card))
            this.gridDisplay?.appendChild(card)
        }
    }

    private flipCard(cardElement: HTMLImageElement) {
        const cardId = cardElement.getAttribute("data-id")
        if (cardId === null) {
            console.error("card is null!");
            return;
        }

        const cardName = this.cardArray[parseInt(cardId)].name
        this.cardChosen.push(cardName)
        this.cardsChosenIds.push(cardId)
    
        console.log("flip card", cardId);
    
        cardElement.setAttribute("src", this.cardArray[parseInt(cardId)].img)
    
        if(this.cardChosen.length === 2) {
            setTimeout(() => { this.checkMatch(); }, 500)
        }
    }

    private checkMatch() {
        const cards = document.querySelectorAll("#grid img")
        const optionOneId : number = parseInt(this.cardsChosenIds[0])
        const optionTwoId : number = parseInt(this.cardsChosenIds[1])
    
        if(optionOneId === optionTwoId) {
            (cards[optionOneId] as HTMLImageElement).src = new URL("../images/blank.png", import.meta.url).toString();
            (cards[optionTwoId] as HTMLImageElement).src = new URL("../images/blank.png", import.meta.url).toString();
            alert("You have clicked the same image")
        }
    
        if(this.cardChosen[0] == this.cardChosen[1]){
            alert("You found a match!");
            (cards[optionOneId] as HTMLImageElement).src = new URL("../images/white.png", import.meta.url).toString();
            (cards[optionTwoId] as HTMLImageElement).src = new URL("../images/white.png", import.meta.url).toString();
            cards[optionOneId].removeEventListener('click', () => { this.flipCard(cards[optionOneId] as HTMLImageElement) });
            cards[optionTwoId].removeEventListener('click', () => { this.flipCard(cards[optionTwoId] as HTMLImageElement) });
    
            this.cardsWon.push(this.cardChosen)
        } else {
            (cards[optionOneId] as HTMLImageElement).src = new URL("../images/blank.png", import.meta.url).toString();
            (cards[optionTwoId] as HTMLImageElement).src = new URL("../images/blank.png", import.meta.url).toString();
            alert("Sorry try again")
        }
    
        if (this.memoryResultDisplay != null) {
            this.memoryResultDisplay.textContent = this.cardsWon.length.toString()
        }
    
        this.cardChosen = [];
        this.cardsChosenIds = [];
    
        if(this.cardsWon.length == this.cardArray.length/2 && this.memoryResultDisplay != null) {
            this.memoryResultDisplay.innerHTML = "Congratulations, you found them all!"
        }
    }
}



