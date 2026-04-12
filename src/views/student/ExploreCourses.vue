<script setup>
import { ref, computed } from 'vue'
import { Search } from 'lucide-vue-next'
import BaseModal from '../../components/shared/BaseModal.vue'
import MidtransSnapMock from '../../components/shared/MidtransSnapMock.vue'
import ExploreCourseCard from '../../components/student/ExploreCourseCard.vue'

const searchQuery = ref('')
const selectedCategory = ref('Semua')

// Dummy Categories
const categories = ['Semua', 'Frontend', 'Backend', 'UI/UX Design', 'Digital Marketing']

// Dummy Available Courses
const availableCourses = ref([
  { id: 101, title: 'Mastering React & Next.js', category: 'Frontend', mentor: 'Budi Santoso', rating: 4.8, students: 1250, hours: '12j 30m', lessons: 45, price: 'Rp 250.000', color: 'indigo', image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=600&h=400' },
  { id: 102, title: 'Backend Node.js Advanced', category: 'Backend', mentor: 'Siti Rahma', rating: 4.9, students: 890, hours: '15j 45m', lessons: 60, price: 'Rp 300.000', color: 'green', image: 'https://images.unsplash.com/photo-1627398225058-f4f408731c5f?auto=format&fit=crop&q=80&w=600&h=400' },
  { id: 103, title: 'UI/UX untuk Pemula', category: 'UI/UX Design', mentor: 'Arief Muhammad', rating: 4.7, students: 2100, hours: '8j 15m', lessons: 32, price: 'Gratis', color: 'pink', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=600&h=400' },
  { id: 104, title: 'Vue 3 Composition API', category: 'Frontend', mentor: 'Budi Santoso', rating: 4.6, students: 540, hours: '10j 0m', lessons: 38, price: 'Rp 150.000', color: 'emerald', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600&h=400' }
])

const isEnrollModalOpen = ref(false)
const isSuccessModalOpen = ref(false)
const isMidtransOpen = ref(false)
const selectedCourse = ref(null)

const filteredCourses = computed(() => {
  let result = availableCourses.value
  
  if (selectedCategory.value !== 'Semua') {
    result = result.filter(c => c.category === selectedCategory.value)
  }
  
  if (searchQuery.value) {
    result = result.filter(c => c.title.toLowerCase().includes(searchQuery.value.toLowerCase()))
  }
  
  return result
})

const openEnrollment = (course) => {
  selectedCourse.value = course
  isEnrollModalOpen.value = true
}

const confirmEnrollment = () => {
  isEnrollModalOpen.value = false
  
  if (selectedCourse.value.price === 'Gratis') {
    // If free, skip payment gateway
    setTimeout(() => isSuccessModalOpen.value = true, 300)
  } else {
    // Open Midtrans Gateway
    setTimeout(() => {
      isMidtransOpen.value = true
    }, 300)
  }
}

const handlePaymentSuccess = () => {
  isMidtransOpen.value = false
  setTimeout(() => isSuccessModalOpen.value = true, 300)
}
</script>

<template>
  <div class="space-y-6 max-w-7xl mx-auto pb-10">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h2 class="text-2xl font-bold text-gray-900">Eksplorasi Kursus</h2>
        <p class="text-gray-500 text-sm mt-1">Temukan keahlian baru dan tingkatkan karirmu bersama mentor profesional.</p>
      </div>
    </div>

    <!-- Filters & Search -->
    <div class="flex flex-col md:flex-row gap-4">
      <div class="flex-1 bg-white p-2 rounded-2xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] flex items-center">
        <Search class="w-5 h-5 text-gray-400 mx-3" />
        <input v-model="searchQuery" type="text" placeholder="Cari nama kursus..." class="w-full bg-transparent outline-none text-sm py-2 px-1" />
      </div>
      
      <!-- Category Pills -->
      <div class="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 custom-scrollbar-hide">
        <button 
          v-for="cat in categories" 
          :key="cat"
          @click="selectedCategory = cat"
          class="px-4 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all"
          :class="selectedCategory === cat ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'"
        >
          {{ cat }}
        </button>
      </div>
    </div>

    <!-- Course Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <ExploreCourseCard 
        v-for="course in filteredCourses" 
        :key="course.id"
        :course="course"
        @enroll="openEnrollment"
      />
    </div>

    <!-- Empty State -->
    <div v-if="filteredCourses.length === 0" class="bg-white rounded-2xl border border-gray-100 p-16 text-center shadow-sm">
      <div class="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-gray-100">
        <Search class="w-8 h-8 text-gray-400" />
      </div>
      <h3 class="text-lg font-bold text-gray-900 mb-1">Kursus Tidak Ditemukan</h3>
      <p class="text-gray-500 max-w-sm mx-auto">Kami tidak dapat menemukan kursus dengan filter dan kata kunci tersebut.</p>
    </div>

    <!-- Enrollment Confirmation Modal -->
    <BaseModal
      :is-open="isEnrollModalOpen"
      @close="isEnrollModalOpen = false"
      title="Konfirmasi Pendaftaran"
      type="info"
    >
      <div class="text-left mt-2 w-full" v-if="selectedCourse">
        <p class="text-sm text-gray-600 mb-4">Anda akan mendaftar ke kelas <strong>{{ selectedCourse.title }}</strong> bersama mentor <strong>{{ selectedCourse.mentor }}</strong>.</p>
        
        <div class="bg-gray-50 border border-gray-100 rounded-xl p-4 flex items-center justify-between">
          <span class="text-sm font-semibold text-gray-500">Total Pembayaran</span>
          <span class="text-lg font-black text-indigo-600">{{ selectedCourse.price }}</span>
        </div>
        <p class="text-xs text-gray-400 mt-2 mb-8 italic">*Jika kursus berbayar, Anda akan dialihkan ke gerbang pembayaran (Payment Gateway) setelah konfirmasi.</p>

        <div class="flex space-x-3 w-full">
          <button
            @click="isEnrollModalOpen = false"
            class="flex-1 py-3 px-4 bg-gray-50 text-gray-700 font-semibold rounded-xl hover:bg-gray-100 border border-gray-200 transition-colors"
          >
            Batal
          </button>
          <button
            @click="confirmEnrollment"
            class="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-sm"
          >
            Ya, Daftar Kursus
          </button>
        </div>
      </div>
    </BaseModal>

    <!-- Success Output Modal -->
    <BaseModal 
      :is-open="isSuccessModalOpen"
      @close="isSuccessModalOpen = false"
      @confirm="isSuccessModalOpen = false"
      title="Pendaftaran Berhasil!"
      message="Selamat belajar! Kursus telah ditambahkan ke menu 'Kursus Saya'. Selesaikan materi dan raih sertifikatmu."
      type="success"
      confirmText="Lanjut Belajar"
    />

    <!-- Midtrans Payment Simulator -->
    <MidtransSnapMock
      :is-open="isMidtransOpen"
      :amount="selectedCourse ? selectedCourse.price : 'Rp 0'"
      :order-id="'MDTRNS-' + Math.floor(Math.random() * 100000)"
      @close="isMidtransOpen = false"
      @success="handlePaymentSuccess"
    />
  </div>
</template>

<style scoped>
.custom-scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.custom-scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
