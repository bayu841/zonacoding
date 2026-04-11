<script setup>
import { Eye, CreditCard, Calendar, ArrowUpRight, CheckCircle2, XCircle, Clock } from 'lucide-vue-next'

defineProps({
  transactions: Array
})

defineEmits(['view-detail'])

const getStatusClass = (status) => {
  const classes = {
    Sukses: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Pending: 'bg-amber-50 text-amber-700 border-amber-200',
    Gagal: 'bg-red-50 text-red-700 border-red-200'
  }
  return classes[status] || 'bg-gray-50 text-gray-700 border-gray-200'
}

const getStatusIcon = (status) => {
  if (status === 'Sukses') return CheckCircle2
  if (status === 'Pending') return Clock
  if (status === 'Gagal') return XCircle
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
                <span class="text-sm font-bold text-gray-900">{{ trx.id }}</span>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm font-bold text-gray-900">{{ trx.user }}</div>
              <div class="text-xs text-gray-400 mt-0.5">{{ trx.course }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm font-bold text-gray-900">Rp {{ trx.amount.toLocaleString('id-ID') }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="['inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border', getStatusClass(trx.status)]">
                <component :is="getStatusIcon(trx.status)" class="w-3.5 h-3.5" />
                {{ trx.status }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center gap-1.5 text-sm text-gray-500">
                <Calendar class="w-4 h-4 text-gray-400" />
                {{ trx.date }}
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
  </div>
</template>
