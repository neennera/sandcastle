<script lang="ts">
	import { onMount } from 'svelte';
	import FriendPopup from '$lib/components/FriendPopup.svelte';
	import CreditPopup from '$lib/components/CreditPopup.svelte';
	import { navigateToPage } from '$lib/utils/functionUtils';
	import { PUBLIC_WEB_SECRET } from '$env/static/public';

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
				console.error('Login failed:', errorData);
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
		const popup: HTMLElement = document.querySelector(selector) as HTMLElement;
		if (popup) {
			popup.style.height = '40%';
			popup.style.opacity = '100%';
			popup.style.zIndex = '50';
		}
	}

	function closePopUp(selector: string) {
		const popup: HTMLElement = document.querySelector(selector) as HTMLElement;
		if (popup) {
			popup.style.height = '0';
			popup.style.opacity = '0';
			popup.style.zIndex = '0';
		}
	}
</script>

<div
	class="flex h-full w-full flex-col items-center justify-center self-center bg-[url('/sample/templebg.webp')] bg-cover"
>
	<div
		class="relative flex h-[90%] w-[90%] flex-col items-center justify-center rounded-[20px] bg-[url('/sample/bg.webp')] bg-cover"
	>
		<div class="flex h-[20%] w-full items-center justify-center">
			<h1 class="text-5xl font-bold text-[#8D7878]">ก่อเจดีย์ทราย</h1>
		</div>

		<div class="flex h-[45%] w-full items-center justify-center">
			<img src={imageUrl} alt="เจดีย์ทราย" class="h-full" />
		</div>

		<div class="flex h-[35%] w-full flex-col items-center justify-start space-y-4">
			<button
				class="btn-primary"
				on:click={() => {
					navigateToPage('/sandgarden');
				}}
			>
				สำรวจเจดีย์ในลานวัด
			</button>
			<button
				class="btn-primary"
				on:click={() => {
					createPopUp('#friend-popup');
				}}>ตกแต่งเจดีย์เพื่อน</button
			>
			<button
				class="btn-primary"
				on:click={() => {
					navigateToPage('/buildcastle');
				}}>ก่อเจดีย์ทรายของคุณ</button
			>
		</div>

		<button
			class="absolute right-3 bottom-3 flex h-8 w-8 items-center justify-center rounded-full border-[3px] border-[#6a799a] bg-[#fff8ee] text-[24px] font-bold text-[#6a799a] opacity-80 hover:opacity-100 sm:h-10 sm:w-10 sm:text-[36px]"
			on:click={() => {
				createPopUp('#credit-popup');
			}}
		>
			?
		</button>

		<FriendPopup close={() => closePopUp('#friend-popup')} />
		<CreditPopup close={() => closePopUp('#credit-popup')} />
	</div>
</div>
<div
	class="absolute z-2 h-full w-full bg-[url('/sample/foreground.png')] bg-cover"
	style="pointer-events: none;"
></div>
