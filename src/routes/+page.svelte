<script>
	import { onMount } from 'svelte';

	let imageUrl = '/sample/jaedee1.webp';
</script>

<div class="flex min-h-screen w-full flex-col items-center justify-center self-center">
	<h1 class="mb-6 text-4xl font-bold text-yellow-700">เจดีย์ทราย</h1>

	<img src={imageUrl} alt="เจดีย์ทราย" class="mb-6 h-64 w-64 rounded-lg shadow-lg" />

	<div class="flex flex-col space-y-4">
		<a
			href="/sandgarden"
			class="rounded-lg bg-yellow-500 px-6 py-3 text-center text-white shadow-md hover:bg-yellow-600"
			>สำรวจเจดีย์ในลานวัด</a
		>
		<a
			href="/sandcastle"
			class="rounded-lg bg-sky-500 px-6 py-3 text-center text-white shadow-md hover:bg-sky-600"
			>ตกแต่งเจดีย์เพื่อน</a
		>
		<a
			href="/buildcastle"
			class="rounded-lg bg-sky-500 px-6 py-3 text-center text-white shadow-md hover:bg-sky-600"
			>ก่อเจดีย์ทรายของคุณ</a
		>
	</div>

	<button
		class="absolute right-5 bottom-30 mt-6 flex h-10 w-10 items-center justify-center rounded-full bg-gray-300 shadow-md hover:bg-gray-400"
	>
		❓
	</button>
</div>
