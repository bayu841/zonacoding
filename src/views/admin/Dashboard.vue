<script setup>
import { onMounted, computed } from 'vue'
import {
  Users,
  CreditCard,
  TrendingUp,
  Percent,
  CheckCircle,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  MonitorPlay,
  Wallet,
  Loader2
} from 'lucide-vue-next'
import { useDashboardStore } from '@/stores/dashboardStore'

const dashboardStore = useDashboardStore()
const loading = computed(() => dashboardStore.loading)
const dashboardData = computed(() => dashboardStore.dashboardData)

onMounted(async () => {
  await dashboardStore.fetchDashboard()
})

const kpiStats = computed(() => {
  if (!dashboardData.value) return []
  
  return [
    { 
      id: 1, 
      title: 'Total Volume Transaksi', 
      value: `Rp ${dashboardData.value.total_transaksi.toLocaleString()}`, 
      icon: CreditCard, 
      trend: '', 
      isUp: true, 
      color: 'text-indigo-600', 
      bg: 'bg-indigo-100' 
    },
    { 
      id: 2, 
      title: `Komisi Platform (${dashboardData.value.platform_percentage}%)`, 
      value: `Rp ${dashboardData.value.komisi_platform.toLocaleString()}`, 
      icon: Wallet, 
      trend: '', 
      isUp: true, 
      color: 'text-emerald-600', 
      bg: 'bg-emerald-100' 
    },
    { 
      id: 3, 
      title: `Hak Mentor (${dashboardData.value.mentor_percentage}%)`, 
      value: `Rp ${dashboardData.value.hak_mentor.toLocaleString()}`, 
      icon: Percent, 
      trend: '', 
      isUp: true, 
      color: 'text-amber-600', 
      bg: 'bg-amber-100' 
    },
    { 
      id: 4, 
      title: 'Siswa Aktif', 
      value: dashboardData.value.siswa_aktif.toLocaleString(), 
      icon: Users, 
      trend: '', 
      isUp: true, 
      color: 'text-rose-600', 
      bg: 'bg-rose-100' 
    }
  ]
})

const monthlyRevenue = computed(() => {
  if (!dashboardData.value?.grafik_transaksi) return []
  
  const max = Math.max(...dashboardData.value.grafik_transaksi.map(d => d.total), 1000000)
  
  return dashboardData.value.grafik_transaksi.map(item => ({
    month: item.bulan,
    volume: item.total,
    max: max * 1.2
  }))
})

const pendingCourses = computed(() => dashboardData.value?.pending_course_applications || [])

</script>

