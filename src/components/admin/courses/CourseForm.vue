<script setup>
import { ref, watch, onMounted } from 'vue'
import { Check, ChevronRight, ChevronLeft, Save, Layout, BookOpen, Settings, Plus, Upload, X } from 'lucide-vue-next'
import { useImage } from '@/composables/useImage'
import { getCategories } from '@/api/category'
import { getUsers } from '@/api/user'

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({
      title: '',
      description: '',
      category_id: '',
      user_id: '',
      thumbnail: null,
      price: 0,
      level: 'beginner',
      status: 'draft',
      is_certificate: 0
    })
  },
  isEdit: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['submit', 'cancel'])

const currentStep = ref(1)
const form = ref({ ...props.initialData })
const categories = ref([])
const mentors = ref([])
const thumbnailPreview = ref(null)
const thumbnailFile = ref(null)
const { getProxyUrl, handleImageError } = useImage()

const fetchInitialData = async () => {
  try {
    const [catRes, userRes] = await Promise.all([
      getCategories(),
      getUsers({ role: 'mentor' })
    ])
    categories.value = catRes.data.data
    mentors.value = userRes.data.data
  } catch (err) {
    console.error('Error fetching data for form:', err)
  }
}

onMounted(() => {
  fetchInitialData()
  if (props.initialData.thumbnail && typeof props.initialData.thumbnail === 'string') {
    thumbnailPreview.value = props.initialData.thumbnail
  }
})

watch(() => props.initialData, (newVal) => {
  form.value = { ...newVal }
  if (newVal.thumbnail && typeof newVal.thumbnail === 'string') {
    thumbnailPreview.value = newVal.thumbnail
  }
}, { deep: true })

const handleThumbnailUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    thumbnailFile.value = file
    thumbnailPreview.value = URL.createObjectURL(file)
  }
}

const clearThumbnail = () => {
  thumbnailFile.value = null
  thumbnailPreview.value = null
  if (props.isEdit) {
    // Keep the old one if not replaced? Or mark it for deletion?
    // Usually if we clear it we might want to keep it null.
  }
}

const nextStep = () => {
    if (currentStep.value < 3) currentStep.value++
}

const prevStep = () => {
    if (currentStep.value > 1) currentStep.value--
}

const submitForm = () => {
    const formData = new FormData()
    formData.append('title', form.value.title)
    formData.append('description', form.value.description || '')
    formData.append('category_id', form.value.category_id)
    formData.append('user_id', form.value.user_id)
    formData.append('level', form.value.level)
    formData.append('price', form.value.price)
    formData.append('status', form.value.status)
    formData.append('is_certificate', form.value.is_certificate ? '1' : '0')
    
    if (thumbnailFile.value) {
      formData.append('thumbnail', thumbnailFile.value)
    }

    emit('submit', formData)
}
</script>


