<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import TransactionListHeader from '../../../components/admin/transactions/TransactionListHeader.vue'
import TransactionListTable from '../../../components/admin/transactions/TransactionListTable.vue'
import { getTransactions, downloadTransactionReport } from '@/api/transaction'
import { useAlert } from '@/composables/useAlert'

const router = useRouter()
const { showAlert } = useAlert()

const transactions = ref([])
const pagination = ref({
  total: 0,
  per_page: 5,
  current_page: 1,
  last_page: 1
})
const loading = ref(false)
const filterStatus = ref('all')
const searchQuery = ref('')

const fetchTransactions = async (page = 1) => {
  loading.value = true
  try {
    const params = {
      page,
      status: filterStatus.value !== 'all' ? filterStatus.value : undefined,
      search: searchQuery.value || undefined
    }
    const response = await getTransactions(params)
    transactions.value = response.data.data
    pagination.value = response.data.pagination
  } catch (err) {
    console.error('Fetch error:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchTransactions()
})

const handleViewDetail = (trx) => {
  router.push(`/admin/transactions/${trx.id}`)
}

const handleExport = async () => {
  try {
    await downloadTransactionReport()
    showAlert('Berhasil', 'Laporan transaksi berhasil diunduh.', 'success')
  } catch (err) {
    showAlert('Gagal', 'Gagal mengunduh laporan transaksi.', 'error')
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header Component -->
    <TransactionListHeader
      v-model:searchQuery="searchQuery"
      v-model:filterStatus="filterStatus"
      @update:searchQuery="fetchTransactions(1)"
      @update:filterStatus="fetchTransactions(1)"
      @export="handleExport"
    />

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
    </div>

    <!-- Table Component -->
    <div v-else class="mt-8 transition-all duration-300">
      <TransactionListTable
        :transactions="transactions"
        :pagination="pagination"
        @view-detail="handleViewDetail"
        @change-page="fetchTransactions"
      />
    </div>
  </div>
</template>
