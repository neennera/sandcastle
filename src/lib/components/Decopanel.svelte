<!-- src/components/sandcastle/Decoration.svelte -->

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

		console.log(data);

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
				console.log(errorData.error);

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
			{#if !isFormPage}
				<!-- Selection Page -->
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
						class="mt-4 ml-4 flex h-full w-full flex-col items-center justify-center pl-4 text-xl font-semibold text-[#bd7878]"
					>
						{#if clickedIndex !== null}
							<h1 class="text-xl font-bold">{decoprops[clickedIndex].name}</h1>
							<h2 class="text-sm">{decoprops[clickedIndex].detail}</h2>

							<h1 class="mt-2 ml-1 self-start text-base font-medium">
								{decoprops[clickedIndex].description}
							</h1>

							<button
								class="btn-secondary mt-4 mb-4 self-center text-sm"
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
				<div class="flex flex-col items-center justify-center p-4">
					<input
						type="text"
						placeholder="ชื่อผู้ส่ง"
						bind:value={sender_name}
						class="mt-4 w-full rounded-md border-2 border-yellow-500 bg-white p-2"
					/>
					<textarea
						placeholder="ข้อความอวยพร"
						bind:value={wishing_text}
						class="mt-4 w-full rounded-md border-2 border-yellow-500 bg-white p-2"
					></textarea>
					<div class="mt-4 flex w-full justify-between gap-8">
						<button
							class="btn-secondary h-[45px] text-sm"
							on:click={() => (isFormPage = false)}
							aria-label="ย้อนกลับ"
						>
							ย้อนกลับ
						</button>
						<button
							class="btn-primary h-[45px] text-sm"
							on:click={submitDecoration}
							aria-label="ส่ง"
						>
							ส่ง
						</button>
					</div>
				</div>
			{/if}
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
		isFormPage = false;
	}}
	tabindex="0"
></div>

<style>
	textarea {
		resize: none;
	}
</style>
