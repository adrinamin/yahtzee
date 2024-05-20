<script>
	// import { goto } from '$app/navigation';
	import { onMount } from "svelte";
	import { themeChange } from "theme-change";

	const pageName = 'Settings';

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
				<option value="aqua">default</option>
				<option value="dark">dark</option>
				<option value="light">light</option>
				<option value="synthwave">synthwave</option>
				<option value="retro">retro</option>
			</select>
		</label>
	</div>
</div>
