<script lang="ts">
  import {navigateToPage} from '$lib/utils/functionUtils';

  export let close: () => void;
  let otp = Array(5).fill(''); 

  function handleInput(event: KeyboardEvent, index: number) {
      const target = event.target as HTMLInputElement;

      if (event.key === 'Backspace' && !target.value && index > 0) {
          const prevInput = document.getElementById(`otp-${index - 1}`) as HTMLInputElement;
          prevInput?.focus();
      } else {
          otp[index] = target.value.slice(0, 1); 
          if (target.value && index < otp.length - 1) {
              const nextInput = document.getElementById(`otp-${index + 1}`) as HTMLInputElement;
              nextInput?.focus();
          }
      }
  }
</script>

<div class="absolute z-0 top-[25%] mt-6 flex flex-col h-0 opacity-0 w-[80%] items-center justify-center rounded-[20px] bg-[#f3f5e7] border-[#e3d1a0] border-[2px] font-bold text-[#8D7878] text-[24px] sm:text-[36px]"
id="friend-popup">
  <div class="flex w-full h-[33%] items-center justify-center">
      <h3 class="text-3xl sm:text-5xl">รหัสเจดีย์</h3>
  </div>

  <div class="flex w-full h-[33%] items-center justify-center gap-2">
      {#each otp as _, index}
          <input
              id={`otp-${index}`}
              type="text"
              maxlength="1"
              autocomplete="off"
              class="w-[15%] h-[60%] rounded-lg border-2 border-[#8d7878] bg-[#f9f5e6] text-[#6a799a] text-[24px] sm:text-[36px] font-bold text-center focus:border-[#e3d1a0] focus:outline-none"
              bind:value={otp[index]}
              on:keydown={(event) => handleInput(event, index)}
          />
      {/each}
  </div>

  <div class="flex w-full h-[33%] items-center justify-center">
      <button
          class="rounded-3xl w-[50%] h-[40%] text-xl sm:text-3xl bg-[#f9f6e8] border-[2px] border-[#e3d1a0]"
          on:click={()=>navigateToPage('/sandcastle')}
      >
        ไปที่เจดีย์
      </button>
  </div>
  <button
      class="absolute right-3 top-4 flex h-8 w-8 sm:h-15 sm:w-15 items-center justify-center rounded-full bg-[#d9d9d9] opacity-80 hover:opacity-100 font-bold text-[#8d7878] text-[24px] sm:text-[36px]"
      on:click={close}
  > x </button>
</div>