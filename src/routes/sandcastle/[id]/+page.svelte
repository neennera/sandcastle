<script lang="ts">
	import { page } from '$app/stores'; // Import the page store
	import { goto } from '$app/navigation'; // Import SvelteKit's navigation helper
	import Loading from '../../../components/loading.svelte';

	import SandcastleItem from '../../../components/sandcastle/sandcastleItem.svelte';
	import Decopanel from '$lib/components/Decopanel.svelte';
	import { onMount, tick } from 'svelte';
	import html2canvas from 'html2canvas';
	import QRCode from 'qrcode';

	import { initGA } from '../../../analytics';
	onMount(() => {
		initGA();
	});

	let id: string = $page.params.id; // ID from the URL
	let sandcastle: { name: string; ownername: string; type: string; decorations: string[] } | null =
		null; // To store the fetched sandcastle data
	let error: string | null = null; // To store any error messages
	let qrCodeUrl: string | null = null; // To store the generated QR code URL
	let isSharing = false; // To track if the share mode is active

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
				if (error === 'Sandcastle not found') {
					goto('/errorhandle'); // Use SvelteKit's `goto` for better navigation
				}
				return;
			}
			sandcastle = await response.json(); // Store the fetched data

			// Generate QR code for the page URL
			const pageUrl = `${window.location.origin}/sandcastle/${id}`;
			qrCodeUrl = await QRCode.toDataURL(pageUrl);
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

	// Function to take a screenshot
	async function takeScreenshot() {
		isSharing = true; // Enable share mode

		// Wait for the DOM to update
		await tick();

		// Take a screenshot of the page
		const element = document.querySelector('#screenshot-area') as HTMLElement;
		if (element) {
			const canvas = await html2canvas(element, {
				useCORS: true, // Enable cross-origin resource sharing for external assets
				logging: true, // Enable logging for debugging
				scale: 2, // Increase resolution for better quality
				backgroundColor: null // Preserve transparency
			});
			const image = canvas.toDataURL('image/png');

			// Download the screenshot
			const link = document.createElement('a');
			link.href = image;
			link.download = `sandcastle_${id}.png`;
			link.click();
		}

		isSharing = false; // Disable share mode
	}
</script>

<div
	id="screenshot-area"
	class="flex h-full w-full flex-col items-center justify-center self-center bg-[url('/sample/templebg.webp')] bg-cover"
>
	<div
		class="relative flex h-[90%] w-[90%] flex-col items-center justify-start overflow-hidden rounded-[20px] bg-[url('/sample/bg.webp')] bg-cover"
	>
		{#if sandcastle}
			{#if isSharing}
				<div class="mt-20 flex h-[10%] w-full flex-col items-center justify-center">
					<h1 class="text-xs text-[#8D7878] italic">https://sandcastle-delta.vercel.app/</h1>
					<h1 class="text-3xl font-bold text-[#8D7878]">ร่วมตกแต่งเจดีย์ทราย</h1>
					<h1 class="text-3xl font-bold text-[#8D7878]">{sandcastle?.name}</h1>
					<h3 class="mt-2 text-xl font-semibold text-[#8D7878]">ของ {sandcastle?.ownername}</h3>
				</div>
			{:else}
				<div class="mt-10 flex h-[10%] w-full flex-col items-center justify-center">
					<!-- <h1 class="mt-20 text-3xl font-bold text-[#8D7878]">ร่วมตกแต่งเจดีย์ทราย</h1> -->
					<h1 class="text-3xl font-bold text-[#8D7878]">{sandcastle?.name}</h1>
					<h3 class="mt-2 text-xl font-semibold text-[#8D7878]">ของ {sandcastle?.ownername}</h3>
				</div>
			{/if}
		{/if}
		{#if error}
			<p class="text-red-800">{error}</p>
		{:else if sandcastle}
			<div class="flex h-[70%] w-full items-center justify-center">
				<SandcastleItem {sandcastle} />
			</div>
		{:else}
			<Loading />
		{/if}

		<!-- Show QR code and ID icon in share mode -->
		{#if isSharing}
			<div
				class="absolute bottom-5 flex h-[230px] w-[80%] flex-col items-center rounded-2xl bg-white"
			>
				<img style="z-index: 10;" src={qrCodeUrl} alt="QR Code" class="-mb-7 h-[200px] w-[200px]" />
				<p style="z-index: 20;" class="font-thai text-2xl font-bold text-[#8D7878]">
					หมายเลข : {id}
				</p>
			</div>
		{/if}
	</div>
	{#if !isSharing && sandcastle}
		<!-- Share Button -->
		<button
			class="absolute top-100 right-10 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500 text-white shadow-lg"
			on:click={takeScreenshot}
			aria-label="share"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				x="0px"
				y="0px"
				width="20"
				height="20"
				viewBox="0 0 24 24"
			>
				<path
					d="M 18 2 A 3 3 0 0 0 15 5 A 3 3 0 0 0 15.054688 5.5605469 L 7.9394531 9.7109375 A 3 3 0 0 0 6 9 A 3 3 0 0 0 3 12 A 3 3 0 0 0 6 15 A 3 3 0 0 0 7.9355469 14.287109 L 15.054688 18.439453 A 3 3 0 0 0 15 19 A 3 3 0 0 0 18 22 A 3 3 0 0 0 21 19 A 3 3 0 0 0 18 16 A 3 3 0 0 0 16.0625 16.712891 L 8.9453125 12.560547 A 3 3 0 0 0 9 12 A 3 3 0 0 0 8.9453125 11.439453 L 16.060547 7.2890625 A 3 3 0 0 0 18 8 A 3 3 0 0 0 21 5 A 3 3 0 0 0 18 2 z"
				></path>
			</svg>
		</button>

		<Decopanel {openD} {closeD} {handleClickOutside} sandcastleId={id.toString()} />
	{/if}
</div>

<style>
	/* Add styles for the share button and QR code */
	#screenshot-area {
		position: relative;
	}
</style>
