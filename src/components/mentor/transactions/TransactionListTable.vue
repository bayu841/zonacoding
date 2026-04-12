<script setup>
import { ArrowUpRight, CheckCircle2, Clock } from 'lucide-vue-next'

defineProps({
  transactions: {
    type: Array,
    required: true
  }
})

const formatCurrency = (value) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(value)
}
</script>

<template>
  <div class="overflow-x-auto">
    <table class="w-full text-left text-sm whitespace-nowrap">
      <thead class="text-xs text-gray-500 bg-gray-50/50 uppercase font-bold border-b border-gray-100">
        <tr>
          <th scope="col" class="px-6 py-4 rounded-tl-xl">ID Transaksi</th>
          <th scope="col" class="px-6 py-4">Deskripsi</th>
          <th scope="col" class="px-6 py-4">Tanggal</th>
          <th scope="col" class="px-6 py-4">Status</th>
          <th scope="col" class="px-6 py-4 text-right rounded-tr-xl">Nominal</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-100/80">
        <tr v-for="trx in transactions" :key="trx.id" class="hover:bg-gray-50/30 transition-colors group">
          <td class="px-6 py-4 font-mono text-gray-600">
            {{ trx.id }}
          </td>
          <td class="px-6 py-4">
            <div class="flex items-center gap-3">
              <div 
                class="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                :class="trx.type === 'payout' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'"
              >
                 <ArrowUpRight v-if="trx.type === 'payout'" class="w-4 h-4" />
                 <CheckCircle2 v-else class="w-4 h-4" />
              </div>
              <p class="font-bold text-gray-900">{{ trx.description }}</p>
            </div>
          </td>
          <td class="px-6 py-4 text-gray-600 font-medium whitespace-nowrap">
             {{ trx.date }}
          </td>
          <td class="px-6 py-4">
             <span 
              class="px-2.5 py-1 rounded-md text-xs font-bold inline-flex items-center gap-1.5"
              :class="{
                'bg-emerald-50 text-emerald-700': trx.status === 'Selesai',
                'bg-amber-50 text-amber-700': trx.status === 'Proses',
              }"
             >
                <Clock v-if="trx.status === 'Proses'" class="w-3 h-3" />
                <CheckCircle2 v-if="trx.status === 'Selesai'" class="w-3 h-3" />
                {{ trx.status }}
             </span>
          </td>
          <td class="px-6 py-4 text-right">
             <span 
               class="font-extrabold"
               :class="trx.type === 'payout' ? 'text-amber-600' : 'text-emerald-600'"
             >
               {{ trx.type === 'payout' ? '-' : '+' }} {{ formatCurrency(trx.amount) }}
             </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
