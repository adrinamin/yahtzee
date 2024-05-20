import { writable } from "svelte/store";

export const score = writable(0);

export function updateScore(newScore: number) {
    score.update((prev) => prev + newScore);
}