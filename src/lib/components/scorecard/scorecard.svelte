<script lang="ts">
	import { stringify } from 'postcss';
	import { createEventDispatcher, onMount } from 'svelte';
	import { parse } from 'svelte/compiler';
	import Modal from '../modal.svelte';
	import type {CardFieldText} from './models';
	import type { Player } from '$lib/types/player';
	
	const dispatch = createEventDispatcher();
	
	export let player: Player; 

	let arePropsValid: boolean = false;
	let isScoreModalVisible: boolean = false;
	let activeModal: number = 0;

	const cardtexts: CardFieldText = {
		0: 'Ones',
		1: 'Twos',
		2: 'Threes',
		3: 'Fours',
		4: 'Fives',
		5: 'Sixes',
		6: 'Three of a kind',
		7: 'Four of a kind',
		8: 'Full house',
		9: 'Small straight',
		10: 'Large straight',
		11: 'Yahtzee',
		12: 'Chance'
	};

	onMount(() => {
		console.log('onmount Player: ', player);
	});
	
	// function handleScoreboardChange(event: Event) {
	// 	// console.log('scoreboard item input data: ', (event as InputEvent).data);
	// 	// console.log('scoreboard item id: ', (event.target as HTMLInputElement).name);

	// 	const scoreboardItemId = (event.target as HTMLInputElement).name;
	// 	const scoreboardItemValue = (event.target as HTMLInputElement).value;

	// 	// player = {
	// 	// 	...player,
	// 	// 	scoreboard: {
	// 	// 		...player.scoreboard,
	// 	// 		scores: player.scoreboard.scores.map((score) => {
	// 	// 			if (score.id === parseInt(scoreboardItemId)) {
	// 	// 				score.value = scoreboardItemValue;
	// 	// 			}
	// 	// 			return score;
	// 	// 		})
	// 	// 	}
	// 	// };

	// 	// player.scoreboard.scores.find((score) => {
	// 	// 	if (score.id === parseInt(scoreboardItemId)) {
	// 	// 		score.value = scoreboardItemValue;
	// 	// 		console.log('scoreboard item value: ', score.value);
	// 	// 	}
	// 	// });
	// }

	function calculateFinalScore() {
		let finalScore = 0;

		// if (
		// 	Object.values(scoreboardDto)
		// 		.slice(0, 6)
		// 		.reduce((acc, value) => acc + parseInt(value.score === "-" ? "0" : value.score), 0) >= 63
		// ) {
		// 	finalScore += 35;
		// }

		// for (const scoreboardItem in scoreboardDto) {
		// 	if (
		// 		scoreboardDto[scoreboardItem].score !== '' &&
		// 		scoreboardDto[scoreboardItem].score !== '-' &&
		// 		scoreboardDto[scoreboardItem].score !== '0' &&
		// 		scoreboardDto[scoreboardItem] !== undefined &&
		// 		scoreboardDto[scoreboardItem] !== null
		// 	) {
		// 		finalScore += parseInt(scoreboardDto[scoreboardItem].score);
		// 	}
		// }

		console.log('final score: ', finalScore);
		dispatch('finalScore', { finalScore: finalScore, player: player });
	}

	function openModal(id: number) {
		activeModal = id; // Set the active modal id when a button is clicked
		isScoreModalVisible = true;
	}

	function handleModalClose() {
		isScoreModalVisible = false;
		dispatch('scoreboardChange', { player: player });
	}

	$: {
		arePropsValid = false;
	}
</script>

<!-- <h1>{player}</h1> -->

<div class="grid grid-cols-2 gap-4">
	{#each Object.entries(cardtexts) as [key, value], i}
		<button
			class="btn {player.scoreboard.scores[i].value === '' ? 'btn-primary' : 'btn-accent'}"
			on:click={() => openModal(i)}
		>
			{#if player.scoreboard.scores[i].value === ''}
				{value}
			{:else}
				{value}: {player.scoreboard.scores[i].value} points
			{/if}
		</button>
		<Modal
			showModal={isScoreModalVisible && activeModal === i}
			on:close={handleModalClose}
		>
			<h3 class="font-bold" slot="header">{value}</h3>
			<p>Type in the score</p>
			<div class="py-1">
				<input
					name="{i.toString()}"
					bind:value={player.scoreboard.scores[i].value}
					type="text"
					placeholder="Score"
					class="input input-bordered w-full max-w-md"
				/>
			</div>
			<div class="py-2">
				<button class="btn btn-primary btn-sm rounded-full" on:click={handleModalClose}
					>Set score!</button
				>
			</div>
		</Modal>
	{/each}
</div>

<div class="py-2 text-center">
	<button class="btn btn-primary" disabled={!arePropsValid} on:click={calculateFinalScore}
		>Calculate final score</button
	>
</div>
