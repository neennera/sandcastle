<script>
	import SandcastleItem from '../../components/sandcastle/sandcastleItem.svelte';
	let imageUrl = '/sample/jaedee1.webp';
</script>

<div class="flex min-h-screen w-full flex-col items-center justify-center self-center">
	<h1 class="mb-6 text-4xl font-bold text-yellow-700">นี่คือหน้าเจดีย์ทราย</h1>
	<p>เจดีย์ทรายของนายเอ</p>
	<p>เจดีย์นี้ดีไหมอะ</p>
	<!-- <img src={imageUrl} alt="เจดีย์ทราย" class="mb-6 h-64 w-64 rounded-lg shadow-lg" /> -->
	<SandcastleItem id={123456} />
</div>
