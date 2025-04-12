<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';

	let isPortrait = true;

	onMount(() => {
		const checkOrientation = () => {
			isPortrait = (window.innerHeight >= window.innerWidth) || (window.innerHeight > 700 );
		};
		checkOrientation();
		window.addEventListener('resize', checkOrientation);
		return () => window.removeEventListener('resize', checkOrientation);
	});
</script>

<svelte:head>
	<!-- Website Title -->
	<title>เจดีย์ทราย</title>

	<!-- Meta Tags for SEO -->
	<meta
		name="description"
		content="เจดีย์ทราย - สร้างและตกแต่งเจดีย์ทรายของคุณในแบบที่ไม่เหมือนใคร!"
	/>
	<meta
		name="keywords"
		content="เจดีย์ทราย, ก่อเจดีย์ทราย, สร้างเจดีย์, ตกแต่งเจดีย์, Sandcastle"
	/>
	<meta name="author" content="เจดีย์ทราย" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />

	<!-- Open Graph Metadata for Social Sharing -->
	<meta property="og:title" content="เจดีย์ทราย" />
	<meta property="og:description" content="สร้างและตกแต่งเจดีย์ทรายของคุณในแบบที่ไม่เหมือนใคร!" />
	<meta property="og:image" content="/src/lib/images/sandcastle/lotus.webp" />
	<meta property="og:url" content="https://yourwebsite.com" />
	<meta property="og:type" content="website" />

	<!-- Favicon -->
	<link rel="icon" type="image/webp" href="/lib/image/icon.webp" />
</svelte:head>

{#if isPortrait}
	<div
		class="font-thai relative mx-auto flex aspect-[9/16] min-h-screen w-full flex-col items-center bg-[url('/sample/lanwad.PNG')] bg-cover md:h-screen md:w-auto md:max-w-[800px]"
	>
		<a
			id="home-button"
			href="/"
			class="absolute top-[6%] left-[6%] z-5 aspect-square w-[13%] rounded-[100%] border-[2px] border-[#8d7878] bg-[#f6f3e6] text-white hover:border-[#e3d1a0]"
		>
			<img src="/sample/jd.png" class="w-[60%] mx-auto my-2 object-cover" alt="home" />
		</a>

		<slot />
	</div>
{:else}
	<div class="font-thai flex items-center justify-center h-screen w-screen bg-[url('sample/bg.webp')] text-[#8d7878] text-center p-8">
		<p class="text-xl font-bold">กรุณาหมุนอุปกรณ์ของคุณเป็นแนวตั้งเพื่อใช้งานเว็บไซต์ 📱🔄</p>
	</div>
{/if}
