import { writable } from "svelte/store";

export const diceStore = writable<number[]>([]);
export const diceLockedStore = writable<boolean[]>([false, false, false, false, false]);
export const diceRollCountStore = writable<number>(0);