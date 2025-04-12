<script lang="ts">
	import { toast } from '@zerodevx/svelte-toast'; // Import the toast library
	import { SvelteToast } from '@zerodevx/svelte-toast';

	import decoprops from '$lib/utils/utils';
	export let openD: (selector: string) => void;
	export let closeD: (selector: string) => void;
	export let handleClickOutside: (event: MouseEvent) => void;
	export let sandcastleId: string; // Pass the sandcastle ID as a prop

	let clickedIndex: number | null = null;
	let isOpen: boolean = false;
	let isFormPage: boolean = false; // Tracks whether the form page is active

	// Form inputs
	let sender_name: string = '';
	let wishing_text: string = '';

	// Function to handle form submission
	async function submitDecoration() {
		if (clickedIndex === null) return;

		const selectedDecoration = decoprops[clickedIndex];
		const data = {
			type: selectedDecoration.engname,
			wishing_text,
			sender_name
		};

		// console.log(data);

		try {
			const response = await fetch(`/api/sandcastles/${sandcastleId}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			});

			if (!response.ok) {
				const errorData = await response.json();
				// alert(`Failed : ${errorData.error}`);
				// console.log(errorData.error);

				toast.push(`${errorData.error}`, {
					theme: {
						'--toastBackground': '#f56565',
						'--toastColor': '#fff'
					}
				});
				return;
			}

			// Reset state after successful submission
			clickedIndex = null;
			isFormPage = false;
			isOpen = false;
			sender_name = '';
			wishing_text = '';
			location.reload();
		} catch (err) {
			console.error('Error submitting decoration:', err);
		}
	}
</script>

<div
	class="absolute bottom-0 z-15 h-[10%] w-full rounded-[20px] border-[2px] border-[#e6d1a3] bg-[#f3e7ce]"
	id="deco"
>
	<SvelteToast />
	<button
		class="absolute top-[-25px] left-[20%] h-[5vh] w-[60%] rounded-[20px] border-[#efc368] bg-[#f9d790] text-xl font-semibold text-[#c28d1e] hover:border-[2px] sm:text-3xl"
		on:click={() => {
			openD('#deco');
			isOpen = true;
		}}
	>
		ตกแต่งเพิ่ม
	</button>

    {#if isOpen}
	<div class="mt-4 flex h-full w-full flex-col">
			{#if !isFormPage}
				<!-- Selection Page -->
				<div class="mt-[4%] ml-[5%] flex h-[70%] w-[90%] items-center justify-center">
					<div class="grid h-full w-[80%] grid-cols-2 grid-rows-3">
						{#each decoprops as deco, index (index)}
							<div
								class="flex h-20 w-20 items-center justify-center rounded-lg transition-transform duration-200 ease-in-out hover:scale-120 sm:h-32 sm:w-32"
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
						class="mt-4 ml-4 flex h-full w-full flex-col items-center justify-center pl-4 text-xl font-semibold text-[#bd7878] sm:text-2xl"
					>
						{#if clickedIndex !== null}
							<h1 class="text-lg font-bold sm:text-3xl">{decoprops[clickedIndex].name}</h1>
							<h2 class="text-sm sm:text-xl">{decoprops[clickedIndex].detail}</h2>

							<h1 class="mt-2 text-sm font-medium sm:text-xl">
								{decoprops[clickedIndex].description}
							</h1>

							<button
								class="btn-secondary mt-4 mb-4 self-center text-md"
								on:click={() => (isFormPage = true)}
							>
								ถัดไป
							</button>
						{:else}
							จิ้มของที่ชอบเลย!
						{/if}
					</div>
				</div>
			{:else}
				<!-- Form Page -->
				<div class="mt-0 flex h-full flex-col items-center justify-start px-4 py-2 sm:mt-4">
					<input
						type="text"
						placeholder="ชื่อผู้ส่ง"
						bind:value={sender_name}
						class="mt-4 w-full rounded-[20px] border-[2px] border-[#8d7878] bg-[#fdfde6] p-2 text-sm focus:border-[#e3d1a0] focus:outline-none"
					/>
					<textarea
						placeholder="ข้อความอวยพร"
						bind:value={wishing_text}
						class="mt-4 h-[30%] w-full rounded-[20px] border-[2px] border-[#8d7878] bg-[#fdfde6] p-2 text-sm focus:border-[#e3d1a0] focus:outline-none"
					></textarea>
					<div class="mt-4 flex w-full justify-between gap-4">
						<button
							class="btn-primary h-[5vh] h-max-[45px] text-base sm:text-lg"
							on:click={() => (isFormPage = false)}
							aria-label="ย้อนกลับ"
						>
							ย้อนกลับ
						</button>
						<button
							class="btn-primary h-[5vh] h-max-[45px] text-base sm:text-lg"
							on:click={submitDecoration}
							aria-label="ส่ง"
						>
							ส่ง
						</button>
					</div>
				</div>
			{/if}
	</div>
    {/if}
</div>

<div
	class="absolute z-0 h-full w-full rounded-[20px] bg-[#f6f5ea]"
	id="blur"
	hidden={!isOpen}
	on:click={(event) => {
		handleClickOutside(event);
		clickedIndex = null;
		isOpen = false;
		isFormPage = false;
	}}
	tabindex="0"
></div>

<style>
	textarea {
		resize: none;
	}
</style>
