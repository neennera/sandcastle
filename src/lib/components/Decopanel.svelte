<!-- src/components/sandcastle/Decoration.svelte -->

<script lang="ts">
	import decoprops from '$lib/utils/utils';
	export let openD: (selector: string) => void;
	export let closeD: (selector: string) => void;
	export let handleClickOutside: (event: MouseEvent) => void;

	let clickedIndex: number | null = null;
	let isOpen: boolean = false;
</script>

<div
	class="absolute bottom-0 z-15 h-[10%] w-full rounded-[20px] border-[2px] border-[#e6d1a3] bg-[#f3e7ce]"
	id="deco"
>
	<button
		class="absolute top-[-25px] left-[20%] h-12 w-[60%] rounded-[20px] border-[#efc368] bg-[#f9d790] text-2xl font-semibold text-[#c28d1e] hover:border-[2px]"
		on:click={() => {
			openD('#deco');
			isOpen = true;
		}}
	>
		ตกแต่งเพิ่ม
	</button>

	<div class="flex h-full w-full flex-col">
		{#if isOpen}
			<div class="mt-[4%] ml-[5%] flex h-[70%] w-[90%] items-center justify-center">
				<div class="grid h-full w-[80%] grid-cols-2 grid-rows-3">
					{#each decoprops as deco, index (index)}
						<div
							class="flex h-24 w-24 items-center justify-center rounded-lg transition-transform duration-200 ease-in-out hover:scale-120"
							on:click={() => (clickedIndex = index)}
							on:keydown={(event) => {
								if (event.key === 'Enter' || event.key === ' ') {
									event.preventDefault();
									clickedIndex = index;
								}
							}}
							role="button"
							tabindex="0"
							aria-label="Select decoration"
						>
							<img
								src={clickedIndex == index ? deco.focusedimg : deco.imgsrc}
								alt="Decoration"
								class="h-full w-full rounded-lg object-cover"
							/>
						</div>
					{/each}
				</div>
				<div
					class="ml-4 flex h-full w-full flex-col items-center justify-center pl-4 text-xl font-semibold text-[#bd7878]"
				>
					{#if clickedIndex !== null}
						<h1 class="text-xl font-bold">{decoprops[clickedIndex].name}</h1>
						<h2 class="text-sm">{decoprops[clickedIndex].detail}</h2>

						<h1 class="mt-2 ml-1 self-start text-base font-medium">
							{decoprops[clickedIndex].description}
						</h1>
					{:else}
						จิ้มของที่ชอบเลย!
					{/if}
				</div>
			</div>
			<button class="btn-secondary mt-4 mb-4 self-center">ส่งของตกแต่ง</button>
		{/if}
	</div>
</div>

<div
	class="absolute z-0 h-full w-full rounded-[20px] bg-[#f6f5ea]"
	id="blur"
	hidden={!isOpen}
	on:click={(event) => {
		handleClickOutside(event);
		clickedIndex = null;
		isOpen = false;
	}}
	on:keydown={(event) => {
		if (event.key === 'Enter') {
			closeD('#deco');
		}
	}}
	role="button"
	tabindex="0"
></div>
