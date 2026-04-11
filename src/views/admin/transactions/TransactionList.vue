<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import TransactionListHeader from '../../../components/admin/transactions/TransactionListHeader.vue'
import TransactionListTable from '../../../components/admin/transactions/TransactionListTable.vue'

const router = useRouter()

const transactions = ref([
  { id: 'INV-1001', user: 'Alif Naufal', course: 'Mastering Vue 3: From Zero to Hero', amount: 250000, status: 'Sukses', date: '2026-04-10' },
  { id: 'INV-1002', user: 'Dimas Anggara', course: 'Advanced Tailwind CSS: Building Premium UI', amount: 150000, status: 'Pending', date: '2026-04-09' },
  { id: 'INV-1003', user: 'Putri Lestari', course: 'Dasar UI/UX Design System', amount: 100000, status: 'Gagal', date: '2026-04-08' },
  { id: 'INV-1004', user: 'Rian Hidayat', course: 'Node.js Backend Architecture', amount: 300000, status: 'Sukses', date: '2026-04-07' },
  { id: 'INV-1005', user: 'Santi Wijaya', course: 'Fullstack Laravel & Vue 3', amount: 450000, status: 'Pending', date: '2026-04-06' },
])

const filterStatus = ref('all')
const searchQuery = ref('')

// Filtered transactions
const filteredTransactions = computed(() => {
  return transactions.value.filter(trx => {
    const matchesStatus = filterStatus.value === 'all' || trx.status === filterStatus.value
    const matchesSearch = trx.id.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          trx.user.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          trx.course.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchesStatus && matchesSearch
  })
})

const handleViewDetail = (trx) => {
  router.push(`/admin/transactions/${trx.id}`)
}

const handleExport = () => {
  alert('Menyiapkan laporan transaksi... Unduhan akan segera dimulai.')
  console.log('Exporting transactions report...')
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header Component -->
    <TransactionListHeader
      v-model:searchQuery="searchQuery"
      v-model:filterStatus="filterStatus"
      @export="handleExport"
    />

    <!-- Table Component -->
    <div class="mt-8 transition-all duration-300">
      <TransactionListTable
        :transactions="filteredTransactions"
        @view-detail="handleViewDetail"
      />
    </div>
  </div>
</template>
