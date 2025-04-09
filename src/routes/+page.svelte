<script>
	import { onMount } from 'svelte';

	let imageUrl = '/sample/jaedee1.webp';
</script>

<div class="flex w-full h-full flex-col items-center justify-center self-center bg-[url('/sample/templebg.webp')] bg-cover">
	<div class="relative flex w-[90%] h-[90%] flex-col items-center justify-center rounded-[20px] bg-[url('/sample/bg.webp')] bg-cover">
		<div class="flex w-full h-[20%] items-center justify-center">
			<h1 class="font-bold text-[#BD7878] text-5xl sm:text-7xl">เจดีย์ทราย</h1>
		</div>
		
		<div class="flex w-full h-[40%] items-center justify-center">
			<img src={imageUrl} alt="เจดีย์ทราย" class="h-full rounded-lg" />
		</div>

		<div class="flex flex-col space-y-4 w-full items-center justify-start h-[40%]">
			<a
				href="/sandgarden"
				class="btn-primary"
				>สำรวจเจดีย์ในลานวัด</a
			>
			<a
				href="/sandcastle"
				class="btn-primary"
				>ตกแต่งเจดีย์เพื่อน</a
			>
			<a
				href="/buildcastle"
				class="btn-primary"
				>ก่อเจดีย์ทรายของคุณ</a
			>
		</div>

		<button
			class="absolute right-3 bottom-3 mt-6 flex h-10 w-10 sm:h-15 sm:w-15 items-center justify-center rounded-full bg-[#fff8ee] border-[3px] border-[#6a799a] opacity-80 hover:opacity-100 font-bold text-[#6a799a] text-[24px] sm:text-[36px]"
		>
			?
		</button>
	</div>
</div>
