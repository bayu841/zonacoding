<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';
import { useImage } from '@/composables/useImage';

const { getProxyUrl, handleImageError } = useImage();

const email = ref('');
const password = ref('');
const loading = ref(false);
const errors = ref({
  email: '',
  password: '',
  general: ''
});


const authStore = useAuthStore();
const router = useRouter();

const handleLogin = async () => {
  errors.value = { email: '', password: '', general: '' };
  
  if (!email.value) {
    errors.value.email = 'Email wajib diisi.';
  }
  if (!password.value) {
    errors.value.password = 'Password wajib diisi.';
  }

  if (errors.value.email || errors.value.password) return;

  loading.value = true;
  try {
    const response = await authStore.login({
      email: email.value,
      password: password.value,
    });
    
    const userRole = response.data.user.role;
    
    // Redirect based on role
    if (userRole === 'admin') {
      router.push({ name: 'admin.dashboard' });
    } else if (userRole === 'mentor') {
      router.push({ name: 'mentor.dashboard' });
    } else {
      router.push({ name: 'student.dashboard' });
    }

  } catch (err) {
    errors.value.general = err.message || 'Login gagal. Periksa kembali email dan password Anda.';
  } finally {
    loading.value = false;
  }
};
</script>


<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 p-6 font-poppins">
    
    <!-- Card -->
    <div class="w-full max-w-5xl bg-white backdrop-blur-lg rounded-3xl shadow-xl flex overflow-hidden">
      
      <!-- LEFT SIDE -->
      <div class="hidden md:flex w-1/2  bg-gradient-to-r from-white via-blue-50 to-indigo-50 text-white p-10 flex-col justify-center relative">
        
        <img src="../../assets/images/auth/loginhero.png" alt="" class="float w-98" @error="handleImageError">
       
      </div>

      <!-- RIGHT SIDE -->
      <div class="w-full md:w-1/2 p-10">
        
        <!-- Logo -->
        <div class="flex justify-center mb-6">
         <img src="../../assets/images/logo.webp" alt="" class="w-24" @error="handleImageError">
        </div>

        <h2 class="text-center text-xl font-semibold mb-6">
          Halo, Silahkan masuk ke akunmu
        </h2>

        <!-- Form -->
        <form @submit.prevent="handleLogin" class="space-y-4">
          <!-- General Error Message -->
          <div v-if="errors.general" class="bg-red-50 text-red-500 p-3 rounded-lg text-sm">
            {{ errors.general }}
          </div>
          
          <!-- Email -->
          <div>
            <label class="text-sm text-gray-600">Email</label>
            <div class="flex items-center border rounded-lg px-3 py-4 mt-1" :class="{'border-red-500': errors.email}">
              <span class="text-gray-400 mr-2"></span>
              <input
                v-model="email"
                type="email"
                placeholder="Masukkan email"
                class="w-full outline-none text-sm"
              />
            </div>
            <p v-if="errors.email" class="text-xs text-red-500 mt-1">{{ errors.email }}</p>
          </div>

          <!-- Password -->
          <div>
            <label class="text-sm text-gray-600">Password</label>
            <div class="flex items-center border rounded-lg px-3 py-4 mt-1" :class="{'border-red-500': errors.password}">
              <span class="text-gray-400 mr-2"></span>
              <input
                v-model="password"
                type="password"
                placeholder="••••••••"
                class="w-full outline-none text-sm"
              />
            </div>
            <p v-if="errors.password" class="text-xs text-red-500 mt-1">{{ errors.password }}</p>
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
            type="submit"
            :disabled="loading"
            class="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
          >
            {{ loading ? 'Mohon tunggu...' : 'Login' }}
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