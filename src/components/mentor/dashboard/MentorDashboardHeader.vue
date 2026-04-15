<script setup>
import StatCard from '../../../components/admin/dashboard/StatCard.vue'
import { Users, BookOpen, Star, DollarSign } from 'lucide-vue-next'
import { computed } from 'vue'

const props = defineProps({
  statsData: {
    type: Object,
    default: () => ({})
  }
})

const stats = computed(() => [
  {
    title: 'Siswa Terdaftar',
    value: props.statsData?.siswa_terdaftar?.toLocaleString() || '0',
    icon: Users,
    change: '',
    isPositive: true,
    color: 'emerald'
  },
  {
    title: 'Kursus Saya',
    value: props.statsData?.kursus_saya?.toLocaleString() || '0',
    icon: BookOpen,
    change: '',
    isPositive: true,
    color: 'blue'
  },
  {
    title: 'Rata-rata Rating',
    value: props.statsData?.rata_rating?.toFixed(1) || '0.0',
    icon: Star,
    change: '',
    isPositive: true,
    color: 'amber'
  },
  {
    title: 'Pendapatan (Total)',
    value: `Rp ${props.statsData?.pendapatan?.toLocaleString() || '0'}`,
    icon: DollarSign,
    change: '',
    isPositive: true,
    color: 'purple'
  }
])
</script>

<template>
  <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
    <StatCard
      v-for="stat in stats"
      :key="stat.title"
      :title="stat.title"
      :value="stat.value"
      :icon="stat.icon"
      :change="stat.change"
      :is-positive="stat.isPositive"
      :color="stat.color"
    />
  </div>
</template>

