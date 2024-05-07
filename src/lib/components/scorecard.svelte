<script lang="ts">
	import { stringify } from 'postcss';
	import { createEventDispatcher } from 'svelte';
	import { parse } from 'svelte/compiler';

	const dispatch = createEventDispatcher();

    interface CardFieldText {
        text: string;
        score: string;
    }

	export let player: string = '';
	let arePropsValid: boolean = false;

	let properties: { [key: string]: CardFieldText } = {
		ones: { text: "score of ones", score: "" },
		twos: { text: "score of twos", score: "" },
		threes: { text: "score of threes", score: "" },
		fours: { text: "score of fours", score: "" },
		fives: { text: "score of fives", score: "" },
		sixs: { text: "score of sixs", score: "" },
		threeOfAKind: { text: "three of a kind", score: "" },
		fourOfAKind: { text: "four of a kind", score: "" },
		fullHouse: { text: "full house", score: "" },
		smallStraight: { text: "small straight", score: "" },
		largeStraight: { text: "large straight", score: "" },
		yahtzee: { text: "yahtzee", score: "" },
		chance: { text: "chance", score: "" }
	};

	function calculateFinalScore() {
		let finalScore = 0;

		if (
			Object.values(properties)
				.slice(0, 6)
				.reduce((acc, value) => acc + parseInt(value.score), 0) >= 63
		) {
			finalScore += 35;
		}

		for (const property in properties) {
			if (
				properties[property].score !== '' &&
				properties[property].score !== '0' &&
				properties[property] !== undefined &&
				properties[property] !== null
			) {
				finalScore += parseInt(properties[property].score);
			}
		}

		console.log('final score: ', finalScore);
		dispatch('finalScore', { finalScore: finalScore, player: player });
	}

	$: {
		arePropsValid = Object.values(properties).every((value) => value.score !== '');
	}
</script>

<!-- <h1>{player}</h1> -->

<div class="flex flex-wrap">
	{#each Object.values(properties) as property}
		<button class="btn btn-primary">
            {#if property.score === ""}
                {property.text}
            {:else}
                {property.score}
            {/if}
        </button>
	{/each}
</div>

<div class="py-2 text-center">
	<button class="btn btn-primary" disabled={!arePropsValid} on:click={calculateFinalScore}
		>Calculate final score</button
	>
</div>
