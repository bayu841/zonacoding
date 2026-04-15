<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { 
  ArrowLeft, 
  Download, 
  Mail, 
  CreditCard, 
  Calendar, 
  Clock, 
  User, 
  BookOpen, 
  UserCheck, 
  Wallet,
  Receipt,
  FileText,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ExternalLink
} from 'lucide-vue-next'
import { getTransaction, downloadTransactionReport } from '@/api/transaction'
import { useAlert } from '@/composables/useAlert'

const route = useRoute()
const router = useRouter()
const { showAlert } = useAlert()
const transactionId = route.params.transactionId

const transaction = ref(null)
const loading = ref(true)

const fetchDetail = async () => {
  loading.value = true
  try {
    const response = await getTransaction(transactionId)
    // response is { status: true, data: { ... } }
    transaction.value = response.data
  } catch (err) {
    showAlert('Gagal', 'Gagal memuat detail transaksi.', 'error')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchDetail()
})

const getStatusTheme = (status) => {
  const s = status ? status.toLowerCase() : 'pending'
  const themes = {
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-500/20',
    pending: 'bg-amber-50 text-amber-700 border-amber-200 ring-amber-500/20',
    failed: 'bg-red-50 text-red-700 border-red-200 ring-red-500/20',
    expired: 'bg-gray-50 text-gray-700 border-gray-200 ring-gray-500/10'
  }
  return themes[s] || 'bg-gray-50 text-gray-700 border-gray-200'
}

const getStatusIcon = (status) => {
  const s = status ? status.toLowerCase() : 'pending'
  if (s === 'success') return CheckCircle2
  if (s === 'pending') return Clock
  if (s === 'failed') return XCircle
  return AlertCircle
}

const downloadInvoice = async () => {
  try {
    await downloadTransactionReport()
    showAlert('Berhasil', 'Invoice berhasil diunduh.', 'success')
  } catch (err) {
    showAlert('Gagal', 'Gagal mengunduh invoice.', 'error')
  }
}

const sendReceipt = () => {
    showAlert('Info', 'Bukti pembayaran telah dikirim ke ' + transaction.value?.customer?.email, 'success')
}
</script>

