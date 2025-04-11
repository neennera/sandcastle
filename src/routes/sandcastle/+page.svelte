<script lang="ts">
	import Jaedee from '$lib/components/Jaedee.svelte';

	function openD(selector : string){
		const deco: HTMLElement = document.querySelector(selector) as HTMLElement;
		const blur: HTMLElement = document.querySelector('#blur') as HTMLElement;
		if (deco && blur) {
			deco.style.height = '40%';
			blur.style.opacity = '0.5'; 
			blur.style.zIndex = '10';
		}
	}
	function closeD(selector : string){
		const deco: HTMLElement = document.querySelector(selector) as HTMLElement;
		const blur: HTMLElement = document.querySelector('#blur') as HTMLElement;
		if (deco && blur) {
			deco.style.height = '10%';
			blur.style.opacity = '0'; 
			blur.style.zIndex = '0';
		}
	}

	function handleClickOutside(event: MouseEvent) {
        const deco = document.getElementById('deco');
        if (deco && !deco.contains(event.target as Node)) {
            closeD('#deco'); 
        }
    }
</script>

<div class="flex w-full h-full flex-col items-center justify-center self-center bg-[url('/sample/templebg.webp')] bg-cover">
	<div class="relative flex w-[90%] h-[90%] flex-col items-center justify-start rounded-[20px] bg-[url('/sample/bg.webp')] bg-cover overflow-hidden"
	>
		<div class="flex flex-col w-full h-[25%] items-center justify-center mt-4">
			<h1 class="font-bold text-[#8D7878] text-5xl">เจดีย์สุดจ๊าบ</h1>
			<h3 class="font-semibold text-[#8D7878] text-2xl mt-2"> ของ นีร </h3>
		</div>
		
		<div class="flex w-full h-[40%] items-center justify-center">
			<Jaedee />
		</div>

		
		<div class="absolute bottom-0 z-15 bg-[#f3e7ce] border-[2px] border-[#e6d1a3] h-[10%] w-full rounded-[20px]"
		id="deco">
			<button class="absolute top-[-10px] left-[20%] h-12 w-[60%] text-[#c28d1e] text-2xl font-semibold rounded-[20px] bg-[#f9d790] border-[#efc368] hover:border-[2px]"
			on:click={()=> openD('#deco')}>
			ตกแต่งเพิ่ม
			</button>
			<div class="w-[90%] h-[90%] flex items-center justify-center mt-[4%] ml-[5%]"></div>
		</div>
		<div class="bg-[#f6f5ea] opacity-0 w-full h-full absolute rounded-[20px] z-0" id='blur'
		on:click={handleClickOutside}
		on:keydown={(event) => {
			if (event.key === 'Enter') {
			closeD('#deco'); 
			}
		}}
		role="button"
		tabindex="0"
		></div>
	</div>
</div>

