<script setup>
import { Edit, Trash2, Eye, Mail, Calendar, Search, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { useImage } from '@/composables/useImage'

defineProps({
  users: Array,
  pagination: Object
})

defineEmits(['view-detail', 'view-edit', 'delete-user', 'change-page'])

const { getProxyUrl, handleImageError, isEmoji } = useImage()

const getInitials = (name) => {
  return name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '??'
}

const getRoleBadgeClass = (role) => {
  const classes = {
    admin: 'bg-purple-100 text-purple-800 border-purple-200',
    mentor: 'bg-blue-100 text-blue-800 border-blue-200',
    student: 'bg-gray-100 text-gray-800 border-gray-200'
  }
  return classes[role] || 'bg-gray-100 text-gray-800'
}

const getStatusClass = (user) => {
  return user.email_verified_at
    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
    : 'bg-gray-50 text-gray-600 border-gray-200'
}

const formatDate = (dateString) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })
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
            <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Bergabung</th>
            <th scope="col" class="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="user in users" :key="user.id" class="hover:bg-blue-50/30 transition-colors duration-200">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center gap-3">
                <div class="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center font-semibold shadow-sm overflow-hidden">
                  <template v-if="user.avatar && isEmoji(user.avatar)">
                    <span class="text-xl">{{ user.avatar.includes('/storage/') ? user.avatar.split('/').pop() : user.avatar }}</span>
                  </template>
                  <img v-else-if="user.avatar" :src="getProxyUrl(user.avatar)" :alt="user.name" class="w-full h-full object-cover" @error="handleImageError" />
                  <span v-else>{{ getInitials(user.name) }}</span>
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
              <div class="text-sm text-gray-600 flex items-center gap-1">
                <Calendar class="w-3.5 h-3.5 text-gray-400" />
                {{ formatDate(user.created_at) }}
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

    <!-- Pagination -->
    <div v-if="pagination && pagination.last_page > 1" class="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/30">
      <p class="text-sm text-gray-500">
        Menampilkan <span class="font-medium text-gray-700">{{ users.length }}</span> dari <span class="font-medium text-gray-700">{{ pagination.total }}</span> pengguna
      </p>
      <div class="flex items-center gap-2">
        <button 
          @click="$emit('change-page', pagination.current_page - 1)"
          :disabled="pagination.current_page === 1"
          class="p-2 text-gray-600 hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-200 rounded-lg transition-all disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:shadow-none"
        >
          <ChevronLeft class="w-4 h-4" />
        </button>
        
        <div class="flex items-center gap-1">
          <span class="text-xs text-gray-400 px-2">Halaman</span>
          <span class="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-md">{{ pagination.current_page }}</span>
          <span class="text-xs text-gray-400 px-2">dari {{ pagination.last_page }}</span>
        </div>

        <button 
          @click="$emit('change-page', pagination.current_page + 1)"
          :disabled="pagination.current_page === pagination.last_page"
          class="p-2 text-gray-600 hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-200 rounded-lg transition-all disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:shadow-none"
        >
          <ChevronRight class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>

