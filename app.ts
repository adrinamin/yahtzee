import "reflect-metadata"
import { container } from "tsyringe"
import { WhacAMoleGame } from "./WhacAMole/whacAMole";

container.register("IWhacAMoleGame", {
    useClass: WhacAMoleGame
  });

function main() : void {
    const whacAMoleGame = container.resolve(WhacAMoleGame)
    whacAMoleGame.displayWhacAMoleGame();
    whacAMoleGame.start();
}

main();
