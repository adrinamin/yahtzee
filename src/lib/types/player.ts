import type { Scoreboard } from "./scoreboard";

export interface Player {
    name: string;
    finalScore: number;
    scoreboard: Scoreboard;
}