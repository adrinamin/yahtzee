<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let player : string = '';

    let ones : number = 0;
    let twos : number = 0;
    let threes : number = 0;
    let fours : number = 0;
    let fives : number = 0;
    let sixs : number = 0;
    let threeOfAKind : number = 0;
    let fourOfAKind : number = 0;
    let fullHouse : number = 0;
    let smallStraight : number = 0;
    let largeStraight : number = 0;
    let yahtzee : number = 0;
    let chance : number = 0;

    function calculateFinalScore() {
        let finalScore = ones + twos + threes + fours + fives + sixs + threeOfAKind + fourOfAKind + fullHouse + smallStraight + largeStraight + yahtzee + chance;
        dispatch('finalScore', { finalScore: finalScore, player: player});
    }

</script>

<h1>{player}</h1>

<label>
    score of ones:
    <input type="text" bind:value={ones} />
</label>
<br />
<label>
    score of twos:
    <input type="text" bind:value={twos}/>
</label>
<br />
<label>
    score of threes:
    <input type="text" bind:value={threes} />
</label>
<br />
<label>
    score of fours:
    <input type="text" bind:value={fours}/>
</label>
<br />
<label>
    score of fives:
    <input type="text" bind:value={fives}/>
</label>
<br />
<label>
    score of sixs:
    <input type="text" bind:value={sixs}/>
</label>
<br />
<label>
    three of a kind:
    <input type="text" bind:value={threeOfAKind}/>
</label>
<br />
<label>
    four of a kind:
    <input type="text" bind:value={fourOfAKind}/>
</label>
<br />
<label>
    full house:
    <input type="text" bind:value={fullHouse}/>
</label>
<br />
<label>
    small straight:
    <input type="text" bind:value={smallStraight}/>
</label>
<br />
<label>
    large straight:
    <input type="text" bind:value={largeStraight}/>
</label>
<br />
<label>
    yahtzee:
    <input type="text" bind:value={yahtzee}/>
</label>
<br />
<label>
    chance:
    <input type="text" bind:value={chance}/>
</label>
<br />
<button on:click={calculateFinalScore}>Calculate final score</button>