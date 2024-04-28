<!-- src/lib/components/Dice.svelte -->
<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    let rollCounts : number = 0;
    const buttonName = 'Click me';
    let dice1 = 0;
    let dice2 = 0;
    let dice3 = 0;
    let dice4 = 0;
    let dice5 = 0;

    const dispatch = createEventDispatcher();

    function rollDice() {
        dice1 = Math.floor(Math.random() * 6) + 1;
        dice2 = Math.floor(Math.random() * 6) + 1;
        dice3 = Math.floor(Math.random() * 6) + 1;
        dice4 = Math.floor(Math.random() * 6) + 1;
        dice5 = Math.floor(Math.random() * 6) + 1;
        rollCounts++;

        if (rollCounts === 3) {
            dispatch('nextPlayer');
            rollCounts = 0;
        }
    }
</script>

<button on:click={rollDice}>{buttonName}</button>
<p>Dice 1: {dice1}</p>
<p>Dice 2: {dice2}</p>
<p>Dice 3: {dice3}</p>
<p>Dice 4: {dice4}</p>
<p>Dice 5: {dice5}</p>

