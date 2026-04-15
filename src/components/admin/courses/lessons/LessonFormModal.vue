<script setup>
import { ref, onMounted, watch } from 'vue'
import { X, Save, Upload, Video, FileText, Check } from 'lucide-vue-next'
import { createLesson, updateLesson } from '@/api/lesson'
import { useAlert } from '@/composables/useAlert'

const props = defineProps({
  show: Boolean,
  courseId: String,
  initialData: Object
})

const emit = defineEmits(['close', 'success'])
const { showAlert } = useAlert()

const loading = ref(false)
const form = ref({
  title: '',
  content: '',
  vidio_url: '',
  order_number: 1,
  is_preview: 0
})
const file = ref(null)
const fileName = ref('')

onMounted(() => {
  if (props.initialData) {
    form.value = {
      title: props.initialData.title,
      content: props.initialData.content || '',
      vidio_url: props.initialData.vidio_url || '',
      order_number: props.initialData.order_number,
      is_preview: props.initialData.is_preview ? 1 : 0
    }
  }
})

const handleFileUpload = (event) => {
  const selectedFile = event.target.files[0]
  if (selectedFile) {
    file.value = selectedFile
    fileName.value = selectedFile.name
  }
}

const handleSubmit = async () => {
  loading.value = true
  try {
    const formData = new FormData()
    formData.append('title', form.value.title)
    formData.append('content', form.value.content || '')
    formData.append('vidio_url', form.value.vidio_url || '')
    formData.append('order_number', form.value.order_number)
    formData.append('is_preview', form.value.is_preview ? '1' : '0')
    
    if (file.value) {
      formData.append('file_path', file.value)
    }

    if (props.initialData) {
      await updateLesson(props.courseId, props.initialData.id, formData)
      showAlert('Berhasil', 'Lesson berhasil diperbarui!', 'success')
    } else {
      await createLesson(props.courseId, formData)
      showAlert('Berhasil', 'Lesson baru berhasil dibuat!', 'success')
    }
    emit('success')
  } catch (err) {
    showAlert('Gagal', err.message || 'Terjadi kesalahan.', 'error')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div v-if="show" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
    <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full my-8 transform transition-all animate-in zoom-in-95 duration-200">
      <!-- Header -->
      <div class="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
        <h3 class="text-xl font-extrabold text-gray-900 tracking-tight">
          {{ initialData ? 'Edit Lesson' : 'Tambah Lesson Baru' }}
        </h3>
        <button @click="$emit('close')" class="p-2 hover:bg-gray-50 rounded-lg text-gray-400 transition-colors">
          <X class="w-5 h-5" />
        </button>
      </div>

      <!-- Body -->
      <div class="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="md:col-span-2">
            <label class="block text-sm font-bold text-gray-700 mb-1.5 uppercase tracking-wider text-[10px]">Judul Lesson</label>
            <input 
              v-model="form.title" 
              type="text" 
              class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-400 font-medium"
              placeholder="Masukkan judul lesson..."
            />
          </div>

          <div class="md:col-span-2">
            <label class="block text-sm font-bold text-gray-700 mb-1.5 uppercase tracking-wider text-[10px]">Video URL (YouTube/Vimeo)</label>
            <div class="relative">
              <Video class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                v-model="form.vidio_url" 
                type="text" 
                class="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition-all font-medium text-sm"
                placeholder="https://youtu.be/..."
              />
            </div>
          </div>

          <div>
             <label class="block text-sm font-bold text-gray-700 mb-1.5 uppercase tracking-wider text-[10px]">Urutan</label>
             <input 
              v-model="form.order_number" 
              type="number" 
              class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition-all font-bold"
             />
          </div>

          <div>
            <label class="block text-sm font-bold text-gray-700 mb-1.5 uppercase tracking-wider text-[10px]">Pratinjau Gratis?</label>
            <div class="flex gap-4">
              <button 
                type="button"
                @click="form.is_preview = 1"
                :class="[
                  'flex-1 py-3 px-4 rounded-xl border-2 font-bold transition-all flex items-center justify-center gap-2 text-sm',
                  form.is_preview == 1 ? 'bg-indigo-50 border-indigo-500 text-indigo-700 shadow-sm' : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'
                ]"
              >
                <Check v-if="form.is_preview == 1" class="w-4 h-4" /> Ya
              </button>
              <button 
                type="button"
                @click="form.is_preview = 0"
                :class="[
                  'flex-1 py-3 px-4 rounded-xl border-2 font-bold transition-all flex items-center justify-center gap-2 text-sm',
                  form.is_preview == 0 ? 'bg-gray-50 border-gray-400 text-gray-600 shadow-sm' : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'
                ]"
              >
                Tidak
              </button>
            </div>
          </div>

          <div class="md:col-span-2">
            <label class="block text-sm font-bold text-gray-700 mb-1.5 uppercase tracking-wider text-[10px]">Lampiran File (PDF/ZIP/DOCX)</label>
            <label class="cursor-pointer">
              <div class="flex flex-col items-center justify-center gap-2 p-6 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl hover:bg-indigo-50 hover:border-indigo-200 transition-all">
                <div v-if="!fileName && !initialData?.file_path" class="flex flex-col items-center gap-2">
                  <Upload class="w-8 h-8 text-gray-400" />
                  <span class="text-sm font-bold text-gray-500">Klik atau seret file ke sini</span>
                  <span class="text-[10px] text-gray-400 uppercase font-black">MAKSIMAL 10MB</span>
                </div>
                <div v-else class="flex flex-col items-center gap-2">
                  <div class="flex items-center gap-3 text-indigo-600">
                    <FileText class="w-6 h-6" />
                    <span class="text-sm font-bold truncate max-w-[250px]">
                      {{ fileName || 'File Terupload (Klik untuk ganti)' }}
                    </span>
                  </div>
                  <a 
                    v-if="initialData?.file_path && !fileName" 
                    :href="initialData.file_path" 
                    target="_blank" 
                    @click.stop
                    class="text-[10px] text-indigo-400 hover:text-indigo-600 underline font-bold"
                  >
                    Lihat file saat ini
                  </a>
                </div>
              </div>
              <input type="file" @change="handleFileUpload" class="hidden" />
            </label>
          </div>

          <div class="md:col-span-2">
            <div class="flex items-center justify-between mb-1.5">
              <label class="block text-sm font-bold text-gray-700 uppercase tracking-wider text-[10px]">Konten Teks (HTML Supported)</label>
              <span class="text-[10px] text-indigo-500 font-bold uppercase tracking-widest cursor-help" title="Anda dapat menggunakan tag HTML dasar seperti <b>, <i>, <ul>, <li>, <h2>, dll untuk memformat teks.">HTML Tips</span>
            </div>
            <textarea 
              v-model="form.content" 
              rows="4" 
              class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-400 font-medium"
              placeholder="Gunakan jika ingin menambahkan materi berbasis teks (Mendukung HTML)..."
            ></textarea>
            
            <!-- Preview Section -->
            <div v-if="form.content" class="mt-4">
              <label class="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider text-[9px]">Pratinjau Konten</label>
              <div 
                class="p-4 bg-gray-50/50 border border-dashed border-gray-200 rounded-xl prose prose-sm max-w-none text-gray-600 line-clamp-5 overflow-hidden"
                v-html="form.content"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="px-8 py-6 bg-gray-50 border-t border-gray-100 flex gap-3">
        <button 
          @click="$emit('close')" 
          class="flex-1 px-6 py-3 bg-white border border-gray-200 rounded-xl font-bold text-sm text-gray-500 hover:bg-gray-100 active:scale-95 transition-all"
        >
          Batal
        </button>
        <button 
          @click="handleSubmit" 
          :disabled="loading"
          class="flex-2 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-3 rounded-xl font-bold text-sm shadow-lg shadow-indigo-100 disabled:opacity-50 active:scale-95 transition-all"
        >
          <Save v-if="!loading" class="w-4 h-4" />
          <div v-else class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          {{ initialData ? 'Simpan Perubahan' : 'Buat Lesson' }}
        </button>
      </div>
    </div>
  </div>
</template>
