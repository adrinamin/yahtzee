<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    function closeAlert() {
        dispatch('close');
    }
</script>

<div role="alert" class="alert shadow-lg">
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		class="stroke-info shrink-0 w-6 h-6"
	>
		<slot name="svg-content" />
	</svg>
	<div>
        <slot name="header"/>
        <slot />
    </div>
    <button class="btn btn-sm btn-primary" on:click={close}>OK</button>
</div>
