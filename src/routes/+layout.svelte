<script>
	import '../app.css';
</script>

<div
	class=" font-thai relative mx-auto flex h-screen w-full flex-col items-center overflow-y-scroll bg-blue-100 sm:max-w-120"
>
	<a
		href="/"
		class="absolute top-4 left-4 rounded-lg bg-blue-500 px-4 py-2 text-white shadow-md hover:bg-blue-600"
	>
		Home
	</a>

	<slot />
</div>
