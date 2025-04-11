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
		// TODO : replace token
		const token =
		  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ0ZW1wIiwiaWF0IjoxNzQ0MzYyOTM1LCJleHAiOjE3NDQzNjY1MzV9.7rCnJwIUsOKLjdCYVtZARmEhJqNi-l5nRobIw_vMuSI';
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
  
  <div class="flex w-full h-full flex-col items-center justify-center self-center bg-[url('/sample/templebg.webp')] bg-cover">
	<div
	  class="relative flex w-[90%] h-[90%] flex-col items-center justify-start rounded-[20px] bg-[url('/sample/bg.webp')] bg-cover overflow-hidden"
	>
	  <div class="flex flex-col w-full h-[25%] items-center justify-center mt-4">
		<h1 class="font-bold text-[#8D7878] text-5xl">เจดีย์สุดจ๊าบ</h1>
		<h3 class="font-semibold text-[#8D7878] text-2xl mt-2"> ของ นีร </h3>
	  </div>
	  {#if error}
		<p class="text-red-800">{error}</p>
	  {:else if sandcastle}
		<div class="flex w-full h-[40%] items-center justify-center">
		  <SandcastleItem {sandcastle} />
		</div>
	  {:else}
		<p>Loading sandcastle data...</p>
	  {/if}
	  <Decopanel {openD} {closeD} {handleClickOutside} />
	</div>
  </div>
  