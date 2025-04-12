<script>
	import '../app.css';
</script>

<svelte:head>
	<!-- Website Title -->
	<title>ก่อเจดีย์ทราย</title>

	<!-- Meta Tags for SEO -->
	<meta
		name="description"
		content="ก่อเจดีย์ทราย - สร้างและตกแต่งเจดีย์ทรายของคุณในแบบที่ไม่เหมือนใคร!"
	/>
	<meta
		name="keywords"
		content="เจดีย์ทราย, ก่อเจดีย์ทราย, สร้างเจดีย์, ตกแต่งเจดีย์, Sandcastle"
	/>
	<meta name="author" content="ก่อเจดีย์ทราย" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />

	<!-- Open Graph Metadata for Social Sharing -->
	<meta property="og:title" content="ก่อเจดีย์ทราย" />
	<meta property="og:description" content="สร้างและตกแต่งเจดีย์ทรายของคุณในแบบที่ไม่เหมือนใคร!" />
	<meta property="og:image" content="/src/lib/images/sandcastle/lotus.webp" />
	<meta property="og:url" content="https://yourwebsite.com" />
	<meta property="og:type" content="website" />

	<!-- Favicon -->
	<link rel="icon" type="image/webp" href="/lib/image/icon.webp" />
</svelte:head>

<div
	class=" font-thai relative mx-auto flex aspect-[9/16] min-h-screen w-full flex-col items-center bg-[url('/sample/lanwad.PNG')] bg-cover md:h-screen md:w-auto md:max-w-[800px]"
>
	<a
		id="home-button"
		href="/"
		class=" absolute top-[6%] left-[6%] z-5 aspect-square w-[13%] rounded-[100%] border-[2px] border-[#8d7878] bg-[#f6f3e6] text-white hover:border-[#e3d1a0]"
	>
		<img src="/image/icon.webp" class="h-full w-full object-cover" alt="home" />
	</a>

	<slot />
</div>
