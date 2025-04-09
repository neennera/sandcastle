<script>
	import '../app.css';
</script>

<div class="relative bg-blue-100 min-h-screen flex flex-col items-center sm:max-w-120 w-full mx-auto rela">
  <a href="/" class="absolute top-4 left-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
    Home
  </a>

  <slot />
</div>



