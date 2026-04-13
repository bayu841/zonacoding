<script setup>
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 p-6 font-poppins">
    
    <!-- Card -->
    <div class="w-full max-w-5xl bg-white rounded-3xl shadow-xl flex overflow-hidden">
      
      <!-- LEFT SIDE -->
  <div class="hidden md:flex w-1/2 bg-gradient-to-r from-white via-blue-50 to-indigo-50 p-10 flex-col justify-center items-center relative pl-2">     
        <img src="../../assets/images/auth/registerhero.png" alt="" class="float w-[340px]">
       
      </div>

      <!-- RIGHT SIDE -->
      <div class="w-full md:w-1/2 p-10">
        
        <!-- Logo -->
        <div class="flex justify-center mb-6">
          <img src="../../assets/images/logo.webp" alt="" class="w-24">
        </div>

        <h2 class="text-center text-xl font-semibold mb-6">
          Buat akun baru
        </h2>

        <!-- Form -->
        <form class="space-y-4">
          
          <!-- Nama -->
          <div>
            <label class="text-sm text-gray-600">Nama Lengkap</label>
            <div class="flex items-center border rounded-lg px-3 py-4 mt-1">
              <input
                type="text"
                placeholder="Masukkan nama lengkap"
                class="w-full outline-none text-sm"
              />
            </div>
          </div>

          <!-- Email -->
          <div>
            <label class="text-sm text-gray-600">Email</label>
            <div class="flex items-center border rounded-lg px-3 py-4 mt-1">
              <input
                type="email"
                placeholder="Masukkan email"
                class="w-full outline-none text-sm"
              />
            </div>
          </div>

          <!-- Password -->
          <div>
            <label class="text-sm text-gray-600">Password</label>
            <div class="flex items-center border rounded-lg px-3 py-4 mt-1">
              <input
                type="password"
                placeholder="Masukkan password"
                class="w-full outline-none text-sm"
              />
            </div>
          </div>

          <!-- Konfirmasi Password -->
          <div>
            <label class="text-sm text-gray-600">Konfirmasi Password</label>
            <div class="flex items-center border rounded-lg px-3 py-4 mt-1">
              <input
                type="password"
                placeholder="Ulangi password"
                class="w-full outline-none text-sm"
              />
            </div>
          </div>

          <!-- Terms -->
          <div class="text-sm">
            <label class="flex items-start gap-2">
              <input type="checkbox" class="accent-blue-500 mt-1" />
              <span class="text-gray-600">
                Saya setuju dengan 
                <a href="#" class="text-blue-500 hover:underline">Syarat</a> 
                & 
                <a href="#" class="text-blue-500 hover:underline">Ketentuan</a>
              </span>
            </label>
          </div>

          <!-- Button -->
          <button
            class="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition"
          >
            Daftar
          </button>
        </form>

        <!-- Login -->
        <p class="text-center text-sm text-gray-500 pt-10">
          Sudah punya akun?
           <router-link to="/login" class="text-blue-500 hover:underline">
                Masuk
           </router-link>
        </p>

      </div>
    </div>
  </div>
</template>