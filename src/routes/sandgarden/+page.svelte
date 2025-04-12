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

	const sandcastlePositionLeft = [15,65,30,60,8,38];
	const sandcastlePositionTop = [25,33,43,50,55,70];

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

<div class="flex min-h-screen w-full flex-col items-center justify-start pt-20 overflow-hidden">
	<h1 class="mb-6 text-4xl xs:text-5xl text-[#8d7878] font-bold">ลานวัด</h1>

	{#if error}
		<p class="text-red-500 text-center">{error}</p>
	{:else if sandcastles.length === 0}
		<p class="text-center text-gray-600">Loading sandcastles...</p>
	{:else}
	<div class="flex w-full h-full">
		{#each sandcastles as sandcastle, index}
		<div
			class="absolute w-[30%]"
			style="left: {sandcastlePositionLeft[index % 6]}%; top: {sandcastlePositionTop[index % 6]}%"
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
			<div class="bg-[#fdfde6]/50 rounded-2xl px-2 w-full py-3 flex flex-col items-center justify-center">
				<p class="text-sm font-semibold text-[#473d3d]">{sandcastle.name}</p>
				<p class="text-xs text-[#8d7878]">โดย {sandcastle.ownername}</p>
			</div>
			<img
				src={sandcastleImages[sandcastle.type] || flora}
				alt={sandcastle.name}
				class="mb-0 w-[80%] rounded-lg object-cover"
			/>
		</div>
	{/each}

		</div>
	{/if}
</div>
