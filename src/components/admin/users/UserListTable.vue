<script setup>
import { Edit, Trash2, Eye, Mail, Calendar, Search } from 'lucide-vue-next'

defineProps({
  users: Array
})

defineEmits(['view-detail', 'view-edit', 'delete-user'])

const getInitials = (name) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

const getRoleBadgeClass = (role) => {
  const classes = {
    admin: 'bg-purple-100 text-purple-800 border-purple-200',
    mentor: 'bg-blue-100 text-blue-800 border-blue-200',
    student: 'bg-gray-100 text-gray-800 border-gray-200'
  }
  return classes[role] || 'bg-gray-100 text-gray-800'
}

const getStatusClass = (status) => {
  return status === 'Aktif'
    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
    : status === 'Verifikasi'
    ? 'bg-amber-50 text-amber-700 border-amber-200'
    : 'bg-red-50 text-red-700 border-red-200'
}
</script>

<template>
  <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-100">
        <thead>
          <tr class="bg-gray-50/80">
            <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Pengguna</th>
            <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Peran</th>
            <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
            <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Bergabung</th>
            <th scope="col" class="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="user in users" :key="user.id" class="hover:bg-blue-50/30 transition-colors duration-200">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center gap-3">
                <div class="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center font-semibold shadow-sm">
                  {{ getInitials(user.name) }}
                </div>
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                  <div class="text-sm text-gray-500 flex items-center gap-1">
                    <Mail class="w-3 h-3" />
                    {{ user.email }}
                  </div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="['inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border', getRoleBadgeClass(user.role)]">
                {{ user.role === 'admin' ? 'Admin' : user.role === 'mentor' ? 'Mentor' : 'Siswa' }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="['inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border', getStatusClass(user.status)]">
                {{ user.status }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-600 flex items-center gap-1">
                <Calendar class="w-3.5 h-3.5 text-gray-400" />
                {{ user.joined }}
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right">
              <div class="flex items-center justify-end gap-1">
                <button @click="$emit('view-detail', user)" class="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors" title="Detail">
                  <Eye class="w-4 h-4" />
                </button>
                <button @click="$emit('view-edit', user)" class="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                  <Edit class="w-4 h-4" />
                </button>
                <button @click="$emit('delete-user', user)" class="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Hapus">
                  <Trash2 class="w-4 h-4" />
                </button>
              </div>
            </td>
          </tr>
          <!-- Empty State -->
          <tr v-if="users.length === 0">
            <td colspan="5" class="px-6 py-16 text-center">
              <div class="flex flex-col items-center justify-center">
                <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                  <Search class="w-6 h-6 text-gray-400" />
                </div>
                <p class="text-gray-500 font-medium">Tidak ada pengguna ditemukan</p>
                <p class="text-sm text-gray-400 mt-1">Coba ubah filter atau kata kunci pencarian</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Pagination Sederhana -->
    <div class="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
      <p class="text-sm text-gray-500">Menampilkan {{ users.length }} pengguna</p>
      <div class="flex items-center gap-2">
        <button class="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50" disabled>Sebelumnya</button>
        <button class="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg shadow-sm">1</button>
        <button class="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">2</button>
        <button class="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">Selanjutnya</button>
      </div>
    </div>
  </div>
</template>
