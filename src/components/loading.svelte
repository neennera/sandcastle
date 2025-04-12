<script>
	// No additional logic is needed for this simple loading component
</script>

<div class="flex h-screen flex-col items-center justify-center bg-[#f9f6e8]">
	<!-- Loading Icon -->
	<div class="loading-icon mb-4"></div>

	<!-- Main Loading Text -->
	<h1 class="text-2xl font-bold text-[#8D7878]">กำลังรวมรวบข้อมูลเจดีย์ทราย</h1>

	<!-- Decorative Text -->
	<p class="mt-2 text-lg text-[#6a799a]">โปรดรอสักครู่...</p>
</div>

<style>
	/* Center the loading icon and text */
	.loading-icon {
		width: 50px;
		height: 50px;
		border: 5px solid #e3d1a0; /* Outer border */
		border-top: 5px solid #8d7878; /* Animated border */
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	/* Spin animation */
	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	/* Background and text styling */
	body {
		background-color: #f9f6e8;
		color: #8d7878;
		font-family: 'Arial', sans-serif;
	}
</style>
