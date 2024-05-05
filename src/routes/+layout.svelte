<script lang="ts">
	import '../app.css';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
</script>

<div class="container mx-auto px-4 py-4">

    {#if $page.url.pathname === '/'}
        <div class="text-right">
            <button class="btn btn-ghost" on:click={() => goto("/settings")}>
                <i class="fa-solid fa-gear"></i>
            </button>
        </div>
    {:else}
        <div class="text-left">
            <button class="btn btn-ghost" on:click={() => goto("/")}>
                <i class="fa-solid fa-arrow-left"></i>
            </button>
        </div>
    {/if}
	<slot />
</div>

<style lang="postcss">
</style>
