<script lang="ts">
	import { stringify } from 'postcss';
	import { createEventDispatcher, onMount } from 'svelte';
	import { parse } from 'svelte/compiler';
	import Modal from '../modal.svelte';
	import type {CardFieldText} from './models';
	import type { Player } from '$lib/types/player';
	
	const dispatch = createEventDispatcher();
	
	export let player: Player; 

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
		player.finalScore = calculateScore();
		player = player; // trigger reactivity
		dispatch('scoreboardChange', { player: player });
	}
</script>

<div class="grid grid-cols-2 gap-4">
	{#each Object.entries(cardtexts) as [key, value], i}
		<button
			class="btn {player.scoreboard.scores[i].value === '' ? 'btn-primary' : 'btn-accent'}"
			on:click={() => openModal(i)}
		>
			{#if player.scoreboard.scores[i].value === ''}
				{value}
			{:else}
				{value}: {player.scoreboard.scores[i].value} {player.scoreboard.scores[i].value !== '-' ? 'points' : ''}
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
