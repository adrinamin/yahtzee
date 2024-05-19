export interface Scoreboard {
    scores: Score[];
}

interface Score {
    id: number;
    value: string;
}