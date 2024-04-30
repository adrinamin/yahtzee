<script lang="ts">
	import { onMount } from 'svelte';
	import Modal from '$lib/components/modal.svelte';
	import Dice from '$lib/components/dice.svelte';
	import Scorecard from '$lib/components/scorecard.svelte';
	import type { Player } from './+page';

	const pageName: string = 'Home';
	let showModal: boolean = false;

	const numberOfPlayers: number[] = [1, 2, 3, 4, 5, 6];
	let selectedPlayers: number;

	let players: Player[];
	let currentPlayer: Player;
	let playerNames: string[];
	let ArePlayersVisible: boolean = false;

	onMount(() => {
		console.log('The page has loaded');
		resetModalValues();
	});

	function resetModalValues(): void {
		playerNames = ['', '', '', '', '', ''];
		selectedPlayers = 0;
	}

	function openModal(): void {
		console.log('Opening modal');
		showModal = true;
	}

	function handleUserSelection(): void {
		console.log('$selectedPlayers players selected');
		players = Array.from({ length: selectedPlayers }, (_, i) => ({
			name: playerNames[i],
			score: 0
		}));
		console.log(players);
		resetModalValues();
		currentPlayer = players[0];
		ArePlayersVisible = true;
	}

	function nextPlayer(event: CustomEvent): void {
		const currentPlayerIndex = players.indexOf(currentPlayer);
		currentPlayer = players[currentPlayerIndex + 1] || players[0];
		alert(`You scored ${event.detail.finalScore} points! It's ${currentPlayer.name}'s turn`);
	}

	function handleFinalScore(event: CustomEvent): void {
		const playerIndex = players.findIndex(player => player.name === event.detail.player);
		players[playerIndex].score += event.detail.finalScore;
		alert(`${event.detail.player} scored ${event.detail.finalScore} points!`);
	}

</script>

<h1>{pageName}</h1>

<button on:click={openModal}>Let's go</button>

<Modal bind:showModal on:close={resetModalValues}>
	<h2 slot="header">Welcome to the modal</h2>
	<p>How many players do you have?</p>
	<form on:submit|preventDefault={handleUserSelection}>
		<select bind:value={selectedPlayers}>
			{#each numberOfPlayers as player}
				<option value={player}>{player}</option>
			{/each}
		</select>
		{#if selectedPlayers > 0}
			<p>You have selected {selectedPlayers} players</p>
			{#each Array(selectedPlayers) as _, i}
				<div>
					<label for="player{i}">Player {i + 1}</label>
					<input bind:value={playerNames[i]} type="text" placeholder="Player name" />
				</div>
			{/each}
		{/if}
		<button disabled={selectedPlayers === 0} type="submit">Start</button>
	</form>
</Modal>

{#if ArePlayersVisible}
	<h2>Players</h2>
	<ul>
		{#each players as player}
			<li>{player.name} - {player.score}</li>
		{/each}
	</ul>
	<h2>Current player</h2>
	<p>{currentPlayer.name}</p>
	<hr />
	<Dice on:nextPlayer={nextPlayer} />

	<hr />

	<div class="scorecard">
		{#each players as player}
			<div>
				<Scorecard bind:player={player.name} on:finalScore={handleFinalScore} />
			</div>
		{/each}
	</div>
{/if}

<style>
	.scorecard {
		display: flex;
		flex-flow: row wrap;
        justify-content: space-around;
	}
</style>