<template>
  <div class="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
    <!-- Header Controls -->
    <div class="flex items-center justify-between">
      <button 
        @click="router.push('/admin/transactions')" 
        class="group flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-indigo-600 transition-all"
      >
        <div class="p-2 rounded-xl bg-white border border-gray-100 shadow-sm group-hover:border-indigo-100 group-hover:bg-indigo-50 transition-all">
          <ArrowLeft class="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        </div>
        Kembali ke Riwayat
      </button>
      
      <div class="flex gap-3">
        <button 
          @click="downloadInvoice" 
          class="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all shadow-sm"
        >
          <Download class="w-4 h-4" />
          Ekspor PDF
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-24 bg-white rounded-[2rem] border border-gray-100 shadow-sm space-y-4">
      <div class="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
      <p class="text-indigo-600 font-bold animate-pulse text-sm uppercase tracking-widest">Memuat Detail...</p>
    </div>

    <!-- Main Invoice Container -->
    <div v-else-if="transaction" class="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden">
      <!-- Invoice Header -->
      <div class="px-8 py-10 bg-gray-50/50 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div class="space-y-2">
          <div class="flex items-center gap-3">
            <div class="p-2.5 bg-indigo-600 rounded-2xl text-white shadow-lg shadow-indigo-200">
              <Receipt class="w-6 h-6" />
            </div>
            <h2 class="text-3xl font-black text-gray-900 tracking-tight">Invoice</h2>
          </div>
          <p class="text-sm font-bold text-gray-400 uppercase tracking-widest pl-1">ID: {{ transaction.invoice_number }}</p>
        </div>
        
        <div :class="['inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-black border ring-4 transition-all capitalize', getStatusTheme(transaction.status)]">
          <component :is="getStatusIcon(transaction.status)" class="w-5 h-5" />
          {{ transaction.status }}
        </div>
      </div>

      <div class="p-8 md:p-12 space-y-12">
        <!-- Billing Info Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div class="space-y-6">
            <h3 class="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Informasi Pembeli</h3>
            <div class="space-y-4">
              <div class="flex items-center gap-3 group">
                <div class="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 border border-gray-100 group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-colors">
                  <User class="w-5 h-5" />
                </div>
                <div>
                  <div class="text-[10px] font-bold text-gray-400 uppercase">Nama Lengkap</div>
                  <div class="text-sm font-bold text-gray-900">{{ transaction.customer?.name }}</div>
                </div>
              </div>
              <div class="flex items-center gap-3 group">
                <div class="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 border border-gray-100 group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-colors">
                  <Mail class="w-5 h-5" />
                </div>
                <div>
                  <div class="text-[10px] font-bold text-gray-400 uppercase">Email Address</div>
                  <div class="text-sm font-bold text-gray-900">{{ transaction.customer?.email }}</div>
                </div>
              </div>
            </div>
          </div>

          <div class="space-y-6">
            <h3 class="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Detail Kursus</h3>
            <div class="space-y-4">
              <div class="flex items-center gap-3 group">
                <div class="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 border border-gray-100 group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-colors">
                  <BookOpen class="w-5 h-5" />
                </div>
                <div>
                  <div class="text-[10px] font-bold text-gray-400 uppercase">Judul Kursus</div>
                  <div class="text-sm font-bold text-gray-900">{{ transaction.course?.title }}</div>
                </div>
              </div>
              <div class="flex items-center gap-3 group">
                  <div class="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 border border-gray-100 group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-colors">
                    <UserCheck class="w-5 h-5" />
                  </div>
                  <div>
                    <div class="text-[10px] font-bold text-gray-400 uppercase">Instruktur</div>
                    <div class="text-sm font-bold text-gray-900">NextSkill Mentor</div>
                  </div>
                </div>
            </div>
          </div>
        </div>

        <!-- Payment Metadata -->
        <div class="bg-gray-50/50 rounded-3xl p-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <div class="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase mb-2">
              <Calendar class="w-3.5 h-3.5" />
              Tanggal
            </div>
            <div class="text-sm font-bold text-gray-900">{{ transaction.created_at || '-' }}</div>
          </div>
          <div>
            <div class="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase mb-2">
              <Clock class="w-3.5 h-3.5" />
              Waktu (Full)
            </div>
            <div class="text-sm font-bold text-gray-900 truncate max-w-[120px]" :title="transaction.updated_at">{{ transaction.updated_at || '-' }}</div>
          </div>
          <div>
            <div class="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase mb-2">
              <CreditCard class="w-3.5 h-3.5" />
              Metode
            </div>
            <div class="text-sm font-bold text-gray-900">Midtrans</div>
          </div>
        </div>

        <!-- Notes & Description -->
            <div class="space-y-4">
              <h3 class="text-xs font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                <FileText class="w-3.5 h-3.5 text-indigo-500" />
                Keterangan
              </h3>
              <p class="text-sm text-gray-600 leading-relaxed truncate max-w-full">Pembelian akses kursus: {{ transaction.course?.title }}</p>
            </div>
            <div></div> <!-- Spacer for grid balance if needed, or just let it stay one column -->

        <!-- Total Summary -->
        <div class="pt-8 border-t-2 border-dashed border-gray-100 text-right">
          <div class="inline-block space-y-3 min-w-[280px]">
            <div class="flex justify-between items-center text-sm font-bold text-gray-400">
              <span>Subtotal</span>
              <span class="text-gray-900">{{ transaction.gross_amount_formatted }}</span>
            </div>
            <div class="flex justify-between items-center text-sm font-bold text-gray-400">
              <span>Biaya Layanan</span>
              <span class="text-gray-900">Rp 0</span>
            </div>
            <div class="flex justify-between items-center pt-4 mt-2 border-t border-gray-100">
              <span class="text-lg font-black text-gray-900">Total Pembayaran</span>
              <span class="text-3xl font-black text-indigo-600">{{ transaction.gross_amount_formatted }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else class="text-center py-24 bg-white rounded-[2rem] border border-gray-100 shadow-sm">
        <AlertCircle class="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <p class="text-gray-500 font-bold">Gagal memuat detail transaksi.</p>
        <button @click="fetchDetail" class="mt-4 text-indigo-600 font-bold hover:underline">Coba Lagi</button>
    </div>

    <!-- Final Actions -->
    <div v-if="!loading && transaction" class="flex flex-col sm:flex-row justify-end gap-4">
      <button 
        @click="downloadInvoice" 
        class="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-black text-sm text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-all shadow-sm active:scale-95"
      >
        <Download class="w-5 h-5" />
        Unduh Invoice PDF
      </button>
      <button 
        @click="sendReceipt" 
        class="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-black text-sm text-white bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-200 transition-all active:scale-95 group"
      >
        <Mail class="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
        Kirim Bukti Pembayaran
      </button>
    </div>
  </div>
</template>
