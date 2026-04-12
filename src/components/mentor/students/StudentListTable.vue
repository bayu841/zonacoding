<script setup>
import { MoreVertical, Mail } from 'lucide-vue-next'

defineProps({
  students: {
    type: Array,
    required: true
  }
})

defineEmits(['showOptions'])
</script>

<template>
  <div class="overflow-x-auto scrollbar-hide">
    <table class="w-full text-left text-sm whitespace-nowrap min-w-[700px]">
      <thead class="text-xs text-gray-500 bg-gray-50/50 uppercase font-bold border-b border-gray-100">
        <tr>
          <th scope="col" class="px-6 py-4 rounded-tl-xl">Nama Siswa</th>
          <th scope="col" class="px-6 py-4">Kursus</th>
          <th scope="col" class="px-6 py-4">Progress</th>
          <th scope="col" class="px-6 py-4">Tanggal Daftar</th>
          <th scope="col" class="px-6 py-4 text-center rounded-tr-xl">Aksi</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-100/80">
        <tr v-for="student in students" :key="student.id" class="hover:bg-gray-50/30 transition-colors group">
          <td class="px-6 py-4">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold shadow-sm">
                {{ student.name.charAt(0) }}
              </div>
              <div>
                <p class="font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">{{ student.name }}</p>
                <div class="flex items-center gap-1.5 text-xs text-gray-500 mt-0.5">
                  <Mail class="w-3 h-3" />
                  {{ student.email }}
                </div>
              </div>
            </div>
          </td>
          <td class="px-6 py-4 font-medium text-gray-700">
            {{ student.course }}
            <span class="block text-xs text-gray-400 font-normal mt-0.5">{{ student.category }}</span>
          </td>
          <td class="px-6 py-4">
            <div class="flex items-center gap-3">
              <div class="w-full bg-gray-100 rounded-full h-2 max-w-[100px]">
                <div class="bg-emerald-500 h-2 rounded-full" :style="`width: ${student.progress}%`"></div>
              </div>
              <span class="text-xs font-bold text-gray-600">{{ student.progress }}%</span>
            </div>
          </td>
          <td class="px-6 py-4 text-gray-600 font-medium whitespace-nowrap">
             {{ student.joinDate }}
          </td>
          <td class="px-6 py-4 text-center">
            <button @click="$emit('showOptions', student)" class="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors inline-block focus:outline-none">
              <MoreVertical class="w-5 h-5" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
