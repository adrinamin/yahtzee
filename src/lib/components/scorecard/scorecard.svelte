<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import Modal from '../modal.svelte';
	import type { CardFieldText } from './models';
	import type { Player } from '$lib/types/player';

	const dispatch = createEventDispatcher();

	export let player: Player;

	let isScoreModalVisible: boolean = false;
	let activeModal: number = 0;

	const cardtexts: CardFieldText[] = [
		{ text: 'Ones', isChecked: false, cardFieldValue: 0 },
		{ text: 'Twos', isChecked: false, cardFieldValue: 0 },
		{ text: 'Threes', isChecked: false, cardFieldValue: 0 },
		{ text: 'Fours', isChecked: false, cardFieldValue: 0 },
		{ text: 'Fives', isChecked: false, cardFieldValue: 0 },
		{ text: 'Sixes', isChecked: false, cardFieldValue: 0 },
		{ text: 'Three of a kind', isChecked: false, cardFieldValue: 0 },
		{ text: 'Four of a kind', isChecked: false, cardFieldValue: 0 },
		{ text: 'Chance', isChecked: false, cardFieldValue: 0 },
		{ text: 'Full house', isChecked: false, cardFieldValue: 25 },
		{ text: 'Small straight', isChecked: false, cardFieldValue: 30 },
		{ text: 'Large straight', isChecked: false, cardFieldValue: 40 },
		{ text: 'Yahtzee', isChecked: false, cardFieldValue: 50 }
	];

	onMount(() => {
		console.log('scorecard component loaded');
		// console.log('onmount Player: ', player);
	});

	function calculateScore() {
		return player.scoreboard.scores.reduce((acc, score) => {
			if (score.value !== '' && score.value !== '-' && score.value !== '0') {
				acc += parseInt(score.value);
			}
			return acc;
		}, 0);
	}

	function openModal(id: number) {
		activeModal = id; // Set the active modal id when a button is clicked
		isScoreModalVisible = true;
	}

	function handleModalClose() {
		isScoreModalVisible = false;
		triggerPlayerChange();
	}

	function triggerPlayerChange() {
		player.finalScore = calculateScore();
		player = player; // trigger reactivity
		dispatch('scoreboardChange', { player: player });
	}

	$: {
		// Trigger reactivity by reassigning the array
		player.scoreboard.scores = [...player.scoreboard.scores];
	}
</script>

<div class="grid grid-cols-2 gap-4">
	{#each cardtexts as card, i}
		{#if i < 9}
			<button
				class="btn {player.scoreboard.scores[i].value === '' ? 'btn-primary' : 'btn-accent'}"
				on:click={() => openModal(i)}
			>
				{#if player.scoreboard.scores[i].value === ''}
					{card.text}
				{:else}
					{card.text}: {player.scoreboard.scores[i].value}
					{player.scoreboard.scores[i].value !== '-' ? ' points' : ''}
				{/if}
			</button>
			<Modal showModal={isScoreModalVisible && activeModal === i} on:close={handleModalClose}>
				<h3 class="font-bold" slot="header">{card.text}</h3>
				<p>Type in the score</p>
				<div class="py-1">
					<input
						name={i.toString()}
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
		{:else}
			<label class="checkbox-button">
				<input
					type="checkbox"
					bind:checked={card.isChecked}
					aria-label={card.text}
					on:change={() => {
						player.scoreboard.scores[i].value = card.isChecked
							? card.cardFieldValue.toString()
							: '';
						// console.log('Player: ', player.scoreboard.scores[i].value);
						// Trigger reactivity by reassigning the array
						player.scoreboard.scores = [...player.scoreboard.scores];
						triggerPlayerChange();
					}}
				/>
				<span class="btn {player.scoreboard.scores[i].value === '' ? 'btn-primary' : 'btn-accent'}">
					{card.text}
				</span>
			</label>
		{/if}
	{/each}
</div>

<style>
	.checkbox-button {
		position: relative;
		display: inline-block;
		cursor: pointer;
		width: 100%;
	}

	.checkbox-button input[type='checkbox'] {
		position: absolute;
		opacity: 0;
		cursor: pointer;
		height: 0;
		width: 0;
	}

	.checkbox-button .btn {
		width: 100%; /* The checkbox-button is a wrapper so we have to force the max width*/
	}
</style>
