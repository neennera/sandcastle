<script>
	export let type;

	// Define the allowed types
	const validTypes = ['ratchapruek', 'mali', 'banmairooroi', 'flag', 'stone', 'leaf'];

	// Check if the provided type is valid
	if (!validTypes.includes(type)) {
		type = null; // Set to null if invalid
	}
</script>

{#if type}
	<img src={`/static/deco/${type}_OL.webp`} alt={type} />
{:else}
	<!-- return ratchapruek_OL as placeholder  -->
	<img src={`/static/deco/ratchapruek_OL.webp`} alt={type} />
{/if}
