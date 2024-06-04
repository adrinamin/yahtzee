import type { Player } from "$lib/types/player";
import { writable } from "svelte/store";

export const isGameStartedStore = writable(false);
export const currentPlayerStore = writable<Player | null>(null);
export const playersStore = writable<Player[]>([]);