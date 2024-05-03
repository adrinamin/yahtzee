<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	export let showModal: boolean; // boolean
	let dialog: HTMLDialogElement; // HTMLDialogElement

	$: {
		if (showModal) {
			dialog.showModal();
			// console.log('show modal: ', showModal);
			// console.log('dialog open: ', dialog.open);
		}
		else if (!showModal && dialog) { // also checks if dialog is undefined. This is necessary because dialog is undefined when the component is first rendered
			dialog.close();
			// console.log('show modal: ', showModal);
			// console.log('dialog open: ', dialog.open);
		}
	}

	function close() {
		dispatch('close');
		dialog.close();
		showModal = false;
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={close}
	on:click|self={close}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<slot name="header" />
		<!-- <hr /> -->
		<slot />
		<!-- <hr /> -->
		<!-- svelte-ignore a11y-autofocus -->
		<button autofocus on:click={close}>Cancel</button>
	</div>
</dialog>
