<script setup>
import { ref, onMounted, watch } from 'vue'
import { Search, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import BaseModal from '../../components/shared/BaseModal.vue'
import ExploreCourseCard from '../../components/student/ExploreCourseCard.vue'
import { getMentorActiveCourses } from '@/api/course'
import { getCategories } from '@/api/category'
import { checkout, handleCallback } from '@/api/transaction'

const searchQuery = ref('')
const selectedCategory = ref('Semua')
const categories = ref(['Semua'])
const availableCourses = ref([])
const pagination = ref({
  current_page: 1,
  last_page: 1,
  total: 0
})
const loading = ref(false)

const isEnrollModalOpen = ref(false)
const isSuccessModalOpen = ref(false)
const selectedCourse = ref(null)

const fetchCategories = async () => {
  try {
    const response = await getCategories()
    const rawData = response.data?.data || response.data || []
    if (Array.isArray(rawData)) {
      categories.value = ['Semua', ...rawData.map(c => c.name)]
    }
  } catch (err) {
    console.error('Failed to fetch categories:', err)
  }
}

const fetchCourses = async (page = 1) => {
  loading.value = true
  try {
    const params = {
      page,
      search: searchQuery.value
    }

    if (selectedCategory.value !== 'Semua') {
      params.category = selectedCategory.value
    }

    const response = await getMentorActiveCourses(params)
    const resultData = response.data || {}
    availableCourses.value = resultData.data || []
    pagination.value = resultData.pagination || { current_page: 1, last_page: 1, total: 0 }
  } catch (err) {
    console.error('Failed to fetch courses:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchCategories()
  fetchCourses()
})

// Search with debounce
let searchTimeout
watch(searchQuery, () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    fetchCourses(1)
  }, 500)
})

watch(selectedCategory, () => {
  fetchCourses(1)
})

const openEnrollment = (course) => {
  selectedCourse.value = course
  isEnrollModalOpen.value = true
}

const confirmEnrollment = async () => {
  if (!selectedCourse.value) return

  try {
    const response = await checkout(selectedCourse.value.id)
    isEnrollModalOpen.value = false

    // The response has a 'data' field containing the snap_token
    const snapToken = response.data?.snap_token;

    if (snapToken) {
      window.snap.pay(snapToken, {
        onSuccess: async function(result) {
          try {
            // Synchronize with backend callback
            await handleCallback({
              order_id: result.order_id,
              status_code: result.status_code,
              gross_amount: result.gross_amount,
              signature_key: result.signature_key,
              transaction_status: result.transaction_status || 'settlement'
            })
            isSuccessModalOpen.value = true
            fetchCourses(pagination.value.current_page)
          } catch (callbackErr) {
            console.error('Callback sync failed:', callbackErr)
            // Even if callback fails, we show success if Snap was successful
            isSuccessModalOpen.value = true
            fetchCourses(pagination.value.current_page)
          }
        },
        onPending: function(result) {
          console.log('Payment pending:', result);
          alert('Pembayaran tertunda. Silakan selesaikan pembayaran Anda.');
        },
        onError: function(result) {
          console.error('Payment error:', result);
          alert('Terjadi kesalahan saat memproses pembayaran.');
        },
        onClose: function() {
          console.log('Payment popup closed');
        }
      })
    } else {
      // In case of free course or already enrolled
      isSuccessModalOpen.value = true
      fetchCourses(pagination.value.current_page)
    }
  } catch (err) {
    console.error('Checkout failed:', err)
    alert(err.message || 'Gagal memproses pendaftaran.')
  }
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

      <!-- Category Dropdown -->
      <div class="relative min-w-[200px]">
        <select
          v-model="selectedCategory"
          class="w-full bg-white px-4 py-3 rounded-2xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] outline-none text-sm font-semibold text-gray-700 appearance-none cursor-pointer hover:border-indigo-200 transition-colors"
        >
          <option v-for="cat in categories" :key="cat" :value="cat">
            {{ cat === 'Semua' ? 'Semua Kategori' : cat }}
          </option>
        </select>
        <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
          <ChevronRight class="w-4 h-4 rotate-90" />
        </div>
      </div>
    </div>

    <!-- Course Grid -->
    <!-- Course Grid -->
    <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div v-for="i in 8" :key="i" class="bg-gray-100 animate-pulse rounded-2xl h-[360px]"></div>
    </div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <ExploreCourseCard
        v-for="(course, index) in availableCourses"
        :key="course.id"
        :course="{
          ...course,
          category: course.category?.name || 'Uncategorized',
          mentor: course.mentor?.name || 'Mentor',
          image: course.thumbnail,
          price: course.price > 0 ? `Rp ${Number(course.price).toLocaleString('id-ID')}` : 'Gratis',
          lessons: course.lesson_count || 0,
          hours: '12j 30m',
          rating: 4.8,
          students: 1250,
          color: ['indigo', 'emerald', 'blue', 'rose', 'amber'][index % 5],
          description: course.description || 'Tidak ada deskripsi tersedia.',
          level: course.level || 'Beginner'
        }"
        @enroll="openEnrollment"
      />
    </div>

    <!-- Empty State -->
    <div v-if="!loading && availableCourses.length === 0" class="bg-white rounded-2xl border border-gray-100 p-16 text-center shadow-sm">
      <div class="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-gray-100">
        <Search class="w-8 h-8 text-gray-400" />
      </div>
      <h3 class="text-lg font-bold text-gray-900 mb-1">Kursus Tidak Ditemukan</h3>
      <p class="text-gray-500 max-w-sm mx-auto">Kami tidak dapat menemukan kursus dengan filter dan kata kunci tersebut.</p>
    </div>

    <!-- Pagination -->
    <div v-if="pagination.last_page > 1" class="flex items-center justify-center gap-2 pt-4">
      <button
        @click="fetchCourses(pagination.current_page - 1)"
        :disabled="pagination.current_page === 1"
        class="p-2.5 bg-white border border-gray-100 rounded-xl shadow-sm text-gray-600 hover:bg-gray-50 hover:border-gray-200 transition-all disabled:opacity-40"
      >
        <ChevronLeft class="w-5 h-5" />
      </button>

      <div class="px-6 py-2 bg-white border border-gray-100 rounded-xl shadow-sm">
        <span class="text-sm font-bold text-indigo-600">{{ pagination.current_page }}</span>
        <span class="mx-2 text-gray-300 text-xs">/</span>
        <span class="text-xs text-gray-400 font-medium">{{ pagination.last_page }}</span>
      </div>

      <button
        @click="fetchCourses(pagination.current_page + 1)"
        :disabled="pagination.current_page === pagination.last_page"
        class="p-2.5 bg-white border border-gray-100 rounded-xl shadow-sm text-gray-600 hover:bg-gray-50 hover:border-gray-200 transition-all disabled:opacity-40"
      >
        <ChevronRight class="w-5 h-5" />
      </button>
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
            Ya, Beli Kursus
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
