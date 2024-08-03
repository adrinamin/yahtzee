// place files you want to import through the `$lib` alias in this folder.
export { default as Dice } from './components/dice.svelte';
export { default as Modal } from './components/modal.svelte';
export { default as ScoreCard } from './components/scorecard/scorecard.svelte';
export { default as Alert } from './components/alert.svelte';
export type { Player } from './types/player';
export type { Scoreboard } from './types/scoreboard';
export { default as Game } from './components/game.svelte';
export { currentPlayerStore, playersStore, isGameStartedStore } from './stores/mainPageState';
export { diceLockedStore as diceRollStore, diceStore } from './stores/diceStore';

