<script lang="ts">
	import { stringify } from 'postcss';
	import { createEventDispatcher } from 'svelte';
	import { parse } from 'svelte/compiler';
	import Modal from '../modal.svelte';
	import type {CardFieldText} from './models';

	const dispatch = createEventDispatcher();

	export let playerName: string = '';
	let arePropsValid: boolean = false;
	let isScoreModalVisible: boolean = false;
	let activeModal: number = 0;

	let properties: { [key: string]: CardFieldText } = {
		ones: { id: 1, text: 'score of ones', score: '' },
		twos: { id: 2, text: 'score of twos', score: '' },
		threes: { id: 3, text: 'score of threes', score: '' },
		fours: { id: 4, text: 'score of fours', score: '' },
		fives: { id: 5, text: 'score of fives', score: '' },
		sixs: { id: 6, text: 'score of sixs', score: '' },
		threeOfAKind: { id: 7, text: 'three of a kind', score: '' },
		fourOfAKind: { id: 8, text: 'four of a kind', score: '' },
		fullHouse: { id: 9, text: 'full house', score: '' },
		smallStraight: { id: 10, text: 'small straight', score: '' },
		largeStraight: { id: 11, text: 'large straight', score: '' },
		yahtzee: { id: 12, text: 'yahtzee', score: '' },
		chance: { id: 13, text: 'chance', score: '' }
	};

	function calculateFinalScore() {
		let finalScore = 0;

		if (
			Object.values(properties)
				.slice(0, 6)
				.reduce((acc, value) => acc + parseInt(value.score === "-" ? "0" : value.score), 0) >= 63
		) {
			finalScore += 35;
		}

		for (const property in properties) {
			if (
				properties[property].score !== '' &&
				properties[property].score !== '-' &&
				properties[property].score !== '0' &&
				properties[property] !== undefined &&
				properties[property] !== null
			) {
				finalScore += parseInt(properties[property].score);
			}
		}

		console.log('final score: ', finalScore);
		dispatch('finalScore', { finalScore: finalScore, player: playerName });
	}

	function openModal(id: number) {
		activeModal = id; // Set the active modal id when a button is clicked
		isScoreModalVisible = true;
	}

	function handleModalClose() {
		isScoreModalVisible = false;
	}

	$: {
		arePropsValid = Object.values(properties).every((value) => value.score !== '');
	}
</script>

<!-- <h1>{player}</h1> -->

<div class="grid grid-cols-2 gap-4">
	{#each Object.values(properties) as property, index (property.id)}
		<button
			class="btn {property.score === '' ? 'btn-primary' : 'btn-accent'}"
			on:click={() => openModal(property.id)}
		>
			{#if property.score === ''}
				{property.text}
			{:else}
				{property.text}: {property.score} points
			{/if}
		</button>
		<Modal
			showModal={isScoreModalVisible && activeModal === property.id}
			on:close={handleModalClose}
		>
			<h3 class="font-bold" slot="header">{property.text}</h3>
			<p>Type in the score</p>
			<div class="py-1">
				<input
					bind:value={property.score}
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
