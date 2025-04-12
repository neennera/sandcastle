<script>
	import '../app.css';
</script>

<div
	class=" font-thai relative mx-auto flex aspect-[9/16] min-h-screen w-full flex-col items-center bg-[url('/sample/lanwad.PNG')] bg-cover md:h-screen md:w-auto md:max-w-[800px]"
>
	<a
		id="home-button"
		href="/"
		class=" absolute top-[6%] left-[6%] z-5 aspect-square w-[13%] rounded-[100%] border-[2px] border-[#8d7878] bg-[#f6f3e6] text-white hover:border-[#e3d1a0]"
	>
		<img src="/sample/jaedee1.webp" class="h-full w-full object-cover" alt="home" />
	</a>

	<slot />
</div>
