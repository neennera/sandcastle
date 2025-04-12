<script>
	import '../app.css';
</script>

<div
	class=" font-thai relative mx-auto flex min-h-screen w-full md:h-screen md:w-auto flex-col items-center aspect-[9/16] md:max-w-[800px] bg-[url('/sample/lanwad.PNG')] bg-cover"
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
