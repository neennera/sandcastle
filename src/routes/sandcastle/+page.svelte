<script>
	import SandcastleItem from '../../components/sandcastle/sandcastleItem.svelte';
	import { onMount } from 'svelte';

	export let id = 123456; // Accept the sandcastle ID as a prop

	/**
	 * @type {{ name: any; ownername: any; type: any; decorations: string | any[]; } | null}
	 */
	let sandcastle = null; // To store the fetched sandcastle data
	/**
	 * @type {string | null}
	 */
	let error = null; // To store any error messages

	// Fetch sandcastle data from the API
	onMount(async () => {
		try {
			const response = await fetch(`/api/sandcastles/${id}`, {
				method: 'GET',
				credentials: 'include'
			});

			if (!response.ok) {
				const errorData = await response.json();
				error = errorData.error || 'Failed to fetch sandcastle data';
				return;
			} else {
				console.log('success fully get cookie with tojen');
				console.log(document.cookie);
			}
			sandcastle = await response.json(); // Store the fetched data
		} catch (err) {
			error = 'An error occurred while fetching sandcastle data';
			console.error(err);
		}
	});
</script>

<div class="flex min-h-screen w-full flex-col items-center justify-center self-center">
	{#if error}
		<p class="text-red-800">{error}</p>
	{:else if sandcastle}
		<div class="flex flex-col items-center justify-center">
			<h1 class="text-4xl font-bold text-yellow-700">{sandcastle.name}</h1>
			<p>ของ {sandcastle.ownername}</p>

			<SandcastleItem {sandcastle} />
		</div>
	{:else}
		<p>Loading sandcastle data...</p>
	{/if}
</div>
