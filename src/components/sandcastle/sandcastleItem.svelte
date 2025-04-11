<script>
	import { onMount } from 'svelte';
	import DecoItems from './decoItems.svelte'; // Import the DecoItems component

	export let id; // Accept the sandcastle ID as a prop

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
			// TODO : replace token
			const token =
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ0ZW1wIiwiaWF0IjoxNzQ0MzU3NzA5LCJleHAiOjE3NDQzNjEzMDl9.sVRrm6thlkrgVib8hrmgrGvAzi0eEHz-7y3aWPKXmiI';
			console.log(token);

			const response = await fetch(`/api/sandcastles/${id}`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}` // Replace with a valid token
				}
			});

			if (!response.ok) {
				const errorData = await response.json();
				error = errorData.error || 'Failed to fetch sandcastle data';
				return;
			}

			sandcastle = await response.json(); // Store the fetched data
		} catch (err) {
			error = 'An error occurred while fetching sandcastle data';
			console.error(err);
		}
	});
</script>

{#if error}
	<p class="text-red-800">{error}</p>
{:else if sandcastle}
	<div class="flex flex-col items-center justify-center">
		<h1 class="text-4xl font-bold text-yellow-700">{sandcastle.name}</h1>
		<p>ของ {sandcastle.ownername}</p>

		{#if sandcastle.decorations.length > 0}
			<ul>
				{#each sandcastle.decorations as decoration}
					<li>
						<DecoItems type={decoration.type} />
						<p>Wishing Text: {decoration.wishing_text}</p>
						<p>Sender: {decoration.sender_name}</p>
					</li>
				{/each}
			</ul>
		{:else}
			<p>No decorations yet.</p>
		{/if}
	</div>
{:else}
	<p>Loading sandcastle data...</p>
{/if}
