<script lang="ts">
    export let close: () => void;
  </script>
  
  <div class="absolute z-0 top-[25%] mt-6 flex flex-col h-0 opacity-0 w-[85%] items-center justify-center rounded-[20px] bg-[#f3f5e7] border-[#e3d1a0] border-[2px] font-bold text-[#8D7878] text-[24px] sm:text-[36px]"
		id = "credit-popup">
			<div class="flex w-full h-[30%] items-center justify-center">
				<h3 class="text-4xl">credit</h3>
			</div>
			<div class="flex flex-col w-full h-full items-center justify-start pt-4">
				<h3 class="text-2xl mb-3">source code: xxxxx</h3>
				<h3 class="text-2xl mb-3">สร้างโดย: xxxxxxxxxx</h3>
				<h3 class="text-2xl mb-3">feedback: xxxxxxxxxx</h3>
			</div>
			<button
      class="absolute right-3 top-4 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-[#d9d9d9] opacity-80 hover:opacity-100 font-bold text-[#8d7878] text-[24px] sm:text-[32px]"
      on:click={close}
      > x </button>
		</div>
  