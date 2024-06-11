<!-- src/lib/components/Dice.svelte -->
<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { diceStore, diceRollCountStore } from '$lib/stores/diceStore';

	export let finalScore: number = 0;
	let rollCounts: number = 0;
	const buttonName = 'roll the dice';
	let dice1 = 0;
	let dice2 = 0;
	let dice3 = 0;
	let dice4 = 0;
	let dice5 = 0;

	let dice1Locked = false;
	let dice2Locked = false;
	let dice3Locked = false;
	let dice4Locked = false;
	let dice5Locked = false;

	const dispatch = createEventDispatcher();

	onMount(() => {
		console.log('Dice component has loaded')
		dice1 = $diceStore[0] || 0;
		dice2 = $diceStore[1] || 0;
		dice3 = $diceStore[2] || 0;
		dice4 = $diceStore[3] || 0;
		dice5 = $diceStore[4] || 0;
		rollCounts = $diceRollCountStore;
	});

	function rollDice() {
		if (!dice1Locked) {
			dice1 = Math.floor(Math.random() * 6) + 1;
			$diceStore[0] = dice1;
		}
		if (!dice2Locked) {
			dice2 = Math.floor(Math.random() * 6) + 1;
			$diceStore[1] = dice2;
		}
		if (!dice3Locked) {
			dice3 = Math.floor(Math.random() * 6) + 1;
			$diceStore[2] = dice3;
		}
		if (!dice4Locked) {
			dice4 = Math.floor(Math.random() * 6) + 1;
			$diceStore[3] = dice4;
		}
		if (!dice5Locked) {
			dice5 = Math.floor(Math.random() * 6) + 1;
			$diceStore[4] = dice5;
		}
		rollCounts++;
		diceRollCountStore.set(rollCounts);
	}

	function nextPlayer() {
		finalScore = dice1 + dice2 + dice3 + dice4 + dice5;
		rollCounts = 0;
		diceRollCountStore.set(rollCounts);
		dice1 = 0;
		dice2 = 0;
		dice3 = 0;
		dice4 = 0;
		dice5 = 0;
		dice1Locked = false;
		dice2Locked = false;
		dice3Locked = false;
		dice4Locked = false;
		dice5Locked = false;
		dispatch('nextPlayer', { finalScore: finalScore });
	}
</script>

<div class="text-center">
	{#if rollCounts === 3}
		<button class="btn btn-warning rounded-full btn-sm" on:click={nextPlayer}>Next player</button>
	{:else}
        <button class="btn btn-primary rounded-full btn-sm" on:click={rollDice}>{buttonName}</button>
	{/if}
</div>
<div class="flex flex-wrap justify-evenly pt-4">
	<input
		class="btn btn-square btn-secondary"
		type="checkbox"
		bind:checked={dice1Locked}
		aria-label={dice1.toString()}
	/>
	<input
		class="btn btn-square btn-secondary"
		type="checkbox"
		bind:checked={dice2Locked}
		aria-label={dice2.toString()}
	/>
	<input
		class="btn btn-square btn-secondary"
		type="checkbox"
		bind:checked={dice3Locked}
		aria-label={dice3.toString()}
	/>
	<input
		class="btn btn-square btn-secondary"
		type="checkbox"
		bind:checked={dice4Locked}
		aria-label={dice4.toString()}
	/>
	<input
		class="btn btn-square btn-secondary"
		type="checkbox"
		bind:checked={dice5Locked}
		aria-label={dice5.toString()}
	/>
</div>
