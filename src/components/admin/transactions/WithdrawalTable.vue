<script setup>
import { computed } from 'vue'
import { Calendar, Mail, User, Banknote, CreditCard, Clock, CheckCircle2, XCircle } from 'lucide-vue-next'

const props = defineProps({
  withdrawals: {
    type: Array,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['approve', 'reject'])

const formatDate = (dateString) => {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const statusClasses = {
  pending: 'bg-amber-50 text-amber-700 border-amber-100',
  approved: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  rejected: 'bg-red-50 text-red-700 border-red-100'
}

const statusText = {
  pending: 'Menunggu',
  approved: 'Disetujui',
  rejected: 'Ditolak'
}
</script>

<template>
  <div class="overflow-x-auto">
    <table class="w-full text-left border-collapse">
      <thead>
        <tr class="border-b border-gray-100">
          <th class="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Mentor</th>
          <th class="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Nominal</th>
          <th class="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Metode Payout</th>
          <th class="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
          <th class="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Tanggal</th>
          <th class="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-right">Aksi</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-50">
        <tr v-if="withdrawals.length === 0" class="hover:bg-gray-50/50 transition-colors">
          <td colspan="6" class="px-6 py-12 text-center text-gray-500 text-sm">
            Tidak ada data penarikan.
          </td>
        </tr>
        <tr v-for="w in withdrawals" :key="w.id" class="hover:bg-gray-50/50 transition-colors group">
          <!-- Mentor Info -->
          <td class="px-6 py-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold border border-indigo-100 group-hover:scale-105 transition-transform">
                {{ w.mentor_name?.charAt(0) || 'M' }}
              </div>
              <div>
                <p class="text-sm font-bold text-gray-800">{{ w.mentor_name }}</p>
                <div class="flex items-center gap-1.5 text-[10px] text-gray-400 font-medium">
                  <Mail class="w-3 h-3" />
                  {{ w.mentor_email }}
                </div>
              </div>
            </div>
          </td>

          <!-- Amount -->
          <td class="px-6 py-4">
            <p class="text-sm font-black text-gray-900">{{ w.formatted_amount }}</p>
            <p class="text-[10px] text-gray-400 font-mono tracking-tighter">ID: #{{ w.id }}</p>
          </td>

          <!-- Method Detail -->
          <td class="px-6 py-4">
            <div v-if="w.withdrawal_method === 'bank'" class="space-y-0.5">
              <div class="flex items-center gap-1.5">
                 <div class="p-1 rounded-md bg-blue-50 border border-blue-100">
                    <Banknote class="w-3 h-3 text-blue-600" />
                 </div>
                 <span class="text-xs font-bold text-gray-700 tracking-tight">{{ w.method_detail.bank_name }}</span>
              </div>
              <p class="text-[10px] text-gray-500 font-mono">{{ w.method_detail.account_number }}</p>
              <p class="text-[10px] text-gray-400 italic">a.n {{ w.method_detail.account_holder_name }}</p>
            </div>
            <div v-else class="space-y-0.5">
              <div class="flex items-center gap-1.5">
                 <div class="p-1 rounded-md bg-emerald-50 border border-emerald-100">
                    <CreditCard class="w-3 h-3 text-emerald-600" />
                 </div>
                 <span class="text-xs font-bold text-gray-700 tracking-tight uppercase">{{ w.method_detail.e_wallet_type }}</span>
              </div>
              <p class="text-[10px] text-gray-500 font-mono">{{ w.method_detail.e_wallet_number }}</p>
            </div>
          </td>

          <!-- Status -->
          <td class="px-6 py-4">
            <span 
              class="px-3 py-1.5 rounded-full text-[10px] font-bold border"
              :class="statusClasses[w.status]"
            >
              {{ statusText[w.status] }}
            </span>
          </td>

          <!-- Date -->
          <td class="px-6 py-4">
            <div class="flex items-center gap-1.5 text-[11px] text-gray-500 font-medium">
              <Clock class="w-3.5 h-3.5 text-gray-400" />
              {{ formatDate(w.requested_at) }}
            </div>
          </td>

          <!-- Actions -->
          <td class="px-6 py-4 text-right">
            <div v-if="w.status === 'pending'" class="flex items-center justify-end gap-2">
              <button 
                @click="$emit('reject', w)"
                class="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-all border border-red-100"
                title="Tolak"
              >
                <XCircle class="w-4 h-4" />
              </button>
              <button 
                @click="$emit('approve', w)"
                class="p-2 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-all border border-emerald-100"
                title="Setujui"
              >
                <CheckCircle2 class="w-4 h-4" />
              </button>
            </div>
            <div v-else class="text-[11px] text-gray-400 font-medium italic pr-2">
               Processed by {{ w.approved_by_name || 'System' }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
