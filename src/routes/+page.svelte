<script lang="ts">
	import { onMount } from 'svelte';
	import Modal from '$lib/components/modal.svelte';
	import Dice from '$lib/components/dice.svelte';
	import Scorecard from '$lib/components/scorecard/scorecard.svelte';
	// import Alert from '$lib/components/alert.svelte';
	import type { Player } from './+page';

	const numberOfPlayers: number[] = [1, 2, 3, 4, 5, 6];

	let showModal: boolean;
	let selectedPlayers: number;
	let players: Player[];
	let currentPlayer: Player;
	let playerNames: string[] = [];
	let arePlayersVisible: boolean;
	let isFormValid = false;
	let isNextPlayerModalVisible: boolean;

	onMount(() => {
		console.log('The page has loaded');
		resetModalValues();
		showModal = false;
		arePlayersVisible = false;
		isNextPlayerModalVisible = false;
	});

	function handleSubmit(): void {
		players = Array.from({ length: selectedPlayers }, (_, i) => ({
			name: playerNames[i],
			score: 0
		}));
		console.log('Players created: ', players);
		showModal = false;
		resetModalValues();
		currentPlayer = players[0];
		arePlayersVisible = true;
	}

	function handleModalClose(): void {
		resetModalValues();
	}

	function resetModalValues(): void {
		playerNames = [];
		selectedPlayers = 0;
	}

	function openModal(): void {
		showModal = true;
	}

	function nextPlayer(event: CustomEvent): void {
		const currentPlayerIndex = players.indexOf(currentPlayer);
		currentPlayer = players[currentPlayerIndex + 1] || players[0];
		// alert(`You scored ${event.detail.finalScore} points! It's ${currentPlayer.name}'s turn`);
		isNextPlayerModalVisible = true;
	}

	function handleCloseNextPlayerModal(): void {
		isNextPlayerModalVisible = false;
	}

	function handleFinalScore(event: CustomEvent): void {
		const playerIndex = players.findIndex((player) => player.name === event.detail.player);
		const finalScore = event.detail.finalScore as number;
		players[playerIndex].score = finalScore;
		alert(`${event.detail.player} scored ${finalScore} points!`);
	}

	$: {
		if (selectedPlayers > 0 && playerNames.length < selectedPlayers) {
			playerNames.push('');
			isFormValid = false;
		} else if (playerNames.length > selectedPlayers) {
			playerNames.pop();
		}
		isFormValid = playerNames.every((name) => name.trim() !== '');
		// console.log(isFormValid);
		// console.log(playerNames);
	}
</script>

{#if !arePlayersVisible}
	<div class="hero">
		<div class="hero-content text-center">
			<div class="max-w-md">
				<h1 class="text-5xl font-bold">Hello there</h1>
				<p class="py-6">
					This is a simple dice game (yahtzee). You can play with up to 6 players. Each player will
					have a scorecard to keep track of their scores.
				</p>
				<button class="btn btn-primary rounded-full" on:click={openModal}>New game!</button>
			</div>
		</div>
	</div>
	<Modal bind:showModal on:close={handleModalClose}>
		<h2 class="font-bold text-lg" slot="header">Choose player</h2>
		<div>
			<p>How many players do you have?</p>
			<form on:submit|preventDefault={handleSubmit}>
				<div class="pb-2">
					<select class="select select-primary select-sm" bind:value={selectedPlayers}>
						{#each numberOfPlayers as player}
							<option value={player}>{player}</option>
						{/each}
					</select>
				</div>
				{#if selectedPlayers > 0}
					<!-- <p>You have selected {selectedPlayers} players</p> -->
					{#each Array(selectedPlayers) as _, i}
						<div class="py-1">
							<label for="player{i}">Player {i + 1}</label>
							<input
								bind:value={playerNames[i]}
								type="text"
								placeholder="Player name"
								class="input input-bordered w-full max-w-md"
							/>
						</div>
					{/each}
					<div class="py-4">
						<button class="btn" disabled={!isFormValid} type="submit">Start game!</button>
					</div>
				{/if}
			</form>
		</div>
	</Modal>
{:else}
	<h2 class="text-xl font-bold text-center">Players</h2>
	<div class="flex flex-wrap justify-evenly py-2">
		{#each players as player}
			<div class="card bg-primary text-primary-content shadow-xl py-2 px-6">
				<p>{player.name}</p>
				<p>{player.score} {player.score > 0 ? 'points' : ''}</p>
			</div>
		{/each}
	</div>
	<div class="mt-2 text-center">
		<h2 class="text-xl font-bold">Current player</h2>
		<h3 class="text-3xl font-bold">{currentPlayer.name}</h3>
	</div>

	<!-- This is a daisyUI custom divider component -->
	<div class="divider"></div>

	<Dice on:nextPlayer={nextPlayer} />
	<Modal showModal={isNextPlayerModalVisible} on:close={handleCloseNextPlayerModal}>
		<h3 class="font-bold" slot="header">Next Player!</h3>
		<p>It's {currentPlayer.name}'s turn.</p>
	</Modal>
	<!-- {#if isNextPlayerAlertVisible}
		<Alert on:close={closeNextPlayerAlert}>
			<svg slot="svg-content" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				></path>
			</svg>
			<h3 slot="header">Next Player</h3>
			<p>It's {currentPlayer.name} turn.</p>
		</Alert>
	{/if} -->

	<div class="divider"></div>
	<div>
		{#each players as player}
			{#if player === currentPlayer}
				<div>
					<Scorecard bind:playerName={player.name} on:finalScore={handleFinalScore} />
				</div>
			{/if}
		{/each}
	</div>
{/if}
