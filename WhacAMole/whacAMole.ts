export interface IWhacAMoleGame {
    displayWhacAMoleGame() : void;
    start() : void;
}

export class WhacAMoleGame implements IWhacAMoleGame {
    
    private squares : NodeListOf<Element> = document.querySelectorAll('.square');
    private readonly timeLeft : Element | null = document.querySelector('#time-left');
    private readonly score : Element | null = document.querySelector('#score');
    private whacamoleResult : number = 0;
    private hitPosition : number | null = 0;
    private currentTime : number = 10;
    private timerId : any = null;
    private countDownTimerId : number = 0;

    constructor() {

        document.querySelector('#startWhacAMoleGame')?.addEventListener('click', (event: Event) => {this.start()});

        this.squares.forEach(square => {
            square.addEventListener('click', () => {
                if(this.hitPosition != null && square.id == this.hitPosition.toString()) {
                    this.whacamoleResult++;
                    if (this.score != null) {
                        this.score.textContent = this.whacamoleResult.toString();
                    }
                    this.hitPosition = null;
                }
            });
        })
    }

    public displayWhacAMoleGame(): void {
        const hideOrDisplay = document.getElementById('display-whacamole')
        hideOrDisplay?.addEventListener('click', () => {
            let whacAMoleGame = document.getElementsByClassName("whac-a-mole-game")
            
            if ((whacAMoleGame[0] as HTMLElement).style.display == "none"){
                (whacAMoleGame[0] as HTMLElement).style.display = "block"
            }
            else{
                (whacAMoleGame[0] as HTMLElement).style.display = "none"
            }
        });
    }

    public start(): void {
        this.timerId = setInterval(() => {this.randomSquare();}, 1000);
        this.countDownTimerId = setInterval(() => {this.countDown();}, 1000);
    }

    private randomSquare(): void {
        
        this.squares.forEach(square => {
            square.classList.remove('mole');
        });
    
        let randomSquare = this.squares[Math.floor(Math.random() * 9)] // math floor rounds the random number down
        randomSquare.classList.add('mole');
        this.hitPosition = parseInt(randomSquare.id);
    }

    private countDown(): void {
        this.currentTime--;
        if (this.timeLeft != null) {
            this.timeLeft.textContent = this.currentTime.toString();
        }
    
        if(this.currentTime == 0){
            clearInterval(this.countDownTimerId);
            clearInterval(this.timerId);
            alert("Game over! Your final score is: " + this.whacamoleResult)
        }
    }
}
