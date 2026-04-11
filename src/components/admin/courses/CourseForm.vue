<script setup>
import { ref, watch } from 'vue'
import { Check, ChevronRight, ChevronLeft, Save, Layout, BookOpen, Settings } from 'lucide-vue-next'

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({
      title: '',
      description: '',
      category: 'Frontend',
      thumbnail: null,
      modules: [
        { title: '', lessons: [''] }
      ],
      price: 0,
      level: 'Beginner',
      status: 'Draft'
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

watch(() => props.initialData, (newVal) => {
  form.value = { ...newVal }
}, { deep: true })

const nextStep = () => {
    if (currentStep.value < 3) currentStep.value++
}

const prevStep = () => {
    if (currentStep.value > 1) currentStep.value--
}

const submitForm = () => {
    emit('submit', { ...form.value })
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
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1">Judul Kursus</label>
              <input 
                v-model="form.title" 
                type="text" 
                class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-400" 
                placeholder="Contoh: Mastering Vue 3 with Advanced Patterns" 
              />
            </div>
            
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1">Kategori</label>
              <select 
                v-model="form.category" 
                class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition-all"
              >
                <option value="Frontend">Frontend Development</option>
                <option value="Backend">Backend Development</option>
                <option value="Design">UI/UX Design</option>
                <option value="Mobile">Mobile Development</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1">Deskripsi Lengkap</label>
              <textarea 
                v-model="form.description" 
                rows="5" 
                class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition-all"
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
              <div v-for="(module, index) in form.modules" :key="index" class="p-5 border border-gray-100 rounded-2xl bg-white shadow-sm">
                 <label class="block text-xs font-bold text-indigo-500 uppercase tracking-widest mb-2">Modul {{ index + 1 }}</label>
                 <input 
                  v-model="module.title" 
                  type="text" 
                  class="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition-all font-semibold" 
                  placeholder="Masukkan judul modul..." 
                 />
              </div>
              <button class="w-full py-3 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 hover:border-indigo-300 hover:text-indigo-500 hover:bg-indigo-50 transition-all font-bold text-sm flex items-center justify-center gap-2">
                 <Plus class="w-4 h-4" />
                 Tambah Modul Baru
              </button>
          </div>
        </div>

        <!-- Step 3: Harga & Setting -->
        <div v-show="currentStep === 3" class="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
          <div class="border-b border-gray-100 pb-5 mb-5">
            <h3 class="text-xl font-bold text-gray-900">Harga & Pengaturan</h3>
            <p class="text-sm text-gray-500">Tentukan harga kursus dan tingkat kesulitan.</p>
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
              <label class="block text-sm font-bold text-gray-700 mb-1">Level Kursus</label>
              <select 
                v-model="form.level" 
                class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition-all"
              >
                <option value="Beginner">Beginner (Pemula)</option>
                <option value="Intermediate">Intermediate (Menengah)</option>
                <option value="Advanced">Advanced (Lanjutan)</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1">Status Publikasi</label>
              <div class="flex gap-4">
                <button 
                  type="button"
                  @click="form.status = 'Draft'"
                  :class="[
                    'flex-1 py-3 px-4 rounded-xl border-2 font-bold transition-all flex items-center justify-center gap-2',
                    form.status === 'Draft' ? 'bg-amber-50 border-amber-500 text-amber-700 shadow-sm' : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'
                  ]"
                >
                  <div class="w-2 h-2 rounded-full bg-amber-400"></div>
                  Simpan Draft
                </button>
                <button 
                  type="button"
                  @click="form.status = 'Published'"
                  :class="[
                    'flex-1 py-3 px-4 rounded-xl border-2 font-bold transition-all flex items-center justify-center gap-2',
                    form.status === 'Published' ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-sm' : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'
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
