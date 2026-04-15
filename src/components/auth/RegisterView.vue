<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';
import { useImage } from '@/composables/useImage';

const { getProxyUrl, handleImageError } = useImage();

const name = ref('');
const email = ref('');
const password = ref('');
const password_confirmation = ref('');
const loading = ref(false);
const errors = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  terms: '',
  general: ''
});


const authStore = useAuthStore();
const router = useRouter();

const handleRegister = async () => {
  errors.value = { name: '', email: '', password: '', password_confirmation: '', terms: '', general: '' };
  
  if (!name.value) errors.value.name = 'Nama lengkap wajib diisi.';
  if (!email.value) errors.value.email = 'Email wajib diisi.';
  if (!password.value) errors.value.password = 'Password wajib diisi.';
  if (!password_confirmation.value) errors.value.password_confirmation = 'Konfirmasi password wajib diisi.';

  if (password.value !== password_confirmation.value) {
    errors.value.password_confirmation = 'Password dan konfirmasi password tidak cocok.';
  }

  if (Object.values(errors.value).some(v => v !== '')) return;

  loading.value = true;
  try {
    await authStore.register({
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: password_confirmation.value,
    });
    
    // Redirect after registration
    if (authStore.isAuthenticated) {
      router.push({ name: 'student.dashboard' });
    } else {
      router.push({ name: 'login' });
    }
  } catch (err) {
    errors.value.general = err.message || 'Pendaftaran gagal. Pastikan data yang Anda masukkan benar.';
  } finally {
    loading.value = false;
  }
};

</script>


<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 p-6 font-poppins">
    
    <!-- Card -->
    <div class="w-full max-w-5xl bg-white rounded-3xl shadow-xl flex overflow-hidden">
      
      <!-- LEFT SIDE -->
  <div class="hidden md:flex w-1/2 bg-gradient-to-r from-white via-blue-50 to-indigo-50 p-10 flex-col justify-center items-center relative pl-2">     
        <img src="../../assets/images/auth/registerhero.png" alt="" class="float w-[340px]" @error="handleImageError">
       
      </div>

      <!-- RIGHT SIDE -->
      <div class="w-full md:w-1/2 p-10">
        
        <!-- Logo -->
        <div class="flex justify-center mb-6">
          <img src="../../assets/images/logo.webp" alt="" class="w-24" @error="handleImageError">
        </div>

        <h2 class="text-center text-xl font-semibold mb-6">
          Buat akun baru
        </h2>

        <!-- Form -->
        <form @submit.prevent="handleRegister" class="space-y-4">
          <!-- General Error Message -->
          <div v-if="errors.general" class="bg-red-50 text-red-500 p-3 rounded-lg text-sm">
            {{ errors.general }}
          </div>

          <!-- Nama -->
          <div>
            <label class="text-sm text-gray-600">Nama Lengkap</label>
            <div class="flex items-center border rounded-lg px-3 py-4 mt-1" :class="{'border-red-500': errors.name}">
              <input
                v-model="name"
                type="text"
                placeholder="Masukkan nama lengkap"
                class="w-full outline-none text-sm"
              />
            </div>
            <p v-if="errors.name" class="text-xs text-red-500 mt-1">{{ errors.name }}</p>
          </div>

          <!-- Email -->
          <div>
            <label class="text-sm text-gray-600">Email</label>
            <div class="flex items-center border rounded-lg px-3 py-4 mt-1" :class="{'border-red-500': errors.email}">
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
              <input
                v-model="password"
                type="password"
                placeholder="Masukkan password"
                class="w-full outline-none text-sm"
              />
            </div>
            <p v-if="errors.password" class="text-xs text-red-500 mt-1">{{ errors.password }}</p>
          </div>

          <!-- Konfirmasi Password -->
          <div>
            <label class="text-sm text-gray-600">Konfirmasi Password</label>
            <div class="flex items-center border rounded-lg px-3 py-4 mt-1" :class="{'border-red-500': errors.password_confirmation}">
              <input
                v-model="password_confirmation"
                type="password"
                placeholder="Ulangi password"
                class="w-full outline-none text-sm"
              />
            </div>
            <p v-if="errors.password_confirmation" class="text-xs text-red-500 mt-1">{{ errors.password_confirmation }}</p>
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
            type="submit"
            :disabled="loading"
            class="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
          >
            {{ loading ? 'Mohon tunggu...' : 'Daftar' }}
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