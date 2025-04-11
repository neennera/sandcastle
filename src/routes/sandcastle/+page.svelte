<script lang="ts">
	import SandcastleItem from '../../components/sandcastle/sandcastleItem.svelte';
	import Decopanel from '$lib/components/Decopanel.svelte';
	import { onMount } from 'svelte';
  
	export let id = 123456; // Accept the sandcastle ID as a prop
  
	/**
	 * @type {{ name: any; ownername: any; type: any; decorations: string | any[]; } | null}
	 */
	let sandcastle: { name: string; ownername: string; type: string; decorations: string[] } | null = null; // To store the fetched sandcastle data
	/**
	 * @type {string | null}
	 */
	let error: string | null = null; // To store any error messages
  
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
			} 
			sandcastle = await response.json(); // Store the fetched data
		} catch (err) {
			error = 'An error occurred while fetching sandcastle data';
			console.error(err);
		}
  
	function openD(selector: string) {
	  const deco: HTMLElement = document.querySelector(selector) as HTMLElement;
	  const blur: HTMLElement = document.querySelector('#blur') as HTMLElement;
	  if (deco && blur) {
		deco.style.height = '40%';
		blur.style.opacity = '0.5';
		blur.style.zIndex = '10';
	  }
	}
  
	function closeD(selector: string) {
	  const deco: HTMLElement = document.querySelector(selector) as HTMLElement;
	  const blur: HTMLElement = document.querySelector('#blur') as HTMLElement;
	  if (deco && blur) {
		deco.style.height = '10%';
		blur.style.opacity = '0';
		blur.style.zIndex = '0';
	  }
	}
  
	function handleClickOutside(event: MouseEvent) {
	  const deco = document.getElementById('deco');
	  if (deco && !deco.contains(event.target as Node)) {
		closeD('#deco');
	  }
	}
</script>

<div
	class="flex h-full w-full flex-col items-center justify-center self-center bg-[url('/sample/templebg.webp')] bg-cover"
>
	<div
		class="relative flex h-[90%] w-[90%] flex-col items-center justify-start overflow-hidden rounded-[20px] bg-[url('/sample/bg.webp')] bg-cover"
	>
		<div class="mt-4 flex h-[25%] w-full flex-col items-center justify-center">
			<h1 class="text-5xl font-bold text-[#8D7878]">เจดีย์สุดจ๊าบ</h1>
			<h3 class="mt-2 text-2xl font-semibold text-[#8D7878]">ของ นีร</h3>
		</div>
		{#if error}
			<p class="text-red-800">{error}</p>
		{:else if sandcastle}
			<div class="flex h-[40%] w-full items-center justify-center">
				<SandcastleItem {sandcastle} />
			</div>
		{:else}
			<p>Loading sandcastle data...</p>
		{/if}
		<Decopanel {openD} {closeD} {handleClickOutside} />
	</div>
</div>
