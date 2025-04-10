<script lang="ts">
	import { onMount } from 'svelte';

	let imageUrl = '/sample/jaedee1.webp';
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
			<h1 class="font-bold text-[#8D7878] text-5xl sm:text-7xl">เจดีย์ทราย</h1>
		</div>
		
		<div class="flex w-full h-[45%] items-center justify-center">
			<img src={imageUrl} alt="เจดีย์ทราย" class="h-full rounded-lg" />
		</div>

		<div class="flex flex-col space-y-4 w-full items-center justify-start h-[35%]">
			<a
				href="/sandgarden"
				class="btn-primary"
				>สำรวจเจดีย์ในลานวัด</a
			>
			<button
				class="btn-primary"
				on:click={()=> {createPopUp('#friend-popup')}}
				>ตกแต่งเจดีย์เพื่อน</button
			>
			<a
				href="/buildcastle"
				class="btn-primary"
				>ก่อเจดีย์ทรายของคุณ</a
			>
		</div>

		<button
			class="absolute right-3 bottom-3 flex h-8 w-8 sm:h-15 sm:w-15 items-center justify-center rounded-full bg-[#fff8ee] border-[3px] border-[#6a799a] opacity-80 hover:opacity-100 font-bold text-[#6a799a] text-[24px] sm:text-[36px]"
			on:click={()=> {createPopUp('#credit-popup')}}
		>
			?
		</button>

		<div class="absolute z-0 top-[25%] mt-6 flex flex-col h-0 opacity-0 w-[80%] items-center justify-center rounded-[20px] bg-[#f3f5e7] border-[#e3d1a0] border-[2px] font-bold text-[#8D7878] text-[24px] sm:text-[36px]"
		id = "friend-popup">
			<div class="flex w-full h-[33%] items-center justify-center">
				<h3 class="text-3xl sm:text-5xl">รหัสเจดีย์</h3>
			</div>

			<div class="flex w-full h-[33%] items-center justify-center">
				<input type="number" class="w-[90%] h-[60%] rounded-lg border-2 border-[#8d7878] bg-[#f9f5e6] text-[#6a799a] text-[24px] sm:text-[36px] font-bold text-center" />
			</div>

			<div class="flex w-full h-[33%] items-center justify-center">
				<button class="rounded-3xl w-[50%] h-[40%] text-xl sm:text-3xl bg-[#f9f6e8] border-[2px] border-[#e3d1a0]">ไปที่เจดีย์</button>
			</div>

			<button
			class="absolute right-3 top-4 flex h-8 w-8 sm:h-15 sm:w-15 items-center justify-center rounded-full bg-[#d9d9d9] opacity-80 hover:opacity-100 font-bold text-[#8d7878] text-[24px] sm:text-[36px]"
			on:click={() => {closePopUp('#friend-popup')}}
			> x </button>
		</div>

		<div class="absolute z-0 top-[25%] mt-6 flex flex-col h-0 opacity-0 w-[80%] items-center justify-center rounded-[20px] bg-[#f3f5e7] border-[#e3d1a0] border-[2px] font-bold text-[#8D7878] text-[24px] sm:text-[36px]"
		id = "credit-popup">
			<div class="flex w-full h-[30%] items-center justify-center">
				<h3 class="text-3xl sm:text-5xl">credit</h3>
			</div>
			<div class="flex flex-col w-full h-full items-center justify-start pt-4">
				<h3 class="text-2xl sm:text-4xl mb-3">source code: xxxxxxxxxx</h3>
				<h3 class="text-2xl sm:text-4xl mb-3">สร้างโดย: xxxxxxxxxx</h3>
				<h3 class="text-2xl sm:text-4xl mb-3">feedback: xxxxxxxxxx</h3>
			</div>
			<button
			class="absolute right-3 top-4 flex h-8 w-8 sm:h-15 sm:w-15 items-center justify-center rounded-full bg-[#d9d9d9] opacity-80 hover:opacity-100 font-bold text-[#8d7878] text-[24px] sm:text-[36px]"
			on:click={() => {closePopUp('#credit-popup')}}
			> x </button>
		</div>
	</div>
</div>
