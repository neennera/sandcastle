<script lang="ts">
	export let close: () => void;
</script>

<div
	class="absolute top-[25%] z-0 mt-6 flex h-0 w-[85%] flex-col items-center justify-center rounded-[20px] border-[2px] border-[#e3d1a0] bg-[#f3f5e7] text-[24px] font-bold text-[#8D7878] opacity-0 sm:text-[36px]"
	id="credit-popup"
>
	<div class="flex h-[30%] w-full items-center justify-center">
		<h3 class="text-4xl">credit</h3>
	</div>
	<div class="items-left flex h-full w-full flex-col justify-start px-4 pt-4">
		<div class="flex flex-col">
			<h3 class="mb-3 flex items-center text-xl">
				source code
				<a
					href="https://github.com/neennera/sandcastle.git"
					class="ml-2 text-xl text-blue-500 underline">Sandcastle</a
				>
			</h3>
		</div>
		<h3 class="mb-3 text-lg">ทีมพัฒนา: neennera, Flook0147,</h3>
		<h3 class="mb-3 text-lg">Cchinchillaz, senella02</h3>
		<h3 class="mb-3 text-lg">ทีมกราฟฟิก: Pakpim</h3>
		<h3 class="mb-3 text-lg">feedback: xxxxxxxxxx</h3>
	</div>
	<button
		class="absolute top-4 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#d9d9d9] text-[24px] font-bold text-[#8d7878] opacity-80 hover:opacity-100 sm:h-10 sm:w-10 sm:text-[32px]"
		on:click={close}
	>
		x
	</button>
</div>
