<script setup>
import StatCard from './StatCard.vue'
import { Users, BookOpen, GraduationCap, DollarSign } from 'lucide-vue-next'
import { ref } from 'vue'

const stats = ref([
  {
    title: 'Total Siswa',
    value: '1,245',
    icon: Users,
    change: '+12%',
    isPositive: true,
    color: 'blue'
  },
  {
    title: 'Total Kursus Aktif',
    value: '86',
    icon: BookOpen,
    change: '+5%',
    isPositive: true,
    color: 'emerald'
  },
  {
    title: 'Total Mentor',
    value: '42',
    icon: GraduationCap,
    change: '0%',
    isPositive: null,
    color: 'amber'
  },
  {
    title: 'Pendapatan Bulan Ini',
    value: 'Rp 45,5 jt',
    icon: DollarSign,
    change: '+18%',
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
