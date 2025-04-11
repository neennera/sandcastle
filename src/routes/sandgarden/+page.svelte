<script lang="ts">
	import { onMount } from 'svelte';
	import flora from '$lib/images/sandcastle/flora.webp';
	import layer from '$lib/images/sandcastle/layer.webp';
	import lotus from '$lib/images/sandcastle/lotus.webp';
	import octagonal from '$lib/images/sandcastle/octagonal.webp';
	import { goto } from '$app/navigation';

	let sandcastles: { id: string; name: string; ownername: string; type: string }[] = [];
	let error: string | null = null;

	// Image mapping by type
	const sandcastleImages: Record<string, string> = {
		flora,
		layer,
		lotus,
		octagonal
	};

	onMount(async () => {
		try {
			// Fetch the random sandcastles
			const res = await fetch('/api/sandcastles/random');
			if (!res.ok) {
				const data = await res.json();
				error = data.error || 'Failed to fetch sandcastles.';
				return;
			}
			// Assign the response data to the sandcastles array
			sandcastles = await res.json();
		} catch (err) {
			error = 'Error loading sandcastles.';
			console.error(err);
		}
	});
</script>

<div class="flex min-h-screen w-full flex-col items-center justify-start pt-20">
	<h1 class="mb-6 text-5xl text-[#8d7878] font-bold">ลานวัด</h1>

	{#if error}
		<p class="text-red-500 text-center">{error}</p>
	{:else if sandcastles.length === 0}
		<p class="text-center text-gray-600">Loading sandcastles...</p>
	{:else}
		<div class="grid grid-cols-2 md:grid-cols-3 mt-30 gap-2 px-4 max-w-5xl w-full h-[50%] z-30">
	
	{#each sandcastles as sandcastle}
		<div
			class="flex flex-col items-center justify-end px-4 py-0 rounded-xl w-full"
			role="button"
			tabindex="0"
			on:click={() => goto(`/sandcastle/`)}
			on:keydown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					goto(`/sandcastle/`);
				}
			}}
		>
		<div class="bg-[#fdfde6] rounded-2xl p-2 w-full">
			<p class="text-sm font-semibold text-[#473d3d]">{sandcastle.name}</p>
			<p class="text-xs text-[#8d7878]">โดย {sandcastle.ownername}</p>
		</div>
		<img
			src={sandcastleImages[sandcastle.type] || flora}
			alt={sandcastle.name}
			class="mb-0 w-32 h-32 rounded-lg object-cover"
		/>
		</div>
	{/each}

		</div>
	{/if}
</div>
