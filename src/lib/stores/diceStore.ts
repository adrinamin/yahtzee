import { writable } from "svelte/store";

export const diceStore = writable<number[]>([]);
export const diceRollStore = writable<boolean[]>([false, false, false, false, false]);