<template>
  <div class="max-w-4xl mx-auto">
    <!-- Stepper Indicator -->
    <div class="mb-8 overflow-hidden bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-gray-100 shadow-sm">
      <div class="flex items-center justify-between">
        <div 
          v-for="step in [
            { id: 1, name: 'Informasi Dasar', icon: Layout }, 
            { id: 2, name: 'Kurikulum', icon: BookOpen }, 
            { id: 3, name: 'Harga & Setting', icon: Settings }
          ]" 
          :key="step.id" 
          class="flex flex-col items-center flex-1 relative"
        >
          <!-- Line connector -->
          <div 
            v-if="step.id < 3" 
            class="absolute top-5 left-1/2 w-full h-[2px] bg-gray-100 z-0"
          >
            <div 
              class="h-full bg-indigo-500 transition-all duration-500" 
              :style="{ width: currentStep > step.id ? '100%' : '0%' }"
            ></div>
          </div>

          <div 
            class="relative z-10 w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 shadow-sm"
            :class="[
              currentStep === step.id ? 'bg-indigo-600 border-indigo-600 text-white ring-4 ring-indigo-50 shadow-indigo-100' : 
              currentStep > step.id ? 'bg-emerald-500 border-emerald-500 text-white shadow-emerald-50' : 
              'bg-white border-gray-200 text-gray-400'
            ]"
          >
            <component :is="currentStep > step.id ? Check : step.icon" class="w-5 h-5" />
          </div>
          <span 
            class="mt-2 text-xs font-bold uppercase tracking-wider transition-colors duration-300"
            :class="currentStep >= step.id ? 'text-gray-900' : 'text-gray-400'"
          >
            {{ step.name }}
          </span>
        </div>
      </div>
    </div>

    <!-- Form Container -->
    <div class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden shadow-indigo-100/20">
      <div class="p-8">
        <!-- Step 1: Informasi Dasar -->
        <div v-show="currentStep === 1" class="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
          <div class="border-b border-gray-100 pb-5 mb-5">
            <h3 class="text-xl font-bold text-gray-900">Informasi Dasar</h3>
            <p class="text-sm text-gray-500">Isi detail dasar untuk kursus Anda.</p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="md:col-span-2">
              <label class="block text-sm font-bold text-gray-700 mb-1">Judul Kursus</label>
              <input 
                v-model="form.title" 
                type="text" 
                class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-400 font-medium" 
                placeholder="Contoh: Mastering Vue 3 with Advanced Patterns" 
              />
            </div>
            
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1">Kategori</label>
              <select 
                v-model="form.category_id" 
                class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition-all"
              >
                <option value="" disabled>Pilih Kategori</option>
                <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1">Mentor</label>
              <select 
                v-model="form.user_id" 
                class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition-all"
              >
                <option value="" disabled>Pilih Mentor</option>
                <option v-for="mentor in mentors" :key="mentor.id" :value="mentor.id">{{ mentor.name }}</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1">Level Kursus</label>
              <select 
                v-model="form.level" 
                class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition-all"
              >
                <option value="beginner">Beginner (Pemula)</option>
                <option value="intermediate">Intermediate (Menengah)</option>
                <option value="advanced">Advanced (Lanjutan)</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1">Thumbnail</label>
              <div class="flex items-center gap-4">
                <div 
                  v-if="thumbnailPreview" 
                  class="relative w-24 h-14 rounded-lg overflow-hidden border border-gray-200 shadow-sm"
                >
                  <img :src="getProxyUrl(thumbnailPreview)" class="w-full h-full object-cover" @error="handleImageError" />
                  <button 
                    @click="clearThumbnail" 
                    class="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600 shadow-sm"
                  >
                    <X class="w-3 h-3" />
                  </button>
                </div>
                <label class="flex-1 cursor-pointer">
                  <div class="flex items-center justify-center gap-2 px-4 py-3 bg-indigo-50/50 border-2 border-dashed border-indigo-200 rounded-xl text-indigo-600 hover:bg-indigo-50 transition-all font-bold text-sm">
                    <Upload class="w-4 h-4" />
                    {{ thumbnailPreview ? 'Ganti Foto' : 'Unggah Foto' }}
                  </div>
                  <input type="file" @change="handleThumbnailUpload" class="hidden" accept="image/*" />
                </label>
              </div>
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm font-bold text-gray-700 mb-1">Deskripsi Lengkap</label>
              <textarea 
                v-model="form.description" 
                rows="4" 
                class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-400"
                placeholder="Jelaskan detail apa yang akan dipelajari di kursus ini..."
              ></textarea>
            </div>
          </div>
        </div>


        <!-- Step 2: Kurikulum -->
        <div v-show="currentStep === 2" class="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
          <div class="border-b border-gray-100 pb-5 mb-5">
            <h3 class="text-xl font-bold text-gray-900">Kurikulum & Konten</h3>
            <p class="text-sm text-gray-500">Susun materi dan modul pembelajaran secara sistematis.</p>
          </div>
          
          <div class="p-6 bg-indigo-50/50 rounded-2xl border border-indigo-100 flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600">
               <BookOpen class="w-6 h-6" />
            </div>
            <div>
              <h4 class="font-bold text-indigo-900">Editor Kurikulum Canggih</h4>
              <p class="text-xs text-indigo-700 mt-1">Anda dapat menambahkan modul dan materi di langkah ini. Fitur ini dalam tahap pengembangan UI lanjutan.</p>
            </div>
          </div>

          <div class="space-y-4">
              <div v-for="(module, mIdx) in form.modules" :key="mIdx" class="p-6 border border-gray-100 rounded-2xl bg-white shadow-sm space-y-4">
                 <div class="flex items-center justify-between">
                    <label class="text-xs font-bold text-indigo-500 uppercase tracking-widest">Modul {{ mIdx + 1 }}</label>
                    <button @click="form.modules.splice(mIdx, 1)" class="text-gray-300 hover:text-red-500 transition-colors">
                       <Plus class="w-4 h-4 rotate-45" />
                    </button>
                 </div>
                 <input 
                  v-model="module.title" 
                  type="text" 
                  class="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition-all font-semibold" 
                  placeholder="Masukkan judul modul..." 
                 />

                 <!-- Lessons in Admin Form -->
                 <div class="space-y-3 mt-4 pl-4 border-l-2 border-gray-100">
                    <div v-for="(lesson, lIdx) in module.lessons" :key="lIdx" class="space-y-2">
                       <div class="flex items-center gap-3 bg-gray-50/50 p-2 rounded-xl border border-gray-100">
                          <select v-model="lesson.type" class="text-[10px] font-black uppercase text-indigo-500 bg-white border border-gray-100 rounded-lg px-2 py-1 outline-none">
                             <option value="video">VIDEO</option>
                             <option value="text">TEKS</option>
                             <option value="project">TUGAS</option>
                          </select>
                          <input v-model="lesson.title" type="text" placeholder="Judul Materi" class="flex-1 bg-transparent border-none text-xs font-bold text-gray-700 focus:ring-0 p-0" />
                          <button @click="module.lessons.splice(lIdx, 1)" class="text-gray-300 hover:text-red-500 transition-colors">
                             <Plus class="w-3.5 h-3.5 rotate-45" />
                          </button>
                       </div>

                       <!-- Project Extra Fields -->
                       <div v-if="lesson.type === 'project'" class="ml-4 p-3 bg-indigo-50/30 rounded-xl border border-indigo-100/50 space-y-3">
                          <div class="flex items-center gap-4">
                             <label class="text-[10px] font-bold text-gray-500 uppercase">Deadline (Hari)</label>
                             <input v-model="lesson.deadline" type="number" class="w-16 bg-white border border-gray-100 rounded-lg px-2 py-1 text-[10px] font-black" />
                          </div>
                          <textarea v-model="lesson.instructions" placeholder="Instruksi Tugas..." class="w-full bg-white border border-gray-100 rounded-lg p-2 text-[10px] font-medium resize-none"></textarea>
                       </div>
                    </div>
                    <button @click="module.lessons.push({ title: '', type: 'video', deadline: 7, instructions: '' })" class="text-[10px] font-black text-indigo-500 uppercase flex items-center gap-1.5 hover:text-indigo-700 transition-colors">
                       <Plus class="w-3.5 h-3.5" /> Tambah Materi
                    </button>
                 </div>
              </div>
              <button @click="form.modules.push({ title: '', lessons: [{ title: '', type: 'video', deadline: 7, instructions: '' }] })" class="w-full py-3 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 hover:border-indigo-300 hover:text-indigo-500 hover:bg-indigo-50 transition-all font-bold text-sm flex items-center justify-center gap-2">
                 <Plus class="w-4 h-4" />
                 Tambah Modul Baru
              </button>
          </div>
        </div>

        <!-- Step 3: Harga & Setting -->
        <div v-show="currentStep === 3" class="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
          <div class="border-b border-gray-100 pb-5 mb-5">
            <h3 class="text-xl font-bold text-gray-900">Harga & Pengaturan</h3>
            <p class="text-sm text-gray-500">Tentukan harga kursus dan status sertifikat.</p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1">Harga Kursus (IDR)</label>
              <div class="relative">
                <span class="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-400">Rp</span>
                <input 
                  v-model="form.price" 
                  type="number" 
                  class="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition-all font-bold" 
                  placeholder="0"
                />
              </div>
              <p class="text-[10px] text-gray-400 mt-1.5 ml-1">Gunakan 0 untuk kursus gratis.</p>
            </div>

            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1">Sertifikat</label>
              <div class="flex gap-4">
                <button 
                  type="button"
                  @click="form.is_certificate = 1"
                  :class="[
                    'flex-1 py-3 px-4 rounded-xl border-2 font-bold transition-all flex items-center justify-center gap-2',
                    form.is_certificate == 1 ? 'bg-indigo-50 border-indigo-500 text-indigo-700 shadow-sm' : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'
                  ]"
                >
                  <Check v-if="form.is_certificate == 1" class="w-4 h-4" />
                  Ada Sertifikat
                </button>
                <button 
                  type="button"
                  @click="form.is_certificate = 0"
                  :class="[
                    'flex-1 py-3 px-4 rounded-xl border-2 font-bold transition-all flex items-center justify-center gap-2',
                    form.is_certificate == 0 ? 'bg-gray-50 border-gray-400 text-gray-600 shadow-sm' : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'
                  ]"
                >
                  <X v-if="form.is_certificate == 0" class="w-4 h-4" />
                  Tidak Ada
                </button>
              </div>
            </div>
            
            <div class="md:col-span-2">
              <label class="block text-sm font-bold text-gray-700 mb-1">Status Publikasi</label>
              <div class="flex gap-4">
                <button 
                  type="button"
                  @click="form.status = 'draft'"
                  :class="[
                    'flex-1 py-3 px-4 rounded-xl border-2 font-bold transition-all flex items-center justify-center gap-2',
                    form.status === 'draft' ? 'bg-amber-50 border-amber-500 text-amber-700 shadow-sm' : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'
                  ]"
                >
                  <div class="w-2 h-2 rounded-full bg-amber-400"></div>
                  Simpan Draft
                </button>
                <button 
                  type="button"
                  @click="form.status = 'published'"
                  :class="[
                    'flex-1 py-3 px-4 rounded-xl border-2 font-bold transition-all flex items-center justify-center gap-2',
                    form.status === 'published' ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-sm' : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'
                  ]"
                >
                  <div class="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]"></div>
                  Publikasikan
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- Action Buttons -->
      <div class="bg-gray-50 border-t border-gray-100 px-8 py-5 flex items-center justify-between">
        <button 
          @click="prevStep" 
          :disabled="currentStep === 1" 
          class="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-gray-600 hover:bg-white hover:text-indigo-600 transition-all disabled:opacity-30 disabled:pointer-events-none"
        >
          <ChevronLeft class="w-4 h-4" />
          Sebelumnya
        </button>

        <div class="flex items-center gap-3">
          <button 
            @click="$emit('cancel')" 
            class="px-5 py-2.5 rounded-xl font-bold text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            Batal
          </button>
          
          <button 
            v-if="currentStep < 3" 
            @click="nextStep" 
            class="group flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-md shadow-indigo-200 transition-all"
          >
            Lanjut
            <ChevronRight class="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
          
          <button 
            v-else 
            @click="submitForm" 
            class="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-2.5 rounded-xl font-bold text-sm shadow-md shadow-emerald-200 transition-all active:scale-95"
          >
            <Save class="w-4 h-4" />
            {{ isEdit ? 'Simpan Perubahan' : 'Luncurkan Kursus' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
