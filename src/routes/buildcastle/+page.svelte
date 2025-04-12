<script>
	let sandcastlename = '';
	let name = '';
	let email = '';
	let castleType = '';

	let toastVisible = false; // State to control the visibility of the toast
	let toastMessage = '';

	const details = {
		lotus: 'เจดีย์แบบดอกบัว เป็นสัญลักษณ์ของความบริสุทธิ์',
		layer: 'เจดีย์แบบชั้น หมายถึงความมั่นคงและการเติบโต',
		octagonal: 'เจดีย์แปดเหลี่ยม เป็นรูปแบบที่นิยมในหลายภูมิภาค',
		flora: 'เจดีย์แบบดอกไม้ ประดับด้วยลวดลายงดงาม'
	};

	const castleOptions = ['lotus', 'layer', 'octagonal', 'flora'];

	function handleSubmit() {
		alert(`กำลังสร้างเจดีย์ทราย: ${castleType}`);
	}
	function closeToast() {
		toastVisible = false; // Hide the toast
		toastMessage = ''; // Clear the message
	}
</script>

<svelte:window on:scroll={closeToast} />
<div
	class="flex h-full w-full flex-col items-center justify-center self-center bg-[url('/sample/templebg.webp')] bg-cover"
>
	<div
		class="relative flex h-[90%] w-[90%] flex-col items-center justify-center rounded-[20px] bg-[url('/sample/bg.webp')] bg-cover"
	>
		<form class="w-full max-w-lg rounded-lg bg-[url(/sample/bg.webp)] p-6 shadow-lg">
			<div class="text-center">
				<h1 class="mb-6 text-3xl font-bold text-[#8D7878]">สร้างเจดีย์ใหม่</h1>
			</div>
			<!-- Input Fields -->
			<div class="mb-4">
				<label for="sandcastlename" class="block text-[#8D7878]">ชื่อเจดีย์ทราย</label>
				<input
					id="sandcastlename"
					type="text"
					bind:value={sandcastlename}
					class="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
				/>
			</div>

			<div class="mb-4">
				<label for="ownername" class="block text-[#8D7878]">ชื่อของคุณ</label>
				<input
					id="ownername"
					type="text"
					bind:value={name}
					class="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
				/>
			</div>

			<div class="mb-4">
				<label for="owneremail" class="block text-[#8D7878]">อีเมลของคุณ</label>
				<input
					id="owneremail"
					type="email"
					bind:value={email}
					class="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
				/>
			</div>

			<!-- Castle Type Selection -->
			<div class="mb-4">
				<label for="sandcastletype" class="block text-[#8D7878]">เลือกแบบเจดีย์</label>
				<div class="flex w-full space-x-4 py-4">
					<div class="flex space-x-1">
						{#each castleOptions as option}
							<div
								class={`flex flex-col items-center space-y-1 text-[#8D7878] ${
									castleType === option ? 'rounded-lg border-4 border-yellow-500 p-2' : ''
								}`}
							>
								<button
									type="button"
									on:click={() => {
										castleType = option;
										toastVisible = true;
										if (option == 'lotus') {
											toastMessage = details.lotus;
										} else if (option == 'layer') {
											toastMessage = details.layer;
										} else if (option == 'octagonal') {
											toastMessage = details.octagonal;
										} else if (option == 'flora') {
											toastMessage = details.flora;
										}
									}}
									class="flex w-20 cursor-pointer flex-col items-center justify-center rounded-lg border px-4 py-2 text-sm hover:bg-yellow-400 hover:text-white"
								>
									<img src="/sample/{option}.webp" alt="option" />
									<div>{option}</div>
								</button>
							</div>
						{/each}
					</div>
				</div>

				{#if toastVisible}
					<div
						class="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center"
						on:click={closeToast}
						on:keydown={(event) => {
							if (event.key === 'Enter' || event.key === ' ') closeToast();
						}}
						tabindex="0"
						role="button"
					>
						<button
							class="flex flex-col items-center rounded-lg border-4 border-yellow-500 bg-white p-4 shadow-lg"
							on:click|stopPropagation
						>
							<!-- Image at the center -->
							<img src="/sample/{castleType}.webp" alt="option" class="mb-4 h-40 w-40" />

							<!-- Toast message -->
							<div class="flex w-full flex-col items-center justify-center space-y-2">
								<span class="text-4xl font-bold text-yellow-500">{castleType}</span>
								<span>{toastMessage}</span>
								<!-- Close button -->
								<span
									class="ml-4 cursor-pointer rounded-full bg-yellow-500 px-2 px-3 py-1 text-white hover:bg-yellow-600"
									on:click={closeToast}
								>
									ปิดคำอธิบาย
								</span>
							</div>
						</button>
					</div>
				{/if}

				<!-- Submit Button -->
				<button
					type="submit"
					on:click|preventDefault={handleSubmit}
					class="w-full rounded-lg bg-yellow-500 px-6 py-3 text-white shadow-md hover:bg-yellow-600"
				>
					ก่อเจดีย์ทราย
				</button>
			</div>
		</form>
	</div>
</div>
