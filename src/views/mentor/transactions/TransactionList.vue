<script setup>
import { ref, computed, onMounted } from 'vue'
import { Receipt, Search, Filter, ArrowDownToLine, Wallet, TrendingUp, Building2, CreditCard, ChevronRight, AlertCircle, CheckCircle2 } from 'lucide-vue-next'
import TransactionListTable from '../../../components/mentor/transactions/TransactionListTable.vue'
import BaseModal from '../../../components/shared/BaseModal.vue'
import IncomeChart from '../../../components/mentor/transactions/IncomeChart.vue'
import { getIncomeStatistics, getWithdrawalHistory, requestWithdrawal } from '@/api/revenue'

const searchQuery = ref('')
const filterType = ref('all') // 'all', 'income', 'payout'
const loading = ref(true)
const isSubmitting = ref(false)
const incomeStats = ref(null)
const withdrawalHistory = ref([])

const transactions = ref([])

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

const incomeChartData = computed(() => {
  if (!incomeStats.value?.monthly_income) return null
  
  return {
    labels: incomeStats.value.monthly_income.map(item => item.month),
    datasets: [
      {
        label: 'Pendapatan',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        borderColor: '#6366f1',
        data: incomeStats.value.monthly_income.map(item => item.income),
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#fff',
        pointBorderWidth: 2,
      }
    ]
  }
})

const isWithdrawModalOpen = ref(false)
const isSuccessModalOpen = ref(false)
const withdrawStep = ref(1)
const selectedBank = ref('BRI')
const withdrawAmount = ref(0)
const accountNumber = ref('')
const accountHolderName = ref('')

const openWithdrawModal = () => {
    withdrawAmount.value = parseFloat(incomeStats.value?.current_balance || 0)
    isWithdrawModalOpen.value = true
}

const confirmWithdrawal = async () => {
    if (!accountNumber.value || !accountHolderName.value) {
      alert('Mohon lengkapi data nomor rekening dan nama pemilik.')
      return
    }

    if (withdrawAmount.value < 50000) {
      alert('Minimal penarikan adalah Rp 50.000')
      return
    }

    if (withdrawAmount.value > parseFloat(incomeStats.value?.current_balance || 0)) {
      alert('Saldo tidak mencukupi untuk nominal penarikan ini.')
      return
    }

    isSubmitting.value = true
    try {
      const payload = {
        amount: withdrawAmount.value,
        withdrawal_method: ['BRI', 'BCA', 'Mandiri'].includes(selectedBank.value) ? 'bank' : 'e_wallet',
        bank_name: selectedBank.value,
        account_number: accountNumber.value,
        account_holder_name: accountHolderName.value
      }

      const res = await requestWithdrawal(payload)
      if (res.status) {
        isWithdrawModalOpen.value = false
        isSuccessModalOpen.value = true
        // Refresh data
        fetchStats()
      }
    } catch (err) {
      console.error('Withdrawal error:', err)
      alert(err.message || 'Terjadi kesalahan saat menarik saldo.')
    } finally {
      isSubmitting.value = false
    }
}

const formatCurrency = (value) => {
  if (typeof value === 'string' && value.includes('Rp')) return value
  return new Intl.NumberFormat('id-ID', {
    style: 'currency', currency: 'IDR', minimumFractionDigits: 0
  }).format(value)
}

