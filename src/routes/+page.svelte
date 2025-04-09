<script>
    import { onMount } from 'svelte';
  
    let imageUrl = '/sample/jaedee1.webp'; 
  </script>
  
  <div class="min-h-screen w-full self-center flex flex-col items-center justify-center">
    <h1 class="text-4xl font-bold text-yellow-700 mb-6">เจดีย์ทราย</h1>
  
    <img src={imageUrl} alt="เจดีย์ทราย" class="w-64 h-64 rounded-lg shadow-lg mb-6" />
  
    <div class="flex flex-col space-y-4">
      <a href="/sandgarden" class="px-6 py-3 text-center bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600">สำรวจเจดีย์ในลานวัด</a>
      <a href="/sandcastle" class="px-6 py-3 text-center bg-sky-500 text-white rounded-lg shadow-md hover:bg-sky-600">ตกแต่งเจดีย์เพื่อน</a>
      <a href="/buildcastle" class="px-6 py-3 text-center bg-sky-500 text-white rounded-lg shadow-md hover:bg-sky-600">ก่อเจดีย์ทรายของคุณ</a>
    </div>
  
    <button class="absolute bottom-30 right-5 w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mt-6 shadow-md hover:bg-gray-400">
      ❓
    </button>
  </div>