<script>
	import ratchapruek from '$lib/images/deco/ratchapruek_OL.webp';
	import mali from '$lib/images/deco/mali_OL.webp';
	import banmairooroi from '$lib/images/deco/banmairooroi_OL.webp';
	import flag from '$lib/images/deco/flag_OL.webp';
	import stone from '$lib/images/deco/stone_OL.webp';
	import leaf from '$lib/images/deco/leaf_OL.webp';

	/** @type {keyof typeof imageMap} */
	export let type;

	const imageMap = {
		ratchapruek,
		mali,
		banmairooroi,
		flag,
		stone,
		leaf
	};

	$: imageSrc = imageMap[type] || ratchapruek;
</script>

<img class="h-[8vh]" src={imageSrc} alt={type || 'placeholder'} />
