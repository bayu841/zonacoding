<script setup>
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 p-6 font-poppins">
    
    <!-- Card -->
    <div class="w-full max-w-5xl bg-white backdrop-blur-lg rounded-3xl shadow-xl flex overflow-hidden">
      
      <!-- LEFT SIDE -->
      <div class="hidden md:flex w-1/2  bg-gradient-to-r from-white via-blue-50 to-indigo-50 text-white p-10 flex-col justify-center relative">
        
        <img src="../../assets/images/auth/loginhero.png" alt="" class="float w-98">
       
      </div>

      <!-- RIGHT SIDE -->
      <div class="w-full md:w-1/2 p-10">
        
        <!-- Logo -->
        <div class="flex justify-center mb-6">
         <img src="../../assets/images/logo.png" alt="" class="w-24">
        </div>

        <h2 class="text-center text-xl font-semibold mb-6">
          Halo, Silahkan masuk ke akunmu
        </h2>

        <!-- Form -->
        <form class="space-y-4">
          
          <!-- Email -->
          <div>
            <label class="text-sm text-gray-600">Email</label>
            <div class="flex items-center border rounded-lg px-3 py-4 mt-1">
              <span class="text-gray-400 mr-2"></span>
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
              <span class="text-gray-400 mr-2"></span>
              <input
                type="Masukan password"
                placeholder="••••••••"
                class="w-full outline-none text-sm"
              />
            </div>
          </div>

          <!-- Remember -->
          <div class="flex justify-between items-center text-sm">
            <label class="flex items-center gap-2">
              <input type="checkbox" class="accent-blue-500" />
              Remember me
            </label>
            <a href="#" class="text-blue-500 hover:underline">
              Reset Password?
            </a>
          </div>

          <!-- Button -->
          <button
            class="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition"
          >
            Login
          </button>
        </form>

        <!-- Register -->
        <p class="text-center text-sm text-gray-500 pt-10">
          Belum punya akun?
        <router-link to="/register" class="text-blue-500 hover:underline">
                Buat Akun
        </router-link>
        </p>

      </div>
    </div>
  </div>
</template>