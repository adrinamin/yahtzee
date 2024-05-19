<script lang="ts">
	import { onMount } from 'svelte';
	import Modal from '$lib/components/modal.svelte';
	import Dice from '$lib/components/dice.svelte';
	import Scorecard from '$lib/components/scorecard/scorecard.svelte';
	// import Alert from '$lib/components/alert.svelte';
	import type { Player } from '$lib/types/player';
	import type { Scoreboard } from '$lib/types/scoreboard';

	const numberOfPlayers: number[] = [1, 2, 3, 4, 5, 6];

	const initialScoreboard: Scoreboard = {
		scores: [
			{ id: 0, value: '' },
			{ id: 1, value: '' },
			{ id: 2, value: '' },
			{ id: 3, value: '' },
			{ id: 4, value: '' },
			{ id: 5, value: '' },
			{ id: 6, value: '' },
			{ id: 7, value: '' },
			{ id: 8, value: '' },
			{ id: 9, value: '' },
			{ id: 10, value: '' },
			{ id: 11, value: '' },
			{ id: 12, value: '' }
		]
	};

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
			finalScore: 0,
			scoreboard: JSON.parse(JSON.stringify(initialScoreboard)) as Scoreboard  // deep copy to avoid referencing the same object
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
		console.log('Current player: ', currentPlayer);
		// alert(`You scored ${event.detail.finalScore} points! It's ${currentPlayer.name}'s turn`);
		isNextPlayerModalVisible = true;
	}

	function handleCloseNextPlayerModal(): void {
		isNextPlayerModalVisible = false;
	}

	function handleUpdatePlayerScore(event: CustomEvent): void {
		const player = event.detail.player;
		console.log('Player: ', player);
		const playerIndex = players.findIndex((p) => p.name === player.name);
		if ( playerIndex === -1) {
			return;
		}

		players = [
			...players.slice(0, playerIndex),
			player,
			...players.slice(playerIndex + 1)
		];

		console.log('Players: ', players);


		// players[playerIndex] = player;
		// players = [...players, players.splice(playerIndex, 1)[0]];
	}

	function handleFinalScore(event: CustomEvent): void {
		const playerIndex = players.findIndex((player) => player.name === event.detail.player);
		const finalScore = event.detail.finalScore as number;
		players[playerIndex].finalScore = finalScore;
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
				<p>{player.finalScore} {player.finalScore > 0 ? 'points' : ''}</p>
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
					<Scorecard 
						bind:player={currentPlayer} 
						on:scoreboardChange={handleUpdatePlayerScore} 
						on:finalScore={handleFinalScore} 
					/>
				</div>
			{/if}
		{/each}
	</div>
{/if}
