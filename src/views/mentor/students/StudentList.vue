<script setup>
import { ref, computed, onMounted } from 'vue'
import { Users, Search, Filter } from 'lucide-vue-next'
import StudentListTable from '../../../components/mentor/students/StudentListTable.vue'
import BaseModal from '../../../components/shared/BaseModal.vue'
import { getMentorStudents } from '@/api/mentorStudents'

const isMessageModalOpen = ref(false)
const selectedStudent = ref(null)
const messageText = ref('')
const isSuccessModalOpen = ref(false)
const loading = ref(false)

const searchQuery = ref('')
const filterCategory = ref('all')
const students = ref([])

const formatDate = (dateString) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}

const fetchStudents = async () => {
  loading.value = true
  try {
    const res = await getMentorStudents()
    if (res.status) {
      students.value = res.data.students.map(s => ({
        id: s.id,
        name: s.student_name,
        email: s.student_email,
        course: s.course_title,
        category: s.category_name,
        progress: s.progress_percentage,
        joinDate: formatDate(s.enrolled_at),
        status: s.status
      }))
    }
  } catch (err) {
    console.error('Fetch students error:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchStudents()
})

const categories = computed(() => {
  const cats = new Set(students.value.map(s => s.category))
  return ['all', ...Array.from(cats)].filter(Boolean)
})

const filteredStudents = computed(() => {
  let result = students.value

  if (filterCategory.value !== 'all') {
    result = result.filter(s => s.category.toLowerCase() === filterCategory.value.toLowerCase())
  }

  if (searchQuery.value) {
    result = result.filter(s =>
      s.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      s.course.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
  return result
})

const sendMessage = () => {
  if (!messageText.value.trim()) {
    alert("Pesan tidak boleh kosong!")
    return
  }
  isMessageModalOpen.value = false
  messageText.value = ''
  setTimeout(() => {
    isSuccessModalOpen.value = true
  }, 300)
}
</script>

<template>
  <div class="space-y-6 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Header Page -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Siswa Saya</h1>
        <p class="text-sm text-gray-500 mt-1">Pantau perkembangan siswa yang aktif belajar di kursus Anda.</p>
      </div>
    </div>

    <!-- Stats & Filters -->
    <div class="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] p-5">
      <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div class="relative w-full md:w-96">
          <Search class="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari berdasarkan nama atau kursus..."
            class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none text-sm font-medium"
          />
        </div>

        <div class="flex gap-3 w-full md:w-auto">
          <select 
            v-model="filterCategory"
            class="flex-1 md:flex-none appearance-none outline-none px-4 py-2.5 bg-gray-50 border border-gray-200 text-gray-600 rounded-xl hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-600 transition-all text-sm font-medium cursor-pointer min-w-[160px]"
          >
            <option v-for="cat in categories" :key="cat" :value="cat">
              {{ cat === 'all' ? 'Semua Kategori' : cat }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- List Component / Default States -->
    <div class="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] overflow-hidden min-h-[400px]">
      <!-- Loading State -->
      <div v-if="loading" class="flex flex-col items-center justify-center py-32">
        <div class="w-12 h-12 border-4 border-emerald-600/20 border-t-emerald-600 rounded-full animate-spin mb-4"></div>
        <p class="text-gray-500 font-bold animate-pulse">Memuat data siswa...</p>
      </div>

      <template v-else>
        <StudentListTable
          v-if="filteredStudents.length > 0"
          :students="filteredStudents"
          @show-options="(student) => {
            selectedStudent = student;
            isMessageModalOpen = true;
          }"
        />

        <div v-else class="p-16 text-center">
          <div class="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-100">
            <Users class="w-8 h-8 text-emerald-600" />
          </div>
          <h3 class="text-lg font-bold text-gray-800 mb-2">Siswa tidak ditemukan</h3>
          <p class="text-gray-500 max-w-sm mx-auto">Coba cari dengan kata kunci lain atau Anda memang belum memiliki siswa.</p>
        </div>
      </template>
    </div>

    <!-- Message Composer Modal -->
    <BaseModal 
      :is-open="isMessageModalOpen"
      @close="isMessageModalOpen = false"
      title="Kirim Pesan ke Siswa"
      type="info"
    >
      <template #default>
        <div class="w-full text-left mt-2">
           <p class="text-sm text-gray-600 mb-4">Pesan akan dikirim ke <strong>{{ selectedStudent?.name }}</strong> via Email atau Notifikasi platform.</p>
           <textarea 
             v-model="messageText"
             rows="4"
             class="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-sm"
             placeholder="Tulis pesan Anda di sini..."
           ></textarea>
           
           <div class="flex gap-3 mt-6">
             <button @click="isMessageModalOpen = false" class="flex-1 py-3 bg-gray-50 text-gray-700 font-bold rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors">Batal</button>
             <button @click="sendMessage" class="flex-1 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors shadow-sm">Kirim Pesan</button>
           </div>
        </div>
      </template>
    </BaseModal>

    <!-- Success Output Modal -->
    <BaseModal 
      :is-open="isSuccessModalOpen"
      @close="isSuccessModalOpen = false"
      @confirm="isSuccessModalOpen = false"
      title="Pesan Terkirim!"
      message="Pesan Anda berhasil dikirim ke siswa dan telah dicatat dalam history percakapan Anda."
      type="success"
      confirmText="Selesai"
    />
  </div>
</template>
