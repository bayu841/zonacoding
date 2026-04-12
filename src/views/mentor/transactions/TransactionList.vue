<script setup>
import { ref, computed } from 'vue'
import { Receipt, Search, Filter, ArrowDownToLine, Wallet, TrendingUp, Building2, CreditCard, ChevronRight, AlertCircle, CheckCircle2 } from 'lucide-vue-next'
import TransactionListTable from '../../../components/mentor/transactions/TransactionListTable.vue'
import BaseModal from '../../../components/shared/BaseModal.vue'

import IncomeChart from '../../../components/mentor/transactions/IncomeChart.vue'

const searchQuery = ref('')
const filterType = ref('all') // 'all', 'income', 'payout'
const transactions = ref([
  { id: 'TRX-10928', description: 'Pembagian Hasil: Mastering Go Lang', date: '11 Apr 2026', status: 'Selesai', amount: 3500000, type: 'income' },
  { id: 'TRX-10925', description: 'Penarikan Dana ke Mandiri', date: '08 Apr 2026', status: 'Selesai', amount: 5000000, type: 'payout' },
  { id: 'TRX-10892', description: 'Pembagian Hasil: Next.js Advanced', date: '05 Apr 2026', status: 'Selesai', amount: 1500000, type: 'income' },
  { id: 'TRX-10885', description: 'Penarikan Dana ke Mandiri', date: '01 Apr 2026', status: 'Selesai', amount: 2000000, type: 'payout' },
  { id: 'TRX-10850', description: 'Pembagian Hasil: UI/UX Premium', date: '28 Mar 2026', status: 'Selesai', amount: 3000000, type: 'income' }
])

const filteredTransactions = computed(() => {
  let result = transactions.value
  if (filterType.value !== 'all') result = result.filter(t => t.type === filterType.value)
  if (searchQuery.value) {
    result = result.filter(t => 
      t.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      t.id.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
  return result
})

const isWithdrawModalOpen = ref(false)
const isSuccessModalOpen = ref(false)
const withdrawStep = ref(1)
const selectedBank = ref('mandiri')
const withdrawAmount = ref(2500000)

const openWithdrawModal = () => {
    isWithdrawModalOpen.value = true
}

const confirmWithdrawal = () => {
    isWithdrawModalOpen.value = false
    transactions.value.unshift({
        id: 'TRX-' + Math.floor(Math.random() * 90000 + 10000),
        description: `Penarikan Dana ke ${selectedBank.value.toUpperCase()}`,
        date: 'Hari Ini',
        status: 'Proses',
        amount: withdrawAmount.value,
        type: 'payout'
    })
    setTimeout(() => { isSuccessModalOpen.value = true }, 400)
}

const formatCurrency = (value) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency', currency: 'IDR', minimumFractionDigits: 0
  }).format(value)
}
</script>

