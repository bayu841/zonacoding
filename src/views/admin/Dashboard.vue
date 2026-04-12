<script setup>
import { ref } from 'vue'
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
  Wallet
} from 'lucide-vue-next'

// --- Mock Stats ---
const kpiStats = [
  { id: 1, title: 'Total Volume Transaksi', value: 'Rp 45.200.000', icon: CreditCard, trend: '+12.5%', isUp: true, color: 'text-indigo-600', bg: 'bg-indigo-100' },
  { id: 2, title: 'Komisi Platform (20%)', value: 'Rp 9.040.000', icon: Wallet, trend: '+12.5%', isUp: true, color: 'text-emerald-600', bg: 'bg-emerald-100' },
  { id: 3, title: 'Hak Mentor (80%)', value: 'Rp 36.160.000', icon: Percent, trend: '+12.5%', isUp: true, color: 'text-amber-600', bg: 'bg-amber-100' },
  { id: 4, title: 'Siswa Aktif', value: '2,405', icon: Users, trend: '-2.4%', isUp: false, color: 'text-rose-600', bg: 'bg-rose-100' }
]

// Pure CSS Bar Chart Data
const monthlyRevenue = [
  { month: 'Jan', volume: 4000000, max: 10000000 },
  { month: 'Feb', volume: 6500000, max: 10000000 },
  { month: 'Mar', volume: 5200000, max: 10000000 },
  { month: 'Apr', volume: 8800000, max: 10000000 },
  { month: 'Mei', volume: 9500000, max: 10000000 },
  { month: 'Jun', volume: 7200000, max: 10000000 }
]

// Course Approvals Summary
const pendingCourses = ref([
  { id: 1, title: 'Mastering Go Lang Microservices', mentor: 'Rahmat Hidayat' },
  { id: 2, title: 'Desain Sistem untuk Pemula', mentor: 'Siti Rahma' }
])

</script>

<template>
  <div class="space-y-6 max-w-7xl mx-auto pb-10">
    
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
            <p class="text-sm text-gray-500">Kinerja penjualan kotor 6 bulan terakhir</p>
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
              <div class="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs font-bold py-1 px-2 rounded tracking-widest pointer-events-none">
                 {{ (data.volume / 1000000).toFixed(1) }} Jt
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
          <h3 class="font-extrabold text-lg mb-1 relative z-10">Tinjau Kursus Draft</h3>
          <p class="text-amber-100 text-sm mb-4 relative z-10">Ada {{ pendingCourses.length }} kursus baru dari mentor yang menanti persetujuan Anda.</p>
          
          <div class="space-y-3 relative z-10 mb-4">
            <div v-for="course in pendingCourses" :key="course.id" class="bg-white/20 backdrop-blur-md rounded-xl p-3 border border-white/20">
              <p class="font-bold text-white text-sm truncate">{{ course.title }}</p>
              <p class="text-xs text-amber-100">Mentor: {{ course.mentor }}</p>
            </div>
          </div>
          
          <router-link to="/admin/courses/approvals" class="block text-center w-full bg-white text-orange-600 font-bold text-sm py-3 rounded-xl hover:bg-orange-50 transition-colors shadow-sm relative z-10">
            Pergi ke Persetujuan &rarr;
          </router-link>
        </div>

        <!-- Mini Analytics -->
        <div class="bg-white rounded-3xl border border-gray-100 p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
           <h3 class="font-bold text-gray-900 mb-4">Top Kategori Diminati</h3>
           <div class="space-y-4">
             <div>
               <div class="flex justify-between text-sm font-semibold mb-1">
                 <span class="text-gray-700">Frontend Development</span>
                 <span class="text-gray-900">65%</span>
               </div>
               <div class="w-full bg-gray-100 rounded-full h-2">
                 <div class="bg-indigo-500 h-2 rounded-full w-[65%]"></div>
               </div>
             </div>
             <div>
               <div class="flex justify-between text-sm font-semibold mb-1">
                 <span class="text-gray-700">UI/UX Design</span>
                 <span class="text-gray-900">45%</span>
               </div>
               <div class="w-full bg-gray-100 rounded-full h-2">
                 <div class="bg-pink-500 h-2 rounded-full w-[45%]"></div>
               </div>
             </div>
             <div>
               <div class="flex justify-between text-sm font-semibold mb-1">
                 <span class="text-gray-700">Backend Node.js</span>
                 <span class="text-gray-900">30%</span>
               </div>
               <div class="w-full bg-gray-100 rounded-full h-2">
                 <div class="bg-emerald-500 h-2 rounded-full w-[30%]"></div>
               </div>
             </div>
           </div>
        </div>

      </div>
    </div>
  </div>
</template>
