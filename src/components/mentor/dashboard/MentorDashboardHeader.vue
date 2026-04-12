<script setup>
import StatCard from '../../../components/admin/dashboard/StatCard.vue'
import { Users, BookOpen, Star, DollarSign } from 'lucide-vue-next'
import { ref } from 'vue'

const stats = ref([
  {
    title: 'Siswa Terdaftar',
    value: '350',
    icon: Users,
    change: '+15%',
    isPositive: true,
    color: 'emerald'
  },
  {
    title: 'Kursus Saya',
    value: '8',
    icon: BookOpen,
    change: '+1',
    isPositive: true,
    color: 'blue'
  },
  {
    title: 'Rata-rata Rating',
    value: '4.8',
    icon: Star,
    change: '+0.2',
    isPositive: true,
    color: 'amber'
  },
  {
    title: 'Pendapatan (Bulan ini)',
    value: 'Rp 12,5 jt',
    icon: DollarSign,
    change: '+22%',
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
