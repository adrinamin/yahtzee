export interface IRockPaperScissorGame {
    displayRockPaperScissorGame() : void;
}

export class RockPaperScissorGame implements IRockPaperScissorGame {
    
    private readonly computerChoiceDisplay : HTMLElement | null = document.getElementById('computer-choice')
    private readonly userChoiceDisplay : HTMLElement | null = document.getElementById('user-choice')
    private readonly resultDisplay : HTMLElement | null = document.getElementById('result')
    private readonly possibleChoices : NodeListOf<HTMLButtonElement> = document.querySelectorAll('button')
    private userChoice : string = "";
    private computerChoice : string = "";
    private result : string = "";
    
    constructor() {
        this.possibleChoices.forEach(possibleChoices => possibleChoices.addEventListener('click', (e : MouseEvent) =>{
            this.generateComputerChoice()
            this.userChoice = (e.target as HTMLButtonElement).id
            if (this.userChoiceDisplay != null)
            {
                this.userChoiceDisplay.innerHTML = this.userChoice
            }
            this.getResult()
        }))
    }
    
    displayRockPaperScissorGame(): void {
        const displayRpsGame = document.getElementById('display-rps')
        displayRpsGame?.addEventListener('click', () => {
            let rpsGame = document.getElementsByClassName("rps-game")
            if ((rpsGame[0] as HTMLElement).style.display == "none"){
                (rpsGame[0] as HTMLElement).style.display = "block"
            } 
            else{
                (rpsGame[0] as HTMLElement).style.display = "none"
            }
        });
    }

    private generateComputerChoice() : void {
        const randomNumber = Math.floor(Math.random() * this.possibleChoices.length)
        // console.log(randomNumber)
        if (randomNumber == 1){
            this.computerChoice = "rock"
        }
        if (randomNumber == 2){
            this.computerChoice = "scissors"
        }
        if (randomNumber == 3){
            this.computerChoice = "paper"
        }
    
        if (this.computerChoiceDisplay != null) {
            this.computerChoiceDisplay.innerHTML = this.computerChoice
        }
    }
    
    private getResult() : void {
    
        if(this.computerChoice == this.userChoice ) {
            this.result = "its a draw!"
        }
    
        if(this.computerChoice == "rock" && this.userChoice == "paper") {
            this.result = "You won!"
        }
    
        if(this.computerChoice == "rock" && this.userChoice == "scissors") {
            this.result = "You lost!"
        }
    
        if(this.computerChoice == "paper" && this.userChoice == "scissors") {
            this.result = "You won!"
        }
    
        if(this.computerChoice == "paper" && this.userChoice == "rock") {
            this.result = "You lost!"
        }
    
        if(this.computerChoice == "scissors" && this.userChoice == "rock") {
            this.result = "You won!"
        }
    
        if(this.computerChoice == "scissors" && this.userChoice == "paper") {
            this.result = "You lost!"
        }
    
        if(this.resultDisplay != null && this.resultDisplay != undefined) {
            this.resultDisplay.innerHTML = this.result
        }
    }

}





