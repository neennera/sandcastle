<script lang="ts">
	import { onMount } from 'svelte';
	import FriendPopup from '$lib/components/FriendPopup.svelte';
	import CreditPopup from '$lib/components/CreditPopup.svelte';
	import { navigateToPage } from '$lib/utils/functionUtils';
	import { PUBLIC_WEB_SECRET } from '$env/static/public';

	import { initGA } from '../analytics';
	onMount(() => {
		initGA();
	});
	let credithidden = true;

	onMount(async () => {
		const data = {
			web_secret: PUBLIC_WEB_SECRET
		};
		try {
			const response = await fetch('/api/auth/login', {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			});
			if (!response.ok) {
				const errorData = await response.json();
				// console.error('Login failed:', errorData);
				return;
			}
		} catch (err) {
			console.error('Error getting token:', err);
		}
	});

	let imageUrl = '/sample/flora.webp';
	onMount(() => {
		const homebtn = document.getElementById('home-button');
		if (homebtn) {
			homebtn.style.display = 'none';
		}
	});

	function createPopUp(selector: string) {
		if (selector === '#credit-popup') {
			credithidden = false; // Update the hidden prop for CreditPopup
		}
		const popup: HTMLElement = document.querySelector(selector) as HTMLElement;
		if (popup) {
			popup.style.minHeight = '40%';
			popup.style.opacity = '100%';
			popup.style.zIndex = '50';
			popup.hidden = false;
		}
	}

	function closePopUp(selector: string) {
		if (selector === '#credit-popup') {
			credithidden = true; // Update the hidden prop for CreditPopup
		}
		const popup: HTMLElement = document.querySelector(selector) as HTMLElement;
		if (popup) {
			popup.style.opacity = '0';
			popup.style.zIndex = '0';
			popup.hidden = true;
		}
	}
</script>

<div class="flex h-full w-full flex-col items-center justify-center self-center">
	<div
		class="relative flex h-[90%] w-[90%] flex-col items-center justify-center rounded-[20px] bg-[url('/sample/bg.webp')] bg-cover"
	>
		<div class="flex h-[20%] w-full items-center justify-center">
			<h1 class="text-5xl font-bold text-[#8D7878]">เจดีย์ทราย</h1>
		</div>

		<div class="flex h-[45%] w-full items-center justify-center">
			<img src={imageUrl} alt="เจดีย์ทราย" class="h-full" />
		</div>

		<div class="flex h-[35%] w-full flex-col items-center justify-start space-y-4">
			<button
				class="btn-primary text-xl"
				on:click={() => {
					navigateToPage('/sandgarden');
				}}
			>
				<p class="ml-2">สำรวจเจดีย์ในลานวัด</p>
				<img src="/sample/larnwat.png" alt="" class="ml-2 h-[70%]" />
			</button>
			<button
				class="btn-primary text-xl"
				on:click={() => {
					createPopUp('#friend-popup');
				}}
			>
				<p class="ml-2">ตกแต่งเจดีย์เพื่อน</p>
				<img src="/sample/search_jd.png" alt="" class="ml-2 h-[70%]" />
			</button>
			<button
				class="btn-primary text-xl"
				on:click={() => {
					navigateToPage('/buildcastle');
				}}
			>
				<p class="ml-2">ก่อเจดีย์ทรายของคุณ</p>
				<img src="/sample/my_jd.png" alt="" class="ml-2 h-[70%]" />
			</button>
		</div>

		<button
			class="absolute top-5 right-3 z-50 flex h-8 w-8 items-center justify-center rounded-full border-[3px] border-[#6a799a] bg-[#fff8ee] text-base text-[#6a799a] sm:h-10 sm:w-10 sm:text-[36px]"
			on:click={() => {
				createPopUp('#credit-popup');
			}}
		>
			<p>?</p>
		</button>

		<FriendPopup close={() => closePopUp('#friend-popup')} />
		<CreditPopup hidden={credithidden} close={() => closePopUp('#credit-popup')} />
	</div>
</div>
<div
	class="absolute z-2 h-full w-full bg-[url('/sample/foreground_textured.webp')] bg-cover"
	style="pointer-events: none;"
></div>
