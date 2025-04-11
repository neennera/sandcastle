<script lang="ts">
	import { onMount } from 'svelte';
	import FriendPopup from '$lib/components/FriendPopup.svelte';
  	import CreditPopup from '$lib/components/CreditPopup.svelte';
	  import {navigateToPage} from '$lib/utils/functionUtils';

	let imageUrl = '/sample/jaedee1.webp';
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

<div class="flex w-full h-full flex-col items-center justify-center self-center bg-[url('/sample/templebg.webp')] bg-cover">
	<div class="relative flex w-[90%] h-[90%] flex-col items-center justify-center rounded-[20px] bg-[url('/sample/bg.webp')] bg-cover">
		<div class="flex w-full h-[20%] items-center justify-center">
			<h1 class="font-bold text-[#8D7878] text-5xl">เจดีย์ทราย</h1>
		</div>
		
		<div class="flex w-full h-[45%] items-center justify-center">
			<img src={imageUrl} alt="เจดีย์ทราย" class="h-full" />
		</div>

		<div class="flex flex-col space-y-4 w-full items-center justify-start h-[35%]">
			<button
				class="btn-primary"
				on:click={()=> {navigateToPage('/sandcastle'); }}
				>สำรวจเจดีย์ในลานวัด</button
			>
			<button
				class="btn-primary"
				on:click={()=> {createPopUp('#friend-popup')}}
				>ตกแต่งเจดีย์เพื่อน</button
			>
			<button
				class="btn-primary"
				on:click={()=> {navigateToPage('/buildcastle')}}
				>ก่อเจดีย์ทรายของคุณ</button
			>
		</div>

		<button
			class="absolute right-3 bottom-3 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-[#fff8ee] border-[3px] border-[#6a799a] opacity-80 hover:opacity-100 font-bold text-[#6a799a] text-[24px] sm:text-[36px]"
			on:click={()=> {createPopUp('#credit-popup')}}
		>
			?
		</button>

		<FriendPopup close={() => closePopUp('#friend-popup')} />
		<CreditPopup close={() => closePopUp('#credit-popup')} />	
	</div>
</div>