const fetchStats = async () => {
  loading.value = true
  try {
    const [statsRes, historyRes] = await Promise.all([
      getIncomeStatistics(),
      getWithdrawalHistory()
    ])
    
    if (statsRes.status) {
      incomeStats.value = statsRes.data
    }
    
    if (historyRes.status) {
      console.log('Withdrawal history raw:', historyRes.data.withdrawals)
      withdrawalHistory.value = historyRes.data.withdrawals
      // Map withdrawal history to transactions table format
      transactions.value = historyRes.data.withdrawals.map(w => ({
        id: `WD-${w.id.toString().padStart(5, '0')}`,
        description: `Penarikan Dana (${w.withdrawal_method.toUpperCase()}) - ${w.method_detail}`,
        date: new Date(w.requested_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
        status: w.status === 'approved' ? 'Selesai' : (w.status === 'rejected' ? 'Ditolak' : 'Proses'),
        amount: parseFloat(w.amount),
        type: 'payout'
      }))
      console.log('Mapped transactions:', transactions.value)
    }
  } catch (err) {
    console.error('Fetch transaction data error:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchStats()
})
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
          <h2 class="text-3xl font-black">{{ formatCurrency(incomeStats?.formatted_balance || 0) }}</h2>
          <div class="inline-flex items-center gap-1 px-2 py-0.5 bg-white/20 rounded-md text-[10px] font-bold mt-2">
            <TrendingUp class="w-3 h-3" /> +0% dari bulan lalu
          </div>
        </div>

        <button @click="openWithdrawModal" class="relative z-10 w-full py-3 bg-white text-emerald-700 font-black rounded-2xl shadow-lg hover:bg-emerald-50 transition-all flex items-center justify-center gap-2 group">
          <ArrowDownToLine class="w-5 h-5 transition-transform group-hover:translate-y-0.5" />
          Tarik Saldo Sekarang
        </button>
      </div>

      <!-- Monthly Analytics Chart -->
      <div class="lg:col-span-2">
        <IncomeChart :data="incomeChartData" />
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
        <div class="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 space-y-3">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">Saldo Tersedia</p>
              <p class="text-sm font-black text-emerald-900">{{ formatCurrency(incomeStats?.current_balance || 0) }}</p>
            </div>
            <AlertCircle class="w-6 h-6 text-emerald-500/30" />
          </div>
          
          <div class="space-y-1.5 pt-2 border-t border-emerald-100">
            <label class="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Nominal Penarikan</label>
            <div class="relative">
              <span class="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-emerald-700">Rp</span>
              <input 
                v-model.number="withdrawAmount"
                type="number" 
                class="w-full pl-10 pr-4 py-3 bg-white border border-emerald-200 rounded-xl text-lg font-black text-emerald-900 outline-none focus:ring-2 focus:ring-emerald-500/20"
                :max="incomeStats?.current_balance"
              />
            </div>
            <p class="text-[10px] font-medium text-emerald-600 mt-1">* Minimal penarikan Rp 50.000</p>
          </div>
        </div>

        <div class="space-y-4">
          <label class="text-xs font-bold text-gray-500 uppercase tracking-wider">Metode Penarikan</label>
          
          <!-- Bank Selection -->
          <div class="grid grid-cols-3 gap-2">
            <div 
              v-for="bank in ['BRI', 'BCA', 'Mandiri']" 
              :key="bank"
              @click="selectedBank = bank"
              class="p-3 border rounded-xl cursor-pointer text-center transition-all"
              :class="selectedBank === bank ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-100' : 'border-gray-100 bg-gray-50 hover:bg-white'"
            >
              <p class="text-xs font-bold uppercase">{{ bank }}</p>
            </div>
          </div>

          <!-- E-Wallet Selection -->
          <div class="grid grid-cols-4 gap-2">
            <div 
              v-for="wallet in ['gopay', 'ovo', 'dana', 'shopeepay']" 
              :key="wallet"
              @click="selectedBank = wallet"
              class="p-2 border rounded-xl cursor-pointer text-center transition-all"
              :class="selectedBank === wallet ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-100' : 'border-gray-100 bg-gray-50 hover:bg-white'"
            >
              <p class="text-[10px] font-bold uppercase">{{ wallet }}</p>
            </div>
          </div>
        </div>

        <!-- Account Details -->
        <div class="space-y-3">
          <div class="space-y-1">
            <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Nomor Rekening / HP</label>
            <input 
              v-model="accountNumber"
              type="text" 
              placeholder="Contoh: 1234567890" 
              class="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
          <div class="space-y-1">
            <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Nama Pemilik Rekening</label>
            <input 
              v-model="accountHolderName"
              type="text" 
              placeholder="Masukkan nama lengkap" 
              class="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
        </div>

        <div class="flex gap-3 pt-2">
          <button @click="isWithdrawModalOpen = false" class="flex-1 py-3 text-sm font-bold text-gray-500 bg-gray-50 rounded-xl hover:bg-gray-100">Batal</button>
          <button 
            @click="confirmWithdrawal" 
            :disabled="isSubmitting"
            class="flex-[2] py-3 text-sm font-bold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 shadow-lg shadow-emerald-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <span v-if="isSubmitting" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            {{ isSubmitting ? 'Memproses...' : 'Konfirmasi Tarik Dana' }}
          </button>
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

