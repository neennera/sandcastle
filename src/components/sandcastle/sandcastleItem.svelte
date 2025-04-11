<script>
	import DecoItems from './decoItems.svelte';
	export let sandcastle;
</script>

{#if sandcastle.decorations.length > 0}
	<ul>
		{#each sandcastle.decorations as decoration}
			<li>
				<DecoItems type={decoration.type} />
				<p>Wishing Text: {decoration.wishing_text}</p>
				<p>Sender: {decoration.sender_name}</p>
			</li>
		{/each}
	</ul>
{:else}
	<p>No decorations yet.</p>
{/if}
