<script>
	import DecoItems from './decoItems.svelte';
	export let sandcastle;

	// State to track the selected decoration
	/**
	 * @type {{ wishing_text: any; sender_name: any; } | null}
	 */
	let selectedDecoration = null;

	// Function to handle decoration selection
	/**
	 * @param {{ wishing_text: any; sender_name: any; } | null} decoration
	 */
	function selectDecoration(decoration) {
		selectedDecoration = decoration;
	}
</script>

{#if sandcastle.decorations.length > 0}
	<div>
		{#each sandcastle.decorations as decoration}
			<button
				type="button"
				class={selectedDecoration === decoration
					? 'h-[80px] rounded-4xl outline-2 outline-white'
					: 'h-[80px]'}
				on:click={() => selectDecoration(decoration)}
				on:keydown={(e) => e.key === 'Enter' && selectDecoration(decoration)}
			>
				<DecoItems type={decoration.type} />
			</button>
		{/each}

		{#if selectedDecoration}
			<div class="selected-decoration">
				<p>Wishing Text: {selectedDecoration.wishing_text}</p>
				<p>Sender: {selectedDecoration.sender_name}</p>
			</div>
		{/if}
	</div>
{:else}
	<p>No decorations yet.</p>
{/if}
