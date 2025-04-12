<script lang="ts">
	import { onMount } from 'svelte';
	import flora from '$lib/images/sandcastle/flora.webp';
	import layer from '$lib/images/sandcastle/layer.webp';
	import lotus from '$lib/images/sandcastle/lotus.webp';
	import octagonal from '$lib/images/sandcastle/octagonal.webp';
	import Loading from '$lib/components/loading.svelte';
	import { goto } from '$app/navigation';

	import { initGA } from '../../analytics';
	onMount(() => {
		initGA();
	});

	let sandcastles: { id: string; name: string; ownername: string; type: string }[] = [];
	let error: string | null = null;

	// Image mapping by type
	const sandcastleImages: Record<string, string> = {
		flora,
		layer,
		lotus,
		octagonal
	};

	const sandcastlePositionLeft = [15, 65, 30, 60, 8, 38];
	const sandcastlePositionTop = [25, 33, 43, 50, 55, 70];

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

<div class="flex min-h-screen w-full flex-col items-center justify-start overflow-hidden pt-20">
	<h1 class="xs:text-5xl mb-6 text-4xl font-bold text-[#8d7878]">ลานวัด</h1>

	{#if error}
		<p class="text-center text-red-500">{error}</p>
	{:else if sandcastles.length === 0}
		<Loading />
	{:else}
		<div class="flex h-full w-full">
			{#each sandcastles as sandcastle, index}
				<div
					class="absolute w-[30%]"
					style="left: {sandcastlePositionLeft[index % 6]}%; top: {sandcastlePositionTop[
						index % 6
					]}%"
					role="button"
					tabindex="0"
					on:click={() => goto(`/sandcastle/${sandcastle.id}`)}
					on:keydown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') {
							e.preventDefault();
							goto(`/sandcastle/${sandcastle.id}`);
						}
					}}
				>
					<div
						class="flex w-full flex-col items-center justify-center rounded-2xl bg-[#fdfde6]/70 px-2 py-3"
					>
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
	<button
		class="btn-secondary absolute top-[90%] bg-sky-100 bg-[url('/sample/btnbg.png')]"
		on:click={async () => {
			try {
				// Fetch new random sandcastles
				const res = await fetch('/api/sandcastles/random');
				if (!res.ok) {
					const data = await res.json();
					error = data.error || 'Failed to fetch new sandcastles.';
					return;
				}
				// Update the sandcastles array with new data
				sandcastles = await res.json();
			} catch (err) {
				error = 'Error loading new sandcastles.';
				console.error(err);
			}
		}}
	>
		สำรวจต่อ... 🔍
	</button>
</div>