<template>
  <div class="space-y-6 max-w-7xl mx-auto pb-10">
    <div v-if="loading" class="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <Loader2 class="w-10 h-10 text-indigo-600 animate-spin" />
      <p class="text-gray-500 font-medium italic">Menghubungkan ke pusat data finansial...</p>
    </div>

    <template v-else-if="dashboardData">
      <!-- Hero / Header -->
      <div class="bg-gradient-to-r from-indigo-700 to-indigo-500 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between shadow-lg relative overflow-hidden">
        <!-- Decorative background -->
        <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        
        <div class="relative z-10">
          <h1 class="text-3xl font-extrabold mb-2 text-white">Dashboard Bisnis</h1>
          <p class="text-indigo-100 max-w-lg leading-relaxed">
            Pantau kesehatan finansial platform, total pendapatan kotor, serta skema pembagian komisi dengan mentor secara real-time.
          </p>
        </div>
        <div class="relative z-10 mt-6 md:mt-0 flex gap-3">
          <button class="bg-white/20 hover:bg-white/30 backdrop-blur-md px-5 py-2.5 rounded-xl text-sm font-bold flex items-center transition-all border border-white/10">
            <Activity class="w-4 h-4 mr-2" /> Unduh Laporan
          </button>
        </div>
      </div>

      <!-- KPI Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div 
          v-for="stat in kpiStats" :key="stat.id" 
          class="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all group"
        >
          <div class="flex items-center justify-between mb-4">
            <div :class="['w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110', stat.bg, stat.color]">
              <component :is="stat.icon" class="w-6 h-6" />
            </div>
            <div 
              v-if="stat.trend"
              class="flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full"
              :class="stat.isUp ? 'text-emerald-700 bg-emerald-50' : 'text-rose-700 bg-rose-50'"
            >
              <ArrowUpRight v-if="stat.isUp" class="w-3.5 h-3.5" />
              <ArrowDownRight v-else class="w-3.5 h-3.5" />
              {{ stat.trend }}
            </div>
          </div>
          <div>
            <p class="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">{{ stat.title }}</p>
            <h3 class="text-2xl font-black text-gray-900">{{ stat.value }}</h3>
          </div>
        </div>
      </div>

      <!-- Main Content Area: Charts & Lists -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <!-- Chart Area -->
        <div class="lg:col-span-2 bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
          <div class="flex items-center justify-between mb-8">
            <div>
              <h3 class="font-extrabold text-lg text-gray-900">Grafik Volume Transaksi</h3>
              <p class="text-sm text-gray-500">Kinerja penjualan kotor berdasarkan data terbaru</p>
            </div>
            <div class="flex items-center gap-2">
               <div class="w-3 h-3 rounded-full bg-indigo-500"></div> <span class="text-xs font-bold text-gray-600">Volume (Rp)</span>
            </div>
          </div>

          <!-- Pure CSS Bar Chart Box -->
          <div class="w-full h-64 flex items-end justify-between gap-2 md:gap-6 relative border-b-2 border-l-2 border-gray-100 pb-2 pl-2">
             <!-- Horizontal grid lines -->
             <div class="absolute inset-x-0 bottom-[25%] border-b border-dashed border-gray-100 w-full z-0"></div>
             <div class="absolute inset-x-0 bottom-[50%] border-b border-dashed border-gray-100 w-full z-0"></div>
             <div class="absolute inset-x-0 bottom-[75%] border-b border-dashed border-gray-100 w-full z-0"></div>
             <div class="absolute inset-x-0 bottom-[100%] border-b border-dashed border-gray-100 w-full z-0"></div>

             <!-- Bars -->
             <div v-for="data in monthlyRevenue" :key="data.month" class="flex-1 flex flex-col justify-end items-center group relative z-10 h-full">
                <!-- Tooltip -->
                <div class="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs font-bold py-1 px-2 rounded tracking-widest pointer-events-none whitespace-nowrap">
                   Rp {{ data.volume.toLocaleString() }}
                </div>
                
                <!-- Bar Fill -->
                <div class="w-full max-w-[40px] md:max-w-[60px] bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-lg transition-all duration-1000 hover:from-indigo-500 hover:to-indigo-300 shadow-[0_0_10px_rgba(79,70,229,0.3)] group-hover:-translate-y-1"
                     :style="{ height: `${(data.volume / data.max) * 100}%` }">
                </div>
                <!-- Label -->
                <span class="absolute -bottom-8 text-xs font-bold text-gray-500 uppercase">{{ data.month }}</span>
             </div>
          </div>
        </div>

        <!-- Moderation & Activity Side Panel -->
        <div class="space-y-6">
          
          <!-- Action Required Widget -->
          <div class="bg-gradient-to-br from-amber-500 to-orange-500 rounded-3xl p-6 shadow-lg shadow-orange-500/20 text-white relative overflow-hidden">
            <MonitorPlay class="w-24 h-24 absolute -bottom-4 -right-4 text-white/10 transform -rotate-12" />
            <h3 class="font-extrabold text-lg mb-1 relative z-10">Tinjau Kursus Baru</h3>
            <p class="text-amber-100 text-sm mb-4 relative z-10">Ada {{ pendingCourses.length }} kursus baru yang menanti persetujuan Anda.</p>
            
            <div class="space-y-3 relative z-10 mb-4">
              <div v-if="!pendingCourses.length" class="text-sm italic text-white/60">
                Semua kursus sudah ditinjau
              </div>
              <div v-for="course in pendingCourses" :key="course.id" class="bg-white/20 backdrop-blur-md rounded-xl p-3 border border-white/20">
                <p class="font-bold text-white text-sm truncate">{{ course.course_title }}</p>
                <div class="flex justify-between items-center mt-1">
                  <p class="text-[10px] text-amber-100">Mentor: {{ course.mentor_name }}</p>
                  <p class="text-[10px] text-amber-50">{{ course.applied_at }}</p>
                </div>
              </div>
            </div>
            
            <router-link to="/admin/courses" class="block text-center w-full bg-white text-orange-600 font-bold text-sm py-3 rounded-xl hover:bg-orange-50 transition-colors shadow-sm relative z-10">
              Lihat Semua &rarr;
            </router-link>
          </div>

          <!-- Mini Analytics (Optional/Placeholder if not in API) -->
          <div class="bg-white rounded-3xl border border-gray-100 p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
             <h3 class="font-bold text-gray-900 mb-4">Status Platform</h3>
             <div class="space-y-4">
               <div class="flex items-center justify-between p-3 bg-gray-50 rounded-2xl">
                 <div class="flex items-center gap-3">
                   <div class="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
                     <TrendingUp class="w-4 h-4" />
                   </div>
                   <span class="text-sm font-bold text-gray-700">Platform Fee</span>
                 </div>
                 <span class="text-sm font-black text-gray-900">{{ dashboardData.platform_percentage }}%</span>
               </div>
               <div class="flex items-center justify-between p-3 bg-gray-50 rounded-2xl">
                 <div class="flex items-center gap-3">
                   <div class="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                     <CheckCircle class="w-4 h-4" />
                   </div>
                   <span class="text-sm font-bold text-gray-700">Mentor Revenue</span>
                 </div>
                 <span class="text-sm font-black text-gray-900">{{ dashboardData.mentor_percentage }}%</span>
               </div>
             </div>
          </div>

        </div>
      </div>
    </template>
  </div>
</template>

