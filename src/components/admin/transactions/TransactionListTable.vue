<script setup>
import { Eye, CreditCard, Calendar, ArrowUpRight, CheckCircle2, XCircle, Clock } from 'lucide-vue-next'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

defineProps({
  transactions: Array,
  pagination: Object
})

defineEmits(['view-detail', 'change-page'])

const getStatusClass = (status) => {
  const s = status ? status.toLowerCase() : 'pending'
  const classes = {
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    pending: 'bg-amber-50 text-amber-700 border-amber-200',
    failed: 'bg-red-50 text-red-700 border-red-200',
    expired: 'bg-gray-100 text-gray-700 border-gray-200'
  }
  return classes[s] || 'bg-gray-50 text-gray-700 border-gray-200'
}

const getStatusIcon = (status) => {
  const s = status ? status.toLowerCase() : 'pending'
  if (s === 'success') return CheckCircle2
  if (s === 'pending') return Clock
  if (s === 'failed') return XCircle
  return Clock
}
</script>

<template>
  <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-100">
        <thead>
          <tr class="bg-gray-50/80">
            <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">ID Invoice</th>
            <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Pelanggan & Kursus</th>
            <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Jumlah (IDR)</th>
            <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
            <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Tanggal</th>
            <th scope="col" class="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="trx in transactions" :key="trx.id" class="hover:bg-indigo-50/30 transition-colors duration-200 group">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 border border-indigo-100 group-hover:rotate-6 transition-transform">
                  <CreditCard class="w-4 h-4" />
                </div>
                <span class="text-sm font-bold text-gray-900">{{ trx.invoice_number }}</span>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm font-bold text-gray-900">{{ trx.customer?.name }}</div>
              <div class="text-xs text-gray-400 mt-0.5 truncate max-w-[200px]" :title="trx.course?.title">{{ trx.course?.title }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm font-bold text-gray-900">{{ trx.gross_amount_formatted }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="['inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border capitalize', getStatusClass(trx.status)]">
                <component :is="getStatusIcon(trx.status)" class="w-3.5 h-3.5" />
                {{ trx.status }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center gap-1.5 text-sm text-gray-500">
                <Calendar class="w-4 h-4 text-gray-400" />
                {{ trx.created_at }}
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button
                @click="$emit('view-detail', trx)"
                class="inline-flex items-center gap-2 px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-200 group/btn"
              >
                <Eye class="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                Detail
                <ArrowUpRight class="w-3 h-3 opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5 transition-all" />
              </button>
            </td>
          </tr>
          <!-- Empty State -->
          <tr v-if="transactions.length === 0">
            <td colspan="6" class="px-6 py-16 text-center">
              <div class="flex flex-col items-center justify-center">
                <div class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                  <CreditCard class="w-6 h-6 text-gray-300" />
                </div>
                <p class="text-gray-600 font-bold">Tidak ada transaksi ditemukan</p>
                <p class="text-sm text-gray-400 mt-1">Coba gunakan filter atau kata kunci yang berbeda.</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination Footer -->
    <div v-if="pagination && pagination.last_page > 1" class="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/30">
      <p class="text-sm text-gray-500">
        Menampilkan <span class="font-medium text-gray-700">{{ transactions.length }}</span> dari <span class="font-medium text-gray-700">{{ pagination.total }}</span> transaksi
      </p>
      <div class="flex items-center gap-2">
        <button
          @click="$emit('change-page', pagination.current_page - 1)"
          :disabled="pagination.current_page === 1"
          class="p-2 text-gray-600 hover:bg-white border border-transparent rounded-lg transition-all disabled:opacity-40"
        >
          <ChevronLeft class="w-4 h-4" />
        </button>
        <span class="text-xs text-gray-400 font-bold uppercase tracking-widest">{{ pagination.current_page }} / {{ pagination.last_page }}</span>
        <button
          @click="$emit('change-page', pagination.current_page + 1)"
          :disabled="pagination.current_page === pagination.last_page"
          class="p-2 text-gray-600 hover:bg-white border border-transparent rounded-lg transition-all disabled:opacity-40"
        >
          <ChevronRight class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>
