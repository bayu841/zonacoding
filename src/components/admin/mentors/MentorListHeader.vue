<script setup>
import { Search, Filter, UserCheck, Plus } from 'lucide-vue-next'

defineProps({
  searchQuery: String,
  filterStatus: String
})

defineEmits(['update:searchQuery', 'update:filterStatus'])
</script>

<template>
  <div class="space-y-6">
    <!-- Header with title and verification button -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h2 class="text-2xl font-bold text-gray-800 flex items-center">
          <span class="w-1.5 h-7 bg-gradient-to-b from-indigo-500 to-indigo-600 rounded-full mr-3"></span>
          Manajemen Mentor
        </h2>
        <p class="text-sm text-gray-500 mt-1">Kelola instruktur dan ahli industri NextSkill</p>
      </div>
      <router-link
        to="/admin/mentors/verification"
        class="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-indigo-600 border border-indigo-200 font-medium py-2.5 px-5 rounded-xl shadow-sm transition-all duration-200"
      >
        <UserCheck class="w-4 h-4" />
        Permintaan Verifikasi
      </router-link>
    </div>

    <!-- Filter Bar -->
    <div class="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white/50 backdrop-blur-sm p-2 rounded-2xl border border-gray-100">
      <div class="flex flex-col sm:flex-row flex-1 gap-3 w-full">
        <!-- Search Input -->
        <div class="relative flex-1 sm:max-w-md">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            :value="searchQuery"
            @input="$emit('update:searchQuery', $event.target.value)"
            placeholder="Cari nama atau email mentor..."
            class="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-shadow shadow-sm"
          />
        </div>

        <!-- Status Filter -->
        <div class="relative min-w-[160px]">
          <select
            :value="filterStatus"
            @change="$emit('update:filterStatus', $event.target.value)"
            class="w-full appearance-none pl-4 pr-9 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 shadow-sm cursor-pointer"
          >
            <option value="all">Semua Status</option>
            <option value="Verified">Verified</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
          </select>
          <Filter class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>
    </div>
  </div>
</template>
