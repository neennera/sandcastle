<script>
	let sandcastlename = '';
	let name = '';
	let email = '';
	let castleType = '';

	const castleOptions = ['แบบที่ 1', 'แบบที่ 2', 'แบบที่ 3', 'แบบที่ 4'];

	function handleSubmit() {
		alert(`กำลังสร้างเจดีย์ทราย: ${sandcastlename}`);
	}
</script>

<div class="flex min-h-screen flex-col items-center justify-center p-6">
	<h1 class="mb-6 text-3xl font-bold text-yellow-700">ก่อเจดีย์ทราย</h1>

	<form class="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
		<!-- Input Fields -->
		<div class="mb-4">
			<label for="sandcastlename" class="block text-gray-700">ชื่อเจดีย์ทราย</label>
			<input
				id="sandcastlename"
				type="text"
				bind:value={sandcastlename}
				class="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
			/>
		</div>

		<div class="mb-4">
			<label for="ownername" class="block text-gray-700">ชื่อของคุณ</label>
			<input
				id="ownername"
				type="text"
				bind:value={name}
				class="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
			/>
		</div>

		<div class="mb-4">
			<label for="owneremail" class="block text-gray-700">อีเมลของคุณ</label>
			<input
				id="owneremail"
				type="email"
				bind:value={email}
				class="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
			/>
		</div>

		<!-- Castle Type Selection -->
		<div class="mb-4">
			<label for="sandcastletype" class="block text-gray-700">เลือกแบบเจดีย์</label>
			<div class="flex space-x-4">
				{#each castleOptions as option}
					<button
						type="button"
						on:click={() => (castleType = option)}
						class="rounded-lg border px-4 py-2 {castleType == option &&
							'bg-yellow-500 font-bold text-white'} hover:bg-yellow-500 hover:text-white"
					>
						{option}
					</button>
				{/each}
			</div>
		</div>

		<!-- Submit Button -->
		<button
			type="submit"
			on:click|preventDefault={handleSubmit}
			class="w-full rounded-lg bg-yellow-500 px-6 py-3 text-white shadow-md hover:bg-yellow-600"
		>
			ก่อเจดีย์ทราย
		</button>
	</form>
</div>