<template>
  <div class="space-y-6 max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
    <!-- Header with Balance and Stats -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Balance Card -->
      <div class="lg:col-span-1 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-6 text-white shadow-xl shadow-emerald-200/50 relative overflow-hidden flex flex-col justify-between min-h-[220px]">
        <div class="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <div class="absolute right-12 bottom-12 w-16 h-16 bg-emerald-400/20 rounded-full blur-xl"></div>
        
        <div class="relative z-10">
          <div class="flex items-center gap-2 opacity-80 mb-1">
            <Wallet class="w-4 h-4" />
            <span class="text-xs font-bold uppercase tracking-widest">Saldo Penghasilan</span>
          </div>
          <h2 class="text-3xl font-black">{{ formatCurrency(2500000) }}</h2>
          <div class="inline-flex items-center gap-1 px-2 py-0.5 bg-white/20 rounded-md text-[10px] font-bold mt-2">
            <TrendingUp class="w-3 h-3" /> +12% dari bulan lalu
          </div>
        </div>

        <button @click="openWithdrawModal" class="relative z-10 w-full py-3 bg-white text-emerald-700 font-black rounded-2xl shadow-lg hover:bg-emerald-50 transition-all flex items-center justify-center gap-2 group">
          <ArrowDownToLine class="w-5 h-5 transition-transform group-hover:translate-y-0.5" />
          Tarik Saldo Sekarang
        </button>
      </div>

      <!-- Monthly Analytics Chart -->
      <div class="lg:col-span-2">
        <IncomeChart />
      </div>
    </div>

    <!-- Table Section -->
    <div class="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
      <div class="p-6 border-b border-gray-50 flex flex-col md:flex-row gap-4 items-center justify-between">
        <h3 class="font-bold text-gray-800">Riwayat Transaksi</h3>
        <div class="flex items-center gap-3 w-full md:w-auto">
          <div class="relative flex-1 md:w-64">
            <Search class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input v-model="searchQuery" type="text" placeholder="Cari..." class="w-full pl-9 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20" />
          </div>
          <select v-model="filterType" class="bg-gray-50 border-none rounded-xl text-xs font-bold px-3 py-2 outline-none">
            <option value="all">Semua</option>
            <option value="income">Masuk</option>
            <option value="payout">Keluar</option>
          </select>
        </div>
      </div>

      <div class="p-2">
        <TransactionListTable v-if="filteredTransactions.length > 0" :transactions="filteredTransactions" />
      </div>
    </div>

    <!-- Enhanced Payout Modal -->
    <BaseModal :is-open="isWithdrawModalOpen" @close="isWithdrawModalOpen = false" title="Penarikan Penghasilan" size="md">
      <div v-if="withdrawStep === 1" class="space-y-6 pt-4">
        <div class="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center justify-between">
          <div>
            <p class="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">Saldo Tersedia</p>
            <p class="text-2xl font-black text-emerald-900">{{ formatCurrency(2500000) }}</p>
          </div>
          <AlertCircle class="w-8 h-8 text-emerald-500/30" />
        </div>

        <div class="space-y-3">
          <label class="text-xs font-bold text-gray-500 uppercase tracking-wider">Metode Penarikan</label>
          <div 
            @click="selectedBank = 'mandiri'"
            class="flex items-center gap-4 p-4 border rounded-2xl cursor-pointer transition-all"
            :class="selectedBank === 'mandiri' ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-100' : 'border-gray-100 hover:bg-gray-50'"
          >
            <div class="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center border border-gray-100">
               <Building2 class="text-blue-900 w-5 h-5" />
            </div>
            <div class="flex-1">
              <p class="text-sm font-bold text-gray-800">Bank Mandiri</p>
              <p class="text-[10px] text-gray-500 font-mono">**** **** 9012</p>
            </div>
            <div v-if="selectedBank === 'mandiri'" class="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
              <CheckCircle2 class="text-white w-3.5 h-3.5" />
            </div>
          </div>
          <div 
            @click="selectedBank = 'gopay'"
            class="flex items-center gap-4 p-4 border rounded-2xl cursor-pointer transition-all opacity-50 grayscale hover:grayscale-0"
            :class="selectedBank === 'gopay' ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-100' : 'border-gray-100'"
          >
            <div class="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center border border-gray-100">
               <CreditCard class="text-emerald-500 w-5 h-5" />
            </div>
            <div class="flex-1">
              <p class="text-sm font-bold text-gray-800">GoPay Business</p>
              <p class="text-[10px] text-gray-500 font-mono">0812 **** 5678</p>
            </div>
          </div>
        </div>

        <div class="flex gap-3 pt-2">
          <button @click="isWithdrawModalOpen = false" class="flex-1 py-3 text-sm font-bold text-gray-500 bg-gray-50 rounded-xl hover:bg-gray-100">Batal</button>
          <button @click="confirmWithdrawal" class="flex-[2] py-3 text-sm font-bold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 shadow-lg shadow-emerald-200">Konfirmasi Tarik Dana</button>
        </div>
      </div>
    </BaseModal>

    <!-- Success Modal -->
    <BaseModal :is-open="isSuccessModalOpen" @close="isSuccessModalOpen = false" title="Gaji Berhasil Dicairkan!" type="success">
      <div class="text-center py-4">
        <div class="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
          <ArrowDownToLine class="w-10 h-10" />
        </div>
        <p class="text-sm text-gray-600 leading-relaxed px-4">Dana sebesar **{{ formatCurrency(withdrawAmount) }}** sedang diproses menuju rekening **{{ selectedBank.toUpperCase() }}** Anda. Estimasi tiba dalam 12-24 jam.</p>
        <button @click="isSuccessModalOpen = false" class="mt-6 w-full py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-colors">Tutup</button>
      </div>
    </BaseModal>
  </div>
</template>

