<script lang="ts">
	export let close: () => void;
</script>

<div
	id="credit-popup"
	class="absolute z-10 mt-6 flex hidden h-auto w-[80%] flex-col items-center justify-center rounded-[20px] border-2 border-[#e3d1a0] bg-[#f3f5e7] px-6 py-6 shadow-lg"
>
	<!-- Title -->
	<div class="mb-4 flex w-full items-center justify-center">
		<h3 class="text-2xl font-bold text-[#8D7878]">เครดิต</h3>
	</div>

	<!-- Content Table -->
	<table class="w-full table-auto border-collapse">
		<tbody>
			<!-- Source Code -->
			<tr class="border-b border-[#e3d1a0]">
				<td class=" py-2 font-bold text-[#8D7878]">GitHub : </td>
				<td class="py-2">
					<a
						href="https://github.com/neennera/sandcastle.git"
						class=" font-normal text-blue-500 underline"
						target="_blank"
						rel="noopener noreferrer"
					>
						sandcastle
					</a>
				</td>
			</tr>

			<!-- Development Team -->
			<tr class="border-b border-[#e3d1a0]">
				<td class="w-[50%] py-2 font-bold text-[#8D7878]">ทีมพัฒนา:</td>
				<td class="py-2">
					<ul class="list-disc pl-5">
						<li>
							<a
								href="https://github.com/neennera"
								class=" font-normal text-blue-500 underline"
								target="_blank"
								rel="noopener noreferrer"
							>
								neennera
							</a>
						</li>
						<li>
							<a
								href="https://github.com/senella02"
								class=" font-normal text-blue-500 underline"
								target="_blank"
								rel="noopener noreferrer"
							>
								prim
							</a>
						</li>
						<li>
							<a
								href="https://github.com/Cchinchillaz"
								class=" font-normal text-blue-500 underline"
								target="_blank"
								rel="noopener noreferrer"
							>
								Cchinchillaz
							</a>
						</li>

						<li>
							<a
								href="https://github.com/Flook0147"
								class=" font-normal text-blue-500 underline"
								target="_blank"
								rel="noopener noreferrer"
							>
								Flook0147
							</a>
						</li>
					</ul>
				</td>
			</tr>

			<!-- Graphics Team -->
			<tr class="border-b border-[#e3d1a0]">
				<td class="w-[50%] py-2 font-bold text-[#8D7878]">ทีมกราฟฟิก:</td>
				<td class="py-2">
					<ul class="list-disc pl-5">
						<li>
							<a
								href="https://github.com/Pakpim"
								target="_blank"
								class=" font-normal text-blue-500 underline">Pakpim</a
							>
						</li>
						<li>
							<a
								href="https://www.instagram.com/ppimpamela/"
								target="_blank"
								class=" font-normal text-blue-500 underline">Pamela Pim</a
							>
						</li>
						<li>
							<div class=" font-normal text-blue-500 underline">SSR</div>
						</li>
					</ul>
				</td>
			</tr>
			<tr class="border-b border-[#e3d1a0]">
				<td class="w-[50%] py-2 font-bold text-[#8D7878]">ทีมโปรโมท:</td>
				<td class="py-2">
					<ul class="list-disc pl-5">
						<li>
							<a
								href="https://github.com/ItsGuitar"
								target="_blank"
								class=" font-normal text-blue-500 underline">ItsGuitar</a
							>
						</li>
					</ul>
				</td>
			</tr>

			<!-- Feedback -->
			<tr>
				<td class="w-[50%] py-2 text-lg font-bold text-[#8D7878]">ส่งคำแนะนำ:</td>
				<td class="py-2">
					<a
						href="https://forms.gle/7cG768pUSdEGyr5n8"
						class="text-lg font-normal text-blue-500 underline"
						target="_blank"
						rel="noopener noreferrer"
					>
						Google Form
					</a>
				</td>
			</tr>
		</tbody>
	</table>

	<!-- Close Button -->
	<button
		class="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#d9d9d9] text-[24px] font-bold text-[#8d7878] opacity-80 hover:opacity-100 sm:h-10 sm:w-10 sm:text-[32px]"
		on:click={close}
	>
		x
	</button>
</div>
