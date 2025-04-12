<script lang="ts">
	import { navigateToPage } from '$lib/utils/functionUtils'; // Assuming you have this utility function

	function goToLandingPage() {
		navigateToPage('/'); // Navigate to the landing page
	}
</script>

<div
	class="flex h-full w-full flex-col items-center justify-center self-center bg-[url('/sample/templebg.webp')] bg-cover"
>
	<div
		class="relative flex h-[90%] w-[90%] flex-col items-center justify-center rounded-[20px] bg-[url('/sample/bg.webp')] bg-cover"
	>
		<h1 class="text-6xl font-bold text-[#8D7878]">404</h1>
		<p class="mt-4 text-2xl font-semibold text-[#8D7878]">ไม่พบหน้าที่คุณต้องการ</p>

		<button class="btn-primary bg-[url('sample/btnbg.png')]mt-8 h-20" on:click={goToLandingPage}>
			กลับไปหน้าหลัก
		</button>
	</div>
</div>

<style>
	.btn-primary {
		padding: 0.75rem 1.5rem;
		background-color: #f9f6e8;
		color: #6a799a;
		font-size: 1.25rem;
		font-weight: bold;
		border: 2px solid #e3d1a0;
		border-radius: 1.5rem;
		cursor: pointer;
		transition: all 0.2s ease-in-out;
	}

	.btn-primary:hover {
		background-color: #fff8ee;
		color: #8d7878;
		border-color: #c28d1e;
	}
</style>
