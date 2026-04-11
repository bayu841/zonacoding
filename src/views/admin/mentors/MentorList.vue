<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import MentorListHeader from '../../../components/admin/mentors/MentorListHeader.vue'
import MentorListTable from '../../../components/admin/mentors/MentorListTable.vue'

const router = useRouter()

const mentors = ref([
  { id: 1, name: 'Andi Setiawan', email: 'andi@example.com', coursesCount: 5, status: 'Verified' },
  { id: 2, name: 'Siti Aminah', email: 'siti@example.com', coursesCount: 1, status: 'Pending' },
  { id: 3, name: 'Budi Santoso', email: 'budi@example.com', coursesCount: 3, status: 'Verified' },
  { id: 4, name: 'Eka Wijaya', email: 'eka@example.com', coursesCount: 0, status: 'Rejected' },
  { id: 5, name: 'Dewi Lestari', email: 'dewi@example.com', coursesCount: 2, status: 'Verified' },
])

const filterStatus = ref('all')
const searchQuery = ref('')

// Filtered mentors
const filteredMentors = computed(() => {
  return mentors.value.filter(mentor => {
    const matchesStatus = filterStatus.value === 'all' || mentor.status === filterStatus.value
    const matchesSearch = mentor.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          mentor.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchesStatus && matchesSearch
  })
})

const handleViewDetail = (mentor) => {
  router.push(`/admin/mentors/${mentor.id}`)
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header Component -->
    <MentorListHeader
      v-model:searchQuery="searchQuery"
      v-model:filterStatus="filterStatus"
    />

    <!-- Table Component -->
    <div class="mt-8">
      <MentorListTable
        :mentors="filteredMentors"
        @view-detail="handleViewDetail"
      />
    </div>
  </div>
</template>
