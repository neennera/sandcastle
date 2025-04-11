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
      class="absolute top-[-25px] left-[20%] h-12 w-[60%] text-[#c28d1e] text-2xl sm:text-3xl font-semibold rounded-[20px] bg-[#f9d790] border-[#efc368] hover:border-[2px]"
      on:click={() => {openD('#deco'); isOpen=true;}}
    >
      ตกแต่งเพิ่ม
    </button>

    <div class="flex flex-col w-full h-full">
    {#if isOpen}
     <div class="w-[90%] h-[70%] flex items-center justify-center mt-[4%] ml-[5%]">
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
        <div class="w-full h-full text-[#bd7878] justify-center items-center text-xl sm:text-2xl font-semibold flex flex-col ml-4 pl-4">
            {#if clickedIndex !== null}
            <h1 class="font-bold text-2xl">{decoprops[clickedIndex].name}</h1>
            <h2 class="text-xl">{decoprops[clickedIndex].detail}</h2>
            <h2 class="mt-4 ml-1 self-start text-lg">คำอธิบาย:</h2>
            <h1 class="text-base font-medium self-start mt-1 ml-1">{decoprops[clickedIndex].description}</h1>
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
    class="bg-[#f6f5ea] opacity-0 w-full h-full absolute rounded-[20px] z-0"
    id="blur"
    on:click={(event) => { handleClickOutside(event); clickedIndex = null; isOpen=false;}}
    on:keydown={(event) => {
      if (event.key === 'Enter') {
        closeD('#deco');
      }
    }}
    role="button"
    tabindex="0"
></div>
  