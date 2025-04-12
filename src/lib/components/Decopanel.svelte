<!-- src/components/sandcastle/Decoration.svelte -->

<script lang="ts">
	import decoprops from '$lib/utils/utils';
	export let openD: (selector: string) => void;
	export let closeD: (selector: string) => void;
	export let handleClickOutside: (event: MouseEvent) => void;

    let clickedIndex: number | null = null;
    let isOpen: boolean = false;
  </script>
  
<div class="absolute bottom-0 z-15 bg-[#f3e7ce] border-[2px] border-[#e6d1a3] h-[10%] w-full rounded-[20px]" id="deco">
    <button
      class="absolute top-[-20px] left-[20%] h-[5vh] w-[60%] text-[#c28d1e] text-xl sm:text-3xl font-semibold rounded-[20px] bg-[#f9d790] border-[#efc368] hover:border-[2px]"
      on:click={() => {openD('#deco'); isOpen=true;}}
    >
      ตกแต่งเพิ่ม
    </button>

    <div class="flex flex-col w-full h-full">
    {#if isOpen}
     <div class="w-[90%] h-[70%] flex items-center justify-center mt-[6%] ml-[5%]">
        <div class="grid grid-cols-2 grid-rows-3 w-[80%] h-full ">
            {#each decoprops as deco, index (index)}
            <div
                class="flex items-center justify-center rounded-lg hover:scale-120 transition-transform duration-200 ease-in-out"
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
                <img src={clickedIndex == index ? deco.focusedimg : deco.imgsrc} alt="Decoration" class="w-full h-full object-cover rounded-lg" />
            </div>
            {/each}
        </div>
        <div class="w-full h-full text-[#bd7878] justify-center items-start text-base sm:text-lg md:text-xl font-semibold flex flex-col ml-4 pl-4">
            {#if clickedIndex !== null}
            <h1 class="font-bold text-lg sm:text-2xl md:text-3xl">{decoprops[clickedIndex].name}</h1>
            <h2 class="text-sm sm:text-lg md:text-2xl">{decoprops[clickedIndex].detail}</h2>
            <h2 class="mt-2 text-sm sm:text-base font-bold md:text-xl">คำอธิบาย:</h2>
            <h1 class="text-sm font-medium sm:text-base mt-1 md:text-xl">{decoprops[clickedIndex].description}</h1>
            {:else}
            จิ้มของที่ชอบเลย!
            {/if}
        </div>
     </div>
    <button class="btn-secondary self-center mt-4 mb-4">ส่งของตกแต่ง</button>
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
