<script setup>
import { CheckCircle, XCircle, Eye } from 'lucide-vue-next'

defineProps({
  submissions: {
    type: Array,
    required: true
  }
})

defineEmits(['review'])
</script>

<template>
  <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full text-left text-sm whitespace-nowrap">
        <thead class="bg-gray-50 border-b border-gray-100 text-gray-500 font-bold uppercase tracking-wider">
          <tr>
            <th class="px-6 py-4">Informasi Kursus</th>
            <th class="px-6 py-4">Mentor</th>
            <th class="px-6 py-4">Tgl Submit</th>
            <th class="px-6 py-4">Harga / Modul</th>
            <th class="px-6 py-4">Status</th>
            <th class="px-6 py-4 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="sub in submissions" :key="sub.id" class="hover:bg-gray-50 transition-colors">
            <td class="px-6 py-4">
              <div class="font-bold text-gray-900">{{ sub.title }}</div>
              <div class="text-xs text-gray-500 mt-0.5">ID: CRS-{{ sub.id }}</div>
            </td>
            <td class="px-6 py-4">
              <div class="flex items-center gap-2">
                <div class="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-[10px]">
                  {{ sub.mentor.charAt(0) }}
                </div>
                <span class="font-semibold text-gray-700">{{ sub.mentor }}</span>
              </div>
            </td>
            <td class="px-6 py-4 text-gray-600">{{ sub.submittedAt }}</td>
            <td class="px-6 py-4">
              <div class="font-bold text-gray-900">{{ sub.expectedPrice }}</div>
              <div class="text-xs text-gray-500">{{ sub.modules }} Modul Materi</div>
            </td>
            <td class="px-6 py-4">
              <span class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide flex items-center w-fit gap-1.5"
                :class="{
                  'bg-amber-100 text-amber-700': sub.status === 'Pending',
                  'bg-emerald-100 text-emerald-700': sub.status === 'Approved',
                  'bg-red-100 text-red-700': sub.status === 'Rejected'
                }">
                <span v-if="sub.status === 'Pending'" class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                <CheckCircle v-else-if="sub.status === 'Approved'" class="w-3.5 h-3.5" />
                <XCircle v-else class="w-3.5 h-3.5" />
                {{ sub.status }}
              </span>
            </td>
            <td class="px-6 py-4 text-right">
              <button @click="$emit('review', sub)" class="px-3 py-1.5 bg-indigo-50 text-indigo-700 font-bold rounded-lg hover:bg-indigo-600 hover:text-white transition-colors text-xs flex items-center gap-1.5 ml-auto">
                <Eye class="w-3.5 h-3.5" /> Tinjau
              </button>
            </td>
          </tr>
          <tr v-if="submissions.length === 0">
            <td colspan="6" class="px-6 py-12 text-center text-gray-500">
              Tidak ada kursus yang sesuai dengan kriteria moderasi.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
