<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
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

const route = useRoute()
const router = useRouter()
const transactionId = route.params.transactionId

const transaction = ref({
  id: 'INV-1001',
  investmentId: transactionId,
  user: 'Alif Naufal',
  email: 'alif@example.com',
  course: 'Mastering Vue 3: Architecture & Design Patterns',
  instructor: 'Andi Setiawan',
  amount: 250000,
  tax: 25000,
  total: 275000,
  paymentMethod: 'Credit Card Visa (**** 4242)',
  status: 'Sukses',
  date: '10 April 2026',
  time: '14:30:45',
  description: 'Pembelian akses seumur hidup untuk kursus Mastering Vue 3 tingkat lanjut.',
  notes: 'Pembayaran berhasil dikonfirmasi secara otomatis oleh sistem Stripe.'
})

const getStatusTheme = (status) => {
  const themes = {
    Sukses: 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-500/20',
    Pending: 'bg-amber-50 text-amber-700 border-amber-200 ring-amber-500/20',
    Gagal: 'bg-red-50 text-red-700 border-red-200 ring-red-500/20'
  }
  return themes[status] || 'bg-gray-50 text-gray-700 border-gray-200'
}

const getStatusIcon = (status) => {
  if (status === 'Sukses') return CheckCircle2
  if (status === 'Pending') return Clock
  if (status === 'Gagal') return XCircle
  return AlertCircle
}

const downloadInvoice = () => {
    alert('Menyiapkan file PDF Invoice ' + transaction.value.id)
}

const sendReceipt = () => {
    alert('Bukti pembayaran telah dikirim ke ' + transaction.value.email)
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

    <!-- Main Invoice Container -->
    <div class="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden">
      <!-- Invoice Header -->
      <div class="px-8 py-10 bg-gray-50/50 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div class="space-y-2">
          <div class="flex items-center gap-3">
            <div class="p-2.5 bg-indigo-600 rounded-2xl text-white shadow-lg shadow-indigo-200">
              <Receipt class="w-6 h-6" />
            </div>
            <h2 class="text-3xl font-black text-gray-900 tracking-tight">Invoice</h2>
          </div>
          <p class="text-sm font-bold text-gray-400 uppercase tracking-widest pl-1">ID: {{ transaction.id }}</p>
        </div>
        
        <div :class="['inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-black border ring-4 transition-all', getStatusTheme(transaction.status)]">
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
                  <div class="text-sm font-bold text-gray-900">{{ transaction.user }}</div>
                </div>
              </div>
              <div class="flex items-center gap-3 group">
                <div class="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 border border-gray-100 group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-colors">
                  <Mail class="w-5 h-5" />
                </div>
                <div>
                  <div class="text-[10px] font-bold text-gray-400 uppercase">Email Address</div>
                  <div class="text-sm font-bold text-gray-900">{{ transaction.email }}</div>
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
                  <div class="text-sm font-bold text-gray-900">{{ transaction.course }}</div>
                </div>
              </div>
              <div class="flex items-center gap-3 group">
                <div class="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 border border-gray-100 group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-colors">
                  <UserCheck class="w-5 h-5" />
                </div>
                <div>
                  <div class="text-[10px] font-bold text-gray-400 uppercase">Instruktur</div>
                  <div class="text-sm font-bold text-gray-900">{{ transaction.instructor }}</div>
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
            <div class="text-sm font-bold text-gray-900">{{ transaction.date }}</div>
          </div>
          <div>
            <div class="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase mb-2">
              <Clock class="w-3.5 h-3.5" />
              Waktu
            </div>
            <div class="text-sm font-bold text-gray-900">{{ transaction.time }}</div>
          </div>
          <div>
            <div class="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase mb-2">
              <CreditCard class="w-3.5 h-3.5" />
              Metode
            </div>
            <div class="text-sm font-bold text-gray-900">{{ transaction.paymentMethod }}</div>
          </div>
        </div>

        <!-- Notes & Description -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div class="space-y-4">
            <h3 class="text-xs font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
              <FileText class="w-3.5 h-3.5 text-indigo-500" />
              Keterangan
            </h3>
            <p class="text-sm text-gray-600 leading-relaxed">{{ transaction.description }}</p>
          </div>
          <div class="space-y-4">
            <h3 class="text-xs font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
              <AlertCircle class="w-3.5 h-3.5 text-indigo-500" />
              Catatan Internal
            </h3>
            <div class="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100 text-sm text-indigo-700 font-medium">
              {{ transaction.notes }}
            </div>
          </div>
        </div>

        <!-- Total Summary -->
        <div class="pt-8 border-t-2 border-dashed border-gray-100 text-right">
          <div class="inline-block space-y-3 min-w-[280px]">
            <div class="flex justify-between items-center text-sm font-bold text-gray-400">
              <span>Subtotal</span>
              <span class="text-gray-900">Rp {{ transaction.amount.toLocaleString('id-ID') }}</span>
            </div>
            <div class="flex justify-between items-center text-sm font-bold text-gray-400">
              <span>PPN (10%)</span>
              <span class="text-gray-900">Rp {{ transaction.tax.toLocaleString('id-ID') }}</span>
            </div>
            <div class="flex justify-between items-center pt-4 mt-2 border-t border-gray-100">
              <span class="text-lg font-black text-gray-900">Total Pembayaran</span>
              <span class="text-3xl font-black text-indigo-600">Rp {{ transaction.total.toLocaleString('id-ID') }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Final Actions -->
    <div class="flex flex-col sm:flex-row justify-end gap-4">
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
