<!-- src/lib/components/Dice.svelte -->
<script lang="ts">
    export let value = 1; // Dice value, default to 1
    export let size = 'medium'; // Dice size, can be 'small', 'medium', or 'large'
  
    // Map dice values to their corresponding SVG paths
    const dicePaths = [
      'M 0.5 0.5 L 0.5 4.5 L 4.5 4.5 L 4.5 0.5 Z M 1 1 L 1 2 L 2 2 L 2 1 Z M 3 3 L 3 4 L 4 4 L 4 3 Z',
      'M 0.5 0.5 L 0.5 4.5 L 4.5 4.5 L 4.5 0.5 Z M 1 1 L 1 2 L 2 2 L 2 1 Z M 3 3 L 3 4 L 4 4 L 4 3 Z M 1 3 L 1 4 L 2 4 L 2 3 Z',
      'M 0.5 0.5 L 0.5 4.5 L 4.5 4.5 L 4.5 0.5 Z M 1 1 L 1 2 L 2 2 L 2 1 Z M 3 3 L 3 4 L 4 4 L 4 3 Z M 1 3 L 1 4 L 2 4 L 2 3 Z M 3 1 L 3 2 L 4 2 L 4 1 Z',
      'M 0.5 0.5 L 0.5 4.5 L 4.5 4.5 L 4.5 0.5 Z M 1 1 L 1 2 L 2 2 L 2 1 Z M 3 3 L 3 4 L 4 4 L 4 3 Z M 1 3 L 1 4 L 2 4 L 2 3 Z M 1 1 L 1 2 L 2 2 L 2 1 Z M 3 1 L 3 2 L 4 2 L 4 1 Z',
      'M 0.5 0.5 L 0.5 4.5 L 4.5 4.5 L 4.5 0.5 Z M 1 1 L 1 2 L 2 2 L 2 1 Z M 3 3 L 3 4 L 4 4 L 4 3 Z M 1 3 L 1 4 L 2 4 L 2 3 Z M 1 1 L 1 2 L 2 2 L 2 1 Z M 3 1 L 3 2 L 4 2 L 4 1 Z M 3 3 L 3 4 L 4 4 L 4 3 Z',
      'M 0.5 0.5 L 0.5 4.5 L 4.5 4.5 L 4.5 0.5 Z M 1 1 L 1 2 L 2 2 L 2 1 Z M 3 3 L 3 4 L 4 4 L 4 3 Z M 1 3 L 1 4 L 2 4 L 2 3 Z M 1 1 L 1 2 L 2 2 L 2 1 Z M 3 1 L 3 2 L 4 2 L 4 1 Z M 1 3 L 1 4 L 2 4 L 2 3 Z M 3 3 L 3 4 L 4 4 L 4 3 Z'
    ];
</script>

<div class="dice {size}">
<svg viewBox="0 0 5 5">
    <path d={dicePaths[value - 1]} />
</svg>
</div>

<style>
.dice {
    width: 50px;
    height: 50px;
    display: inline-block;
    position: relative;
}

.dice.small {
    width: 30px;
    height: 30px;
}

.dice.large {
    width: 70px;
    height: 70px;
}

.dice svg {
    width: 100%;
    height: 100%;
    fill: #333;
}
</style>
