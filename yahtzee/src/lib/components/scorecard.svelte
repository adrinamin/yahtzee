<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let player : string = '';
    let arePropsValid: boolean = false;

    let properties: {[key: string]: number} = {
        ones: 0,
        twos: 0,
        threes: 0,
        fours: 0,
        fives: 0,
        sixs: 0,
        threeOfAKind: 0,
        fourOfAKind: 0,
        fullHouse: 0,
        smallStraight: 0,
        largeStraight: 0,
        yahtzee: 0,
        chance: 0
    }

    function calculateFinalScore() {
        let finalScore = 0;
        for (const property in properties) {
            if (properties[property] !== 0 
                && properties[property] !== undefined 
                && properties[property] !== null) {
                // Convert the property value to a number before adding it to the final score.
                // The issue you're encountering is likely due to TypeScript treating the property values as strings instead of numbers.
                // The unary plus operator (+) will convert the string to a number.
                // parseInt() is another option, but then I have to convert the property value to a string first.
                finalScore += +properties[property];
            }

        }

        if (Object.values(properties).slice(0, 6).reduce((acc, value) => acc + value, 0) >= 63) {
            finalScore += 35;
        }

        console.log('final score: ', finalScore);
        dispatch('finalScore', { finalScore: finalScore, player: player});
    }

    $: {
        arePropsValid = Object.values(properties).every((value) => value > 0);
    }

</script>

<h1>{player}</h1>

<label>
    score of ones:
    <input type="text" bind:value={properties.ones} />
</label>
<br />
<label>
    score of twos:
    <input type="text" bind:value={properties.twos}/>
</label>
<br />
<label>
    score of threes:
    <input type="text" bind:value={properties.threes} />
</label>
<br />
<label>
    score of fours:
    <input type="text" bind:value={properties.fours}/>
</label>
<br />
<label>
    score of fives:
    <input type="text" bind:value={properties.fives}/>
</label>
<br />
<label>
    score of sixs:
    <input type="text" bind:value={properties.sixs}/>
</label>
<br />
<label>
    three of a kind:
    <input type="text" bind:value={properties.threeOfAKind}/>
</label>
<br />
<label>
    four of a kind:
    <input type="text" bind:value={properties.fourOfAKind}/>
</label>
<br />
<label>
    full house:
    <input type="text" bind:value={properties.fullHouse}/>
</label>
<br />
<label>
    small straight:
    <input type="text" bind:value={properties.smallStraight}/>
</label>
<br />
<label>
    large straight:
    <input type="text" bind:value={properties.largeStraight}/>
</label>
<br />
<label>
    yahtzee:
    <input type="text" bind:value={properties.yahtzee}/>
</label>
<br />
<label>
    chance:
    <input type="text" bind:value={properties.chance}/>
</label>
<br />
<button disabled={!arePropsValid} on:click={calculateFinalScore}>Calculate final score</button>