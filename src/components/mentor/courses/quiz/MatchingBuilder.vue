<script setup>
import { Plus, Trash2, Layout } from 'lucide-vue-next'

const props = defineProps({
  question: {
    type: Object,
    required: true
  }
})

const addLeftItem = () => {
  props.question.leftItems.push({ id: 'l-' + Date.now(), text: '' })
}

const addRightItem = () => {
  props.question.rightItems.push({ id: 'r-' + Date.now(), text: '' })
}

const removeLeftItem = (idx) => {
  const item = props.question.leftItems[idx]
  props.question.leftItems.splice(idx, 1)
  delete props.question.pairs[item.id]
}

const removeRightItem = (idx) => {
  const item = props.question.rightItems[idx]
  props.question.rightItems.splice(idx, 1)
  // Cleanup pairs that were pointing to this right item
  Object.keys(props.question.pairs).forEach(key => {
    if (props.question.pairs[key] === item.id) {
      delete props.question.pairs[key]
    }
  })
}
</script>

<template>
  <div class="space-y-6">
    <div class="bg-indigo-50/30 p-4 rounded-2xl border border-indigo-100/50 mb-4">
        <p class="text-[10px] text-indigo-600 font-bold uppercase tracking-widest">Cara Kerja:</p>
        <p class="text-xs text-indigo-500 mt-1">
          1. Tambahkan semua <b>Pilihan Jawaban</b> (kolom kanan) terlebih dahulu.<br/>
          2. Masukkan <b>Item Pertanyaan</b> (kolom kiri) dan <b>Pilih Jawaban</b> yang benar.
        </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Left Column: Questions -->
      <div class="space-y-4">
        <label class="block text-xs font-black text-gray-400 uppercase tracking-widest">Daftar Pertanyaan (Kiri)</label>
        <div v-for="(item, idx) in question.leftItems" :key="item.id" class="p-4 bg-white border border-gray-100 rounded-xl shadow-sm space-y-3 relative group">
          <textarea 
            v-model="item.text"
            rows="1"
            class="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:border-indigo-500 outline-none transition-all text-sm font-medium resize-none"
            placeholder="Contoh: Frontend Framework"
          ></textarea>
          
          <div class="flex items-center gap-2">
            <label class="text-[10px] font-black text-emerald-500 uppercase shrink-0">Jawaban:</label>
            <select 
              v-model="question.pairs[item.id]"
              class="flex-1 px-2 py-1.5 bg-emerald-50 border border-emerald-100 rounded-lg text-xs font-bold text-emerald-800 outline-none"
            >
              <option value="">Pilih Jawaban...</option>
              <option v-for="r in question.rightItems" :key="r.id" :value="r.id">
                {{ r.text || '(Belum diisi)' }}
              </option>
            </select>
          </div>

          <button @click="removeLeftItem(idx)" class="absolute -top-2 -right-2 p-1.5 bg-white border border-gray-100 text-gray-300 hover:text-red-500 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-all">
            <Trash2 class="w-3.5 h-3.5" />
          </button>
        </div>
        <button @click="addLeftItem" class="w-full py-2 border border-dashed border-gray-200 rounded-xl text-xs font-bold text-gray-400 hover:text-indigo-500 hover:border-indigo-200 transition-all flex items-center justify-center gap-2">
          <Plus class="w-3.5 h-3.5" /> Tambah Pertanyaan
        </button>
      </div>

      <!-- Right Column: Answers Pool -->
      <div class="space-y-4">
        <label class="block text-xs font-black text-gray-400 uppercase tracking-widest">Pilihan Jawaban (Kanan)</label>
        <div v-for="(item, idx) in question.rightItems" :key="item.id" class="p-4 bg-emerald-50/20 border border-emerald-100/50 rounded-xl space-y-2 relative group-answer">
          <textarea 
            v-model="item.text"
            rows="1"
            class="w-full px-3 py-2 bg-white border border-emerald-100 rounded-lg focus:border-emerald-500 outline-none transition-all text-sm font-bold text-emerald-800 resize-none"
            placeholder="Contoh: Vue.js"
          ></textarea>
          <button @click="removeRightItem(idx)" class="absolute -top-2 -right-2 p-1.5 bg-white border border-emerald-100 text-gray-300 hover:text-red-500 rounded-lg shadow-sm opacity-0 group-hover-answer:opacity-100 transition-all">
            <Trash2 class="w-3.5 h-3.5" />
          </button>
        </div>
        <button @click="addRightItem" class="w-full py-2 border border-dashed border-emerald-200 rounded-xl text-xs font-bold text-emerald-400 hover:text-emerald-600 hover:border-emerald-300 transition-all flex items-center justify-center gap-2">
          <Plus class="w-3.5 h-3.5" /> Tambah Pilihan Jawaban
        </button>
      </div>
    </div>
  </div>
</template>
