<script setup>
import { Search, Filter, Download } from 'lucide-vue-next'

defineProps({
  searchQuery: String,
  filterStatus: String
})

defineEmits(['update:searchQuery', 'update:filterStatus', 'export'])
</script>

<template>
  <div class="space-y-6">
    <!-- Header with title and export button -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h2 class="text-2xl font-bold text-gray-800 flex items-center">
          <span class="w-1.5 h-7 bg-gradient-to-b from-indigo-500 to-indigo-600 rounded-full mr-3"></span>
          Riwayat Transaksi
        </h2>
        <p class="text-sm text-gray-500 mt-1">Pantau semua aktivitas pembayaran dan pemasukan</p>
      </div>
      <button
        @click="$emit('export')"
        class="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
      >
        <Download class="w-4 h-4" />
        Ekspor Laporan
      </button>
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
            placeholder="Cari ID Invoice atau nama pelanggan..."
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
            <option value="Sukses">Sukses</option>
            <option value="Pending">Pending</option>
            <option value="Gagal">Gagal</option>
          </select>
          <Filter class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>
    </div>
  </div>
</template>
