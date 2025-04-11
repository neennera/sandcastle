<script>
	import DecoItems from './decoItems.svelte';
	import flora from '$lib/images/sandcastle/flora.webp';
	import layer from '$lib/images/sandcastle/layer.webp';
	import lotus from '$lib/images/sandcastle/lotus.webp';
	import octagonal from '$lib/images/sandcastle/octagonal.webp';
	export let sandcastle;

	/** @type {keyof typeof imageMap} */
	const sandcastle_type = ['flora', 'layer', 'lotus', 'octagonal'].includes(sandcastle.type)
		? sandcastle.type
		: 'layer';

	// State to track the selected decoration
	/**
	 * @type {{ wishing_text: string; sender_name: string; type: string } | null}
	 */
	let selectedDecoration = null;

	// Pagination state
	let currentPage = 1;
	const itemsPerPage = 5;

	// Configurable top and right values
	const top_values = ['60px', '95px', '115px', '40px', '50px'];
	const right_values = ['130px', '90px', '150px', '40px', '50px'];

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
	const imageMap = {
		flora: flora,
		layer: layer,
		lotus: lotus,
		octagonal: octagonal
	};
</script>

<div class="relative flex h-[300px] w-[300px] flex-col items-center justify-center">
	<!-- Decoration -->
	<div class="decorations-grid">
		{#each paginatedDecorations as decoration, index}
			<button
				type="button"
				class={`decoration-button ${selectedDecoration === decoration ? 'selected' : ''}`}
				style="top: {top_values[index % 6]}; right: {right_values[index % 6]};"
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

	<!-- Sandcastle -->
	<img class=" h-[250px] w-[250px]" src={imageMap[sandcastle_type] || lotus} alt={'sandcastle'} />

	<!-- Pagination controls -->
	<div class="pagination-controls">
		<button on:click={goToPreviousPage} disabled={currentPage === 1}> {'<'} </button>
		<span>กองที่ {currentPage} จาก {totalPages}</span>
		<button on:click={goToNextPage} disabled={currentPage === totalPages}> {'>'} </button>
	</div>

	<!-- Selected decoration details -->
	{#if selectedDecoration}
		<div class="selected-decoration top-0">
			<p>Wishing Text: {selectedDecoration.wishing_text}</p>
			<p>Sender: {selectedDecoration.sender_name}</p>
		</div>
	{/if}
</div>

<style>
	.decoration-button {
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100px;
		height: 80px;
		border-radius: 20px;
		background-color: transparent;
		border: none;
		cursor: pointer;
		transition:
			transform 0.2s,
			box-shadow 0.2s;
	}

	.decoration-button:hover {
		transform: scale(1.05);
	}

	.decoration-button.selected {
		outline: 2px solid white;
		background-color: rgba(255, 255, 255, 0.1);
	}
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
		font-size: medium;
		margin-top: 20px;
		padding: 10px;
		border: 1px solid #ccc;
		border-radius: 15px;
		background-color: #f9f9f9;
	}
</style>
