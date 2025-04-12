<script lang="ts">
	import { navigateToPage } from '$lib/utils/functionUtils';

	export let close: () => void;
	let otp = Array(6).fill('');

	function handleInput(event: KeyboardEvent, index: number) {
		const target = event.target as HTMLInputElement;

		// Allow only numeric input
		if (!/^[0-9]$/.test(event.key) && event.key !== 'Backspace') {
			event.preventDefault();
			return;
		}

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

	function resetInputs() {
		otp = Array(6).fill('');
	}
</script>

<div
	class="absolute top-[25%] z-0 mt-6 flex h-0 w-[85%] flex-col items-center justify-center rounded-[20px] border-[2px] border-[#e3d1a0] bg-[#f3f5e7] text-[24px] font-bold text-[#8D7878] opacity-0 sm:text-[36px]"
	id="friend-popup"
>
	<div class="flex h-[33%] w-full items-center justify-center">
		<h3 class="text-3xl sm:text-4xl">รหัสเจดีย์</h3>
	</div>

	<div class="flex h-[33%] w-full items-center justify-center gap-2">
		{#each otp as _, index}
			<input
				id={`otp-${index}`}
				type="text"
				inputmode="numeric"
				pattern="[0-9]*"
				maxlength="1"
				autocomplete="off"
				class="h-[45%] w-[13%] rounded-lg border-2 border-[#8d7878] bg-[#f9f5e6] text-center text-[24px] font-bold text-[#6a799a] focus:border-[#e3d1a0] focus:outline-none sm:text-[36px]"
				bind:value={otp[index]}
				on:keydown={(event) => handleInput(event, index)}
			/>
		{/each}
	</div>

	<div class="flex h-[33%] w-full items-center justify-center">
		<button
			class="h-[40%] w-[50%] rounded-3xl border-[2px] border-[#e3d1a0] bg-[#f9f6e8] text-xl sm:text-2xl"
			on:click={() => navigateToPage(`/sandcastle/${otp.join('')}`)}
		>
			ไปที่เจดีย์
		</button>
	</div>
	<button
		class="absolute top-4 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#d9d9d9] text-[24px] font-bold text-[#8d7878] opacity-80 hover:opacity-100 sm:h-10 sm:w-10 sm:text-[32px]"
		on:click={() => {
			resetInputs();
			close();
		}}
	>
		x
	</button>
</div>
