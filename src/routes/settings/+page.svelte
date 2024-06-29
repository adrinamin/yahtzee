<script>
	// import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';

	const pageName = 'Settings';
	const themes = ['aqua', 'dark', 'light', 'synthwave', 'retro'];

	onMount(() => {
		themeChange(false); // false parameter is required for svelte
	});
</script>

<h1 class="font-bold text-4xl">{pageName}</h1>
<div class="flex flex-col pt-5">
	<div>
		<label class="form-control">
			<div class="label">
				<span class="label-text">Choose theme</span>
			</div>
			<select class="select select-primary" data-choose-theme>
				{#each themes as theme}
					<option value={theme}>{theme}</option>
				{/each}
			</select>
		</label>
	</div>
</div>
