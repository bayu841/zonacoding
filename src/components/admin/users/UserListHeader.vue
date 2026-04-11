<script setup>
import { Search, Filter, Grid, List, UserPlus } from 'lucide-vue-next'

defineProps({
  filterRole: String,
  searchQuery: String,
  viewMode: String
})

defineEmits(['update:filterRole', 'update:searchQuery', 'update:viewMode', 'open-create'])
</script>

<template>
  <div class="space-y-6">
    <!-- Header dengan judul dan tombol tambah -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h2 class="text-2xl font-bold text-gray-800 flex items-center">
          <span class="w-1.5 h-7 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full mr-3"></span>
          Manajemen Pengguna
        </h2>
        <p class="text-sm text-gray-500 mt-1">Kelola semua akun pengguna platform NextSkill</p>
      </div>
      <button
        @click="$emit('open-create')"
        class="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
      >
        <UserPlus class="w-4 h-4" />
        Tambah Pengguna
      </button>
    </div>

    <!-- Filter Bar & View Toggle -->
    <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <div class="flex flex-1 gap-3 w-full sm:w-auto">
        <!-- Search Input -->
        <div class="relative flex-1 sm:max-w-xs">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            :value="searchQuery"
            @input="$emit('update:searchQuery', $event.target.value)"
            placeholder="Cari nama atau email..."
            class="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-shadow shadow-sm"
          />
        </div>
        <!-- Role Filter -->
        <div class="relative">
          <select
            :value="filterRole"
            @change="$emit('update:filterRole', $event.target.value)"
            class="appearance-none pl-4 pr-9 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-200 focus:border-blue-400 shadow-sm cursor-pointer"
          >
            <option value="all">Semua Peran</option>
            <option value="student">Siswa</option>
            <option value="mentor">Mentor</option>
            <option value="admin">Admin</option>
          </select>
          <Filter class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      <!-- View Toggle Buttons -->
      <div class="flex items-center gap-1 p-1 bg-gray-100 rounded-xl">
        <button
          @click="$emit('update:viewMode', 'table')"
          :class="[
            'p-2 rounded-lg transition-colors',
            viewMode === 'table' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
          ]"
          title="Tampilan Tabel"
        >
          <List class="w-4 h-4" />
        </button>
        <button
          @click="$emit('update:viewMode', 'grid')"
          :class="[
            'p-2 rounded-lg transition-colors',
            viewMode === 'grid' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
          ]"
          title="Tampilan Kartu"
        >
          <Grid class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>
