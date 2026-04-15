<script setup>
import { ref, onMounted, computed } from 'vue'
import { Search, Filter, RefreshCcw, AlertCircle } from 'lucide-vue-next'
import { getMentorWithdrawals, approveWithdrawal, rejectWithdrawal } from '@/api/withdrawal'
import WithdrawalTable from '../../../components/admin/transactions/WithdrawalTable.vue'
import BaseModal from '../../../components/shared/BaseModal.vue'
import { useAlert } from '@/composables/useAlert'

const { showAlert } = useAlert()
const withdrawals = ref([])
const loading = ref(false)
const filterStatus = ref('all')
const searchQuery = ref('')

const isRejectModalOpen = ref(false)
const selectedWithdrawal = ref(null)
const rejectionReason = ref('')
const isProcessing = ref(false)

const fetchWithdrawals = async () => {
  loading.value = true
  try {
    const params = {
      status: filterStatus.value !== 'all' ? filterStatus.value : undefined,
      search: searchQuery.value || undefined
    }
    const res = await getMentorWithdrawals(params)
    if (res.status) {
      withdrawals.value = res.data.withdrawals
    }
  } catch (err) {
    console.error('Fetch error:', err)
    showAlert('Gagal', 'Terjadi kesalahan saat mengambil data penarikan.', 'error')
  } finally {
    loading.value = false
  }
}

const handleApprove = async (w) => {
  if (!confirm(`Setujui penarikan ${w.formatted_amount} untuk ${w.mentor_name}?`)) return
  
  try {
    const payload = {
      amount: w.amount,
      withdrawal_method: w.withdrawal_method,
      ...(w.withdrawal_method === 'bank' ? {
        bank_name: w.method_detail.bank_name,
        account_number: w.method_detail.account_number,
        account_holder_name: w.method_detail.account_holder_name
      } : {
        e_wallet_type: w.method_detail.e_wallet_type,
        e_wallet_number: w.method_detail.e_wallet_number
      })
    }
    const res = await approveWithdrawal(w.id, payload)
    if (res.status) {
      showAlert('Berhasil', 'Penarikan telah disetujui.', 'success')
      fetchWithdrawals()
    }
  } catch (err) {
    showAlert('Gagal', err.message || 'Gagal menyetujui penarikan.', 'error')
  }
}

const openRejectModal = (w) => {
  selectedWithdrawal.value = w
  rejectionReason.value = ''
  isRejectModalOpen.value = true
}

const handleReject = async () => {
  if (!rejectionReason.value) {
    alert('Mohon masukkan alasan penolakan.')
    return
  }

  isProcessing.value = true
  try {
    const res = await rejectWithdrawal(selectedWithdrawal.value.id, {
      rejection_reason: rejectionReason.value
    })
    if (res.status) {
      isRejectModalOpen.value = false
      showAlert('Berhasil', 'Penarikan telah ditolak.', 'success')
      fetchWithdrawals()
    }
  } catch (err) {
    showAlert('Gagal', err.message || 'Gagal menolak penarikan.', 'error')
  } finally {
    isProcessing.value = false
  }
}

onMounted(() => {
  fetchWithdrawals()
})
</script>

<template>
  <div class="space-y-6">
    <!-- Header & Filters -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-black text-gray-900 tracking-tight">Penarikan Mentor</h1>
        <p class="text-sm text-gray-500 mt-1">Kelola dan tinjau semua permintaan penarikan saldo dari mentor.</p>
      </div>

      <div class="flex items-center gap-3">
        <button 
          @click="fetchWithdrawals" 
          class="p-2.5 bg-white border border-gray-100 rounded-xl text-gray-500 hover:text-indigo-600 transition-all shadow-sm group"
          :class="{ 'animate-spin': loading }"
        >
          <RefreshCcw class="w-5 h-5 group-active:rotate-180 transition-transform duration-500" />
        </button>
      </div>
    </div>

    <!-- Filters Bar -->
    <div class="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
      <div class="relative flex-1 w-full">
        <Search class="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input 
          v-model="searchQuery"
          @input="fetchWithdrawals"
          type="text" 
          placeholder="Cari mentor, email, atau ID penarikan..." 
          class="w-full pl-11 pr-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all"
        />
      </div>

      <div class="flex items-center gap-2 w-full md:w-auto">
        <div class="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100/50">
          <Filter class="w-3.5 h-3.5 text-gray-400" />
          <select 
            v-model="filterStatus" 
            @change="fetchWithdrawals"
            class="bg-transparent border-none text-xs font-bold text-gray-600 outline-none focus:ring-0 pr-8"
          >
            <option value="all">Semua Status</option>
            <option value="pending">Menunggu</option>
            <option value="approved">Disetujui</option>
            <option value="rejected">Ditolak</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Table Section -->
    <div class="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
      <div v-if="loading" class="flex flex-col items-center justify-center py-24 gap-4">
        <div class="w-10 h-10 border-4 border-indigo-500/20 border-t-indigo-600 rounded-full animate-spin"></div>
        <p class="text-sm font-bold text-gray-400 animate-pulse">Memuat data penarikan...</p>
      </div>
      <WithdrawalTable 
        v-else
        :withdrawals="withdrawals"
        @approve="handleApprove"
        @reject="openRejectModal"
      />
    </div>

    <!-- Rejection Modal -->
    <BaseModal 
      :is-open="isRejectModalOpen" 
      @close="isRejectModalOpen = false"
      title="Tolak Penarikan"
      size="md"
    >
      <div class="space-y-4 pt-4">
        <div class="p-4 bg-red-50 rounded-2xl border border-red-100 flex items-start gap-4">
          <div class="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm border border-red-100 flex-shrink-0">
            <AlertCircle class="w-5 h-5 text-red-600" />
          </div>
          <div>
            <p class="text-sm font-bold text-red-900">Konfirmasi Penolakan</p>
            <p class="text-xs text-red-700 mt-0.5 leading-relaxed">
              Anda akan menolak penarikan sebesar <strong>{{ selectedWithdrawal?.formatted_amount }}</strong> untuk <strong>{{ selectedWithdrawal?.mentor_name }}</strong>.
              Mohon berikan alasan penolakan agar mentor dapat memperbaikinya.
            </p>
          </div>
        </div>

        <div class="space-y-2">
          <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Alasan Penolakan</label>
          <textarea 
            v-model="rejectionReason"
            placeholder="Contoh: Nomor rekening tidak valid atau data e-wallet tidak ditemukan."
            class="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-red-500/20 min-h-[120px] resize-none"
          ></textarea>
        </div>

        <div class="flex gap-3 pt-2">
          <button 
            @click="isRejectModalOpen = false" 
            class="flex-1 py-3 text-sm font-bold text-gray-500 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
          >
            Batal
          </button>
          <button 
            @click="handleReject"
            :disabled="isProcessing"
            class="flex-[2] py-3 text-sm font-bold text-white bg-red-600 rounded-xl hover:bg-red-700 shadow-lg shadow-red-200 transition-all disabled:opacity-50"
          >
            {{ isProcessing ? 'Memproses...' : 'Tolak Penarikan' }}
          </button>
        </div>
      </div>
    </BaseModal>
  </div>
</template>
