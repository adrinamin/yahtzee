import "reflect-metadata"
import { container } from "tsyringe"
import { WhacAMoleGame } from "./WhacAMole/whacAMole";
import { RockPaperScissorGame } from "./RockPaperScissor/rockPaperScissor"
import { MemoryGame } from "./MemoryGame/memoryGame"

let whacAMoleGame : any;

container.register("IWhacAMoleGame", { useClass: WhacAMoleGame });

function main() : void {
    whacAMoleGame = container.resolve(WhacAMoleGame)
    whacAMoleGame.displayWhacAMoleGame();

    container.resolve(RockPaperScissorGame).displayRockPaperScissorGame();
    container.resolve(MemoryGame).displayMemoryGame();
}

main();
