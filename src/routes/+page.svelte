<script lang="ts">
	import { onMount } from 'svelte';
	import Modal from '$lib/components/modal.svelte';
	import Dice from '$lib/components/dice.svelte';
	import Scorecard from '$lib/components/scorecard/scorecard.svelte';
	import type { Player } from '$lib/types/player';
	import type { Scoreboard } from '$lib/types/scoreboard';
	import { calculateScore, isFirstHalfOver63 } from '$lib/common/helper';
	import { currentPlayerStore, playersStore, isGameStartedStore } from '$lib/stores/mainPageState';

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
	let winner: Player;
	let playerNames: string[] = [];
	let arePlayersVisible: boolean;
	let isFormValid = false;
	let isNextPlayerModalVisible: boolean;
	let isReadyForDecidingWinner: boolean = false;
	let isWinnerModulVisible: boolean;

	onMount(() => {
		resetModalValues();
		showModal = false;
		arePlayersVisible = $isGameStartedStore || false;
		players = $playersStore || [];
		currentPlayer = $currentPlayerStore || { name: '', finalScore: 0, scoreboard: initialScoreboard };
		isNextPlayerModalVisible = false;
		isWinnerModulVisible = false;
		console.log('The main page has loaded');
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
		playersStore.set(players);
		currentPlayerStore.set(currentPlayer);
		arePlayersVisible = true;
		isGameStartedStore.set(true);
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
		currentPlayerStore.set(currentPlayer);
		isNextPlayerModalVisible = true;
	}

	function handleCloseNextPlayerModal(): void {
		isNextPlayerModalVisible = false;
	}

	function handleUpdatePlayerScore(event: CustomEvent): void {
		const playerIndex = players.findIndex((player) => player.name === event.detail.player.name);

		players = [
			...players.slice(0, playerIndex),
			event.detail.player,
			...players.slice(playerIndex + 1)
		];
	}

	function decideWinner() {
		let finalScore = 0;

		players.forEach((player) => {
			finalScore = calculateScore(player.scoreboard);

			if (isFirstHalfOver63(player.scoreboard)) {
				finalScore += 35;
			}
		});

		// find out which player has the highest score
		winner = players.reduce((acc, player) => {
			if (player.finalScore > acc.finalScore) {
				acc = player;
			}
			return acc;
		}, players[0]);

		isWinnerModulVisible = true;
	}

	$: {
		if (selectedPlayers > 0 && playerNames.length < selectedPlayers) {
			playerNames.push('');
			isFormValid = false;
		} else if (playerNames.length > selectedPlayers) {
			playerNames.pop();
		}
		isFormValid = playerNames.every((name) => name.trim() !== '');
	}

	$: {
		isReadyForDecidingWinner = players && players.every(p => p.scoreboard.scores.every(s => s.value !== ''));
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

	<div class="divider"></div>
	<div>
		{#each players as player}
			{#if player === currentPlayer}
				<div>
					<Scorecard 
						bind:player={currentPlayer} 
						on:scoreboardChange={handleUpdatePlayerScore} 
					/>
				</div>
			{/if}
		{/each}
	</div>
	<div class="py-2 text-center">
		<button class="btn btn-primary" disabled={!isReadyForDecidingWinner} on:click={decideWinner}
			>Who is the winner?</button
		>
	</div>

	<Modal showModal={isWinnerModulVisible} on:close={() => isWinnerModulVisible = false}>
		<h3 class="font-bold" slot="header">Winner!</h3>
		<p>The winner is {winner && winner.name}!</p>
	</Modal>
{/if}
