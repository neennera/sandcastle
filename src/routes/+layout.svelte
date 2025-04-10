<script>
	import '../app.css';
</script>

<div
	class=" font-thai relative mx-auto flex min-h-screen w-full md:h-screen md:w-auto flex-col items-center bg-blue-100 aspect-[9/16] md:max-w-[800px]"
>
	<a
		id="home-button"
		href="/"
		class="absolute top-4 left-4 rounded-lg bg-blue-500 px-4 py-2 text-white shadow-md hover:bg-blue-600"
	>
		Home
	</a>

	<slot />
</div>
