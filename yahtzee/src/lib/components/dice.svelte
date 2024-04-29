<!-- src/lib/components/Dice.svelte -->
<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    export let finalScore : number = 0;
    let rollCounts : number = 0;
    const buttonName = 'roll the dice';
    let dice1 = 0;
    let dice2 = 0;
    let dice3 = 0;
    let dice4 = 0;
    let dice5 = 0;

    let dice1Locked = false;
    let dice2Locked = false;
    let dice3Locked = false;
    let dice4Locked = false;
    let dice5Locked = false;

    const dispatch = createEventDispatcher();

    function rollDice() {
        if (rollCounts > 2) { // 3 rolls allowed, the forth one changes the player
            finalScore = dice1 + dice2 + dice3 + dice4 + dice5;
            rollCounts = 0;
            dice1 = 0;
            dice2 = 0;
            dice3 = 0;
            dice4 = 0;
            dice5 = 0;
            dice1Locked = false;
            dice2Locked = false;
            dice3Locked = false;
            dice4Locked = false;
            dice5Locked = false;
            dispatch('nextPlayer', { finalScore: finalScore });
            return;
        }
        
        if (!dice1Locked) {
            dice1 = Math.floor(Math.random() * 6) + 1;
        }
        if (!dice2Locked) {
            dice2 = Math.floor(Math.random() * 6) + 1;
        }
        if (!dice3Locked) {
            dice3 = Math.floor(Math.random() * 6) + 1;
        }
        if (!dice4Locked) {
            dice4 = Math.floor(Math.random() * 6) + 1;
        }
        if (!dice5Locked) {
            dice5 = Math.floor(Math.random() * 6) + 1;
        }
        rollCounts++;

    }
</script>

<button on:click={rollDice}>{rollCounts === 3 ? 'Next player' : buttonName}</button>
<br>
<label>
    Dice 1: {dice1}
    <input type="checkbox" bind:checked={dice1Locked} />
    {dice1Locked ? 'Locked' : 'Unlocked'}
</label>
<br>
<label>
    Dice 2: {dice2}
    <input type="checkbox" bind:checked={dice2Locked} />
    {dice2Locked ? 'Locked' : 'Unlocked'}
</label>
<br>
<label>
    Dice 3: {dice3}
    <input type="checkbox" bind:checked={dice3Locked} />
    {dice3Locked ? 'Locked' : 'Unlocked'}
</label>
<br>
<label>
    Dice 4: {dice4}
    <input type="checkbox" bind:checked={dice4Locked} />
    {dice4Locked ? 'Locked' : 'Unlocked'}
</label>
<br>
<label>
    Dice 5: {dice5}
    <input type="checkbox" bind:checked={dice5Locked} />
    {dice5Locked ? 'Locked' : 'Unlocked'}
</label>
