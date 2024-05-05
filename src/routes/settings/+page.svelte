<script>
	// import { goto } from '$app/navigation';
	const pageName = 'Settings';
</script>

<h1 class="font-bold text-4xl">{pageName}</h1>
<div class="flex flex-col pt-5">
	<div class="form-control w-52">
		<label class="cursor-pointer label">
			<span class="label-text">Remember me</span>
			<input type="checkbox" class="toggle toggle-primary" checked />
		</label>
	</div>
	<div class="form-control w-52">
		<label class="cursor-pointer label">
			<span class="label-text">Remember me</span>
			<input type="checkbox" class="toggle toggle-secondary" checked />
		</label>
	</div>
	<div class="form-control w-52">
		<label class="cursor-pointer label">
			<span class="label-text">Remember me</span>
			<input type="checkbox" class="toggle toggle-accent" checked />
		</label>
	</div>
</div>
