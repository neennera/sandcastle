<script>
	import '../app.css';
</script>

<div
	class=" font-thai relative mx-auto flex min-h-screen w-full md:h-screen md:w-auto flex-col items-center aspect-[9/16] md:max-w-[800px]"
>	
	<div class="absolute w-full h-full bg-[url('/sample/songkranframe.webp')] z-2 bg-cover" style="pointer-events: none;"></div>
	<a
	id="home-button"
	href="/"
	class=" z-5 absolute w-[13%] aspect-square top-[6%] left-[6%] rounded-[100%] bg-[#f6f3e6] border-[2px] border-[#8d7878] text-white hover:border-[#e3d1a0]"
	>
	<img src="/sample/jaedee1.webp" class="w-full h-full object-cover" alt="home" />
	</a>

	<slot />
</div>
