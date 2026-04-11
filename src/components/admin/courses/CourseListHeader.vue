<script setup>
import { Search, Filter, Grid, List, Plus } from 'lucide-vue-next'

defineProps({
  searchQuery: String,
  filterStatus: String,
  filterCategory: String,
  viewMode: String
})

defineEmits(['update:searchQuery', 'update:filterStatus', 'update:filterCategory', 'update:viewMode'])
</script>

<template>
  <div class="space-y-6">
    <!-- Header with title and add button -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h2 class="text-2xl font-bold text-gray-800 flex items-center">
          <span class="w-1.5 h-7 bg-gradient-to-b from-indigo-500 to-indigo-600 rounded-full mr-3"></span>
          Manajemen Kursus
        </h2>
        <p class="text-sm text-gray-500 mt-1">Kelola kurikulum dan konten pembelajaran NextSkill</p>
      </div>
      <router-link
        to="/admin/courses/create"
        class="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
      >
        <Plus class="w-4 h-4" />
        Tambah Kursus
      </router-link>
    </div>

    <!-- Filter Bar & View Toggle -->
    <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <div class="flex flex-col sm:flex-row flex-1 gap-3 w-full">
        <!-- Search Input -->
        <div class="relative flex-1 sm:max-w-xs">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            :value="searchQuery"
            @input="$emit('update:searchQuery', $event.target.value)"
            placeholder="Cari judul kursus..."
            class="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-shadow shadow-sm"
          />
        </div>

        <!-- Status Filter -->
        <div class="relative min-w-[140px]">
          <select
            :value="filterStatus"
            @change="$emit('update:filterStatus', $event.target.value)"
            class="w-full appearance-none pl-4 pr-9 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 shadow-sm cursor-pointer"
          >
            <option value="all">Semua Status</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
          </select>
          <Filter class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

        <!-- Category Filter -->
        <div class="relative min-w-[160px]">
          <select
            :value="filterCategory"
            @change="$emit('update:filterCategory', $event.target.value)"
            class="w-full appearance-none pl-4 pr-9 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 shadow-sm cursor-pointer"
          >
            <option value="all">Semua Kategori</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Design">Design</option>
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
            viewMode === 'table' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
          ]"
          title="Tampilan Tabel"
        >
          <List class="w-4 h-4" />
        </button>
        <button
          @click="$emit('update:viewMode', 'grid')"
          :class="[
            'p-2 rounded-lg transition-colors',
            viewMode === 'grid' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
          ]"
          title="Tampilan Kartu"
        >
          <Grid class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>
