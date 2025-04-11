<script>
	import DecoItems from './decoItems.svelte';
	export let sandcastle;

	// State to track the selected decoration
	/**
	 * @type {{ wishing_text: string; sender_name: string; type: string } | null}
	 */
	let selectedDecoration = null;

	// Pagination state
	let currentPage = 1;
	const itemsPerPage = 6;

	// Function to handle decoration selection
	/**
	 * @param {{ wishing_text: string; sender_name: string; type: string } | null} decoration
	 */
	function selectDecoration(decoration) {
		selectedDecoration = decoration;
	}

	// Calculate paginated decorations
	$: totalPages = Math.ceil(sandcastle.decorations.length / itemsPerPage);
	$: paginatedDecorations = sandcastle.decorations.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	// Navigation functions
	function goToPreviousPage() {
		if (currentPage > 1) {
			currentPage--;
		}
	}

	function goToNextPage() {
		if (currentPage < totalPages) {
			currentPage++;
		}
	}
</script>

{#if sandcastle.decorations.length > 0}
	<div>
		<!-- Paginated decorations -->
		<div class="decorations-grid">
			{#each paginatedDecorations as decoration}
				<button
					type="button"
					class={selectedDecoration === decoration
						? 'flex h-[80px] w-[100px] items-center justify-center rounded-4xl outline-2 outline-white'
						: 'flex h-[80px] w-[100px] items-center justify-center'}
					on:click={() => {
						if (
							selectedDecoration &&
							decoration.sender_name == selectedDecoration.sender_name &&
							decoration.wishing_text == selectedDecoration.wishing_text
						) {
							selectDecoration(null);
						} else {
							selectDecoration(decoration);
						}
					}}
					on:keydown={(e) => e.key === 'Enter' && selectDecoration(decoration)}
				>
					<DecoItems type={decoration.type} />
				</button>
			{/each}
		</div>

		<!-- Pagination controls -->
		<div class="pagination-controls">
			<button on:click={goToPreviousPage} disabled={currentPage === 1}> {'<'} </button>
			<span>กองที่ {currentPage} จาก {totalPages}</span>
			<button on:click={goToNextPage} disabled={currentPage === totalPages}> {'>'} </button>
		</div>

		<!-- Selected decoration details -->
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

<style>
	.decorations-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 10px;
		margin-bottom: 20px;
	}

	.pagination-controls {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 10px;
		margin-bottom: 20px;
	}

	button {
		cursor: pointer;
		padding: 10px;
		border: none;
		background: none;
	}

	button:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}

	.selected-decoration {
		margin-top: 20px;
		padding: 10px;
		border: 1px solid #ccc;
		border-radius: 5px;
		background-color: #f9f9f9;
	}
</style>
