<script>
    let sandcastlename = '';
    let name = '';
    let email = '';
    let castleType = '';
  
    const castleOptions = ['แบบที่ 1', 'แบบที่ 2', 'แบบที่ 3', 'แบบที่ 4'];
  
    function handleSubmit() {
      alert(`กำลังสร้างเจดีย์ทราย: ${sandcastlename}`);
    }
  </script>
  
  <div class="min-h-screen flex flex-col items-center justify-center  p-6">
    <h1 class="text-3xl font-bold text-yellow-700 mb-6">ก่อเจดีย์ทราย</h1>
  
    <form class="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
      <!-- Input Fields -->
      <div class="mb-4">
        <label for="sandcastlename" class="block text-gray-700">ชื่อเจดีย์ทราย</label>
        <input id="sandcastlename" type="text" bind:value={sandcastlename} class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" />
      </div>
  
      <div class="mb-4">
        
        <label for="ownername" class="block text-gray-700">ชื่อของคุณ</label>
        <input  id="ownername" type="text" bind:value={name} class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" />
      </div>
  
      <div class="mb-4">
        <label for="owneremail" class="block text-gray-700">อีเมลของคุณ</label>
        <input id="owneremail" type="email" bind:value={email} class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" />
      </div>
  
      <!-- Castle Type Selection -->
      <div class="mb-4">
        <label for="sandcastletype" class="block text-gray-700">เลือกแบบเจดีย์</label>
        <div class="flex space-x-4">
          {#each castleOptions as option}
            <button type="button" on:click={() => castleType = option} class="px-4 py-2 border rounded-lg {castleType==option && 'bg-yellow-500 font-bold text-white'} hover:bg-yellow-500 hover:text-white">
              {option}
            </button>
          {/each}
        </div>
      </div>
  
      <!-- Submit Button -->
      <button type="submit" on:click|preventDefault={handleSubmit} class="w-full px-6 py-3 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600">
        ก่อเจดีย์ทราย
      </button>
    </form>
  </div>