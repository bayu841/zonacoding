<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { Home, ArrowLeft, Ghost, AlertTriangle, ShieldAlert, WifiOff } from 'lucide-vue-next';

const props = defineProps({
  code: {
    type: [Number, String],
    default: 404
  },
  title: {
    type: String,
    default: ''
  },
  message: {
    type: String,
    default: ''
  }
});

const router = useRouter();

const goHome = () => {
  router.push('/');
};

const goBack = () => {
  router.go(-1);
};

const errorContent = computed(() => {
  const code = parseInt(props.code);
  switch (code) {
    case 403:
      return {
        code: 403,
        title: props.title || 'Akses Ditolak',
        message: props.message || 'Maaf, Anda tidak memiliki izin untuk mengakses halaman ini.',
        icon: ShieldAlert,
        color: 'text-orange-600',
        bg: 'bg-orange-600',
        shadow: 'shadow-orange-200'
      };
    case 500:
      return {
        code: 500,
        title: props.title || 'Kesalahan Server',
        message: props.message || 'Terjadi kesalahan pada server kami. Kami sedang berusaha memperbaikinya.',
        icon: AlertTriangle,
        color: 'text-red-600',
        bg: 'bg-red-600',
        shadow: 'shadow-red-200'
      };
    case 503:
      return {
        code: 503,
        title: props.title || 'Layanan Tidak Tersedia',
        message: props.message || 'Server sedang sibuk atau dalam pemeliharaan. Silakan coba lagi nanti.',
        icon: WifiOff,
        color: 'text-gray-600',
        bg: 'bg-gray-600',
        shadow: 'shadow-gray-200'
      };
    default: // 404
      return {
        code: 404,
        title: props.title || 'Halaman Tidak Ditemukan',
        message: props.message || 'Oops! Halaman yang Anda cari tidak dapat ditemukan atau telah dipindahkan.',
        icon: Ghost,
        color: 'text-blue-600',
        bg: 'bg-blue-600',
        shadow: 'shadow-blue-200'
      };
  }
});
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6 font-poppins relative overflow-hidden">
    <!-- Decorative Elements -->
    <div class="absolute top-[-10%] left-[-10%] w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
    <div class="absolute bottom-[-10%] right-[-10%] w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-700"></div>
    
    <div class="max-w-md w-full text-center space-y-8 relative z-10">
      <!-- Icon/Illustration -->
      <div class="relative inline-block">
        <div class="w-32 h-32 bg-white rounded-3xl shadow-2xl flex items-center justify-center mx-auto transform rotate-12 hover:rotate-0 transition-transform duration-500 border border-white/50 backdrop-blur-sm">
          <component :is="errorContent.icon" :class="['w-16 h-16', errorContent.color, 'animate-bounce']" />
        </div>
        <div :class="['absolute -top-4 -right-4 w-12 h-12 rounded-2xl shadow-xl flex items-center justify-center text-white font-bold text-xl animate-pulse', errorContent.bg]">
          {{ errorContent.code }}
        </div>
      </div>

      <div class="space-y-4">
        <h1 class="text-4xl font-bold text-gray-900 leading-tight">
          {{ errorContent.title }}
        </h1>
        <p class="text-lg text-gray-600 leading-relaxed">
          {{ errorContent.message }}
        </p>
      </div>

      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
        <button 
          @click="goHome"
          :class="['w-full sm:w-auto px-8 py-3 text-white rounded-2xl font-semibold shadow-xl transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2 group', errorContent.bg, errorContent.shadow]"
        >
          <Home class="w-5 h-5 group-hover:scale-110 transition-transform" />
          Kembali ke Beranda
        </button>
        
        <button 
          @click="goBack"
          class="w-full sm:w-auto px-8 py-3 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-2xl font-semibold transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2 group"
        >
          <ArrowLeft class="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Kembali
        </button>
      </div>

      <div class="pt-8">
        <p class="text-sm text-gray-400">
          Butuh bantuan? <a href="/faq" class="text-blue-600 hover:underline font-medium">Hubungi Support</a>
        </p>
      </div>
    </div>
    
    <!-- Pattern Decorations -->
    <img src="../assets/images/pattern1.webp" alt="" class="absolute top-10 right-10 w-24 opacity-20 rotate-45 pointer-events-none">
    <img src="../assets/images/pattern4.webp" alt="" class="absolute bottom-10 left-10 w-16 opacity-30 animate-spin-slow pointer-events-none">
  </div>
</template>

<style scoped>
.font-poppins {
  font-family: 'Poppins', sans-serif;
}

@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin-slow {
  animation: spin-slow 12s linear infinite;
}
</style>
