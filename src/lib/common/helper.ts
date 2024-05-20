import type { Scoreboard } from "$lib/types/scoreboard";

export function calculateScore(scoreboard: Scoreboard): number {
    return scoreboard.scores.reduce((acc, score) => {
        if (score.value !== '' && score.value !== '-' && score.value !== '0') {
            acc += parseInt(score.value);
        }
        return acc;
    }, 0);
}

export function isFirstHalfOver63(scoreboard: Scoreboard): boolean {
    return scoreboard.scores
            .slice(0, 6)
            .reduce((acc, score) => acc + parseInt(score.value === '-' ? '0' : score.value), 0) >= 63;
}