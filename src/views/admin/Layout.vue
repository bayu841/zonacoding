<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  LayoutDashboard,
  Users,
  BookOpen,
  GraduationCap,
  Receipt,
  Settings,
  Menu,
  LogOut,
  X
} from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()

// State untuk sidebar desktop (expanded/collapsed)
const isSidebarOpen = ref(true)

// State untuk mobile drawer (terbuka/tertutup)
const isMobileDrawerOpen = ref(false)

// Deteksi apakah saat ini layar mobile
const isMobile = ref(false)

const navigation = [
  { name: 'Dashboard', to: '/admin', icon: LayoutDashboard, exact: true },
  { name: 'Manajemen Pengguna', to: '/admin/users', icon: Users },
  { name: 'Manajemen Kursus', to: '/admin/courses', icon: BookOpen },
  { name: 'Manajemen Mentor', to: '/admin/mentors', icon: GraduationCap },
  { name: 'Transaksi', to: '/admin/transactions', icon: Receipt },
  { name: 'Pengaturan', to: '/admin/settings/general', icon: Settings }
]

const showDropdown = ref(false)

// Fungsi untuk mengecek ukuran layar
const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 768
  if (isMobile.value) {
    isSidebarOpen.value = true
  }
}

onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize)
})

const toggleMobileDrawer = () => {
  isMobileDrawerOpen.value = !isMobileDrawerOpen.value
}

const closeMobileDrawer = () => {
  isMobileDrawerOpen.value = false
}

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const handleLogout = () => {
  showDropdown.value = false
  closeMobileDrawer()
  router.push('/')
}

// Helper untuk mengecek apakah route saat ini aktif (termasuk nested)
const isActiveRoute = (item) => {
  if (item.exact) {
    return route.path === item.to
  }
  // Untuk non-exact, cocokkan prefix, tapi pastikan bukan dashboard
  return route.path.startsWith(item.to)
}
</script>

<template>
  <div class="min-h-screen bg-gray-50/50 flex">
    <!-- Overlay untuk mobile drawer -->
    <div
      v-if="isMobile && isMobileDrawerOpen"
      class="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-40 transition-opacity duration-300"
      @click="closeMobileDrawer"
    ></div>

    <!-- Sidebar / Drawer -->
    <aside
      :class="[
        'bg-white/95 backdrop-blur-sm border-r border-gray-200/60 flex flex-col transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
        !isMobile ? (isSidebarOpen ? 'w-64' : 'w-20') : '',
        isMobile
          ? 'fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]'
          : '',
        isMobile && !isMobileDrawerOpen ? '-translate-x-full' : 'translate-x-0'
      ]"
    >
      <!-- Header Sidebar -->
      <div class="h-16 flex items-center justify-between px-5 border-b border-gray-200/60">
        <h1
          v-if="isSidebarOpen || isMobile"
          class="font-bold text-xl bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent transition-all"
        >
          NextSkill Admin
        </h1>
        <h1 v-else class="font-bold text-xl bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
          NS
        </h1>

        <!-- Tombol close di mobile -->
        <button
          v-if="isMobile"
          @click="closeMobileDrawer"
          class="p-2 rounded-xl text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-all lg:hidden"
        >
          <X class="w-5 h-5" />
        </button>
      </div>

      <nav class="flex-1 overflow-y-auto py-6 px-3">
        <ul class="space-y-1.5">
          <li v-for="item in navigation" :key="item.name">
            <router-link
              :to="item.to"
              :title="!isSidebarOpen && !isMobile ? item.name : ''"
              @click="closeMobileDrawer"
              class="flex items-center px-4 py-2.5 rounded-xl text-gray-600 hover:bg-blue-50/80 hover:text-blue-600 transition-all duration-200 group"
              :class="[
                { 'justify-center': !isSidebarOpen && !isMobile },
                isActiveRoute(item)
                  ? 'bg-blue-50 text-blue-700 font-medium shadow-[0_2px_8px_rgba(59,130,246,0.08)]'
                  : ''
              ]"
            >
              <component :is="item.icon" class="w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-105" />
              <span v-if="isSidebarOpen || isMobile" class="ml-3 whitespace-nowrap text-[15px]">
                {{ item.name }}
              </span>
            </router-link>
          </li>
        </ul>
      </nav>

      <!-- Footer sidebar opsional -->
      <div class="p-3 border-t border-gray-200/60"></div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col min-w-0">
      <!-- Header -->
      <header
        class="h-16 bg-white/80 backdrop-blur-sm border-b border-gray-200/60 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30"
      >
        <div class="flex items-center">
          <!-- Tombol untuk mobile drawer -->
          <button
            v-if="isMobile"
            @click="toggleMobileDrawer"
            class="p-2 rounded-xl text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-all mr-1"
          >
            <Menu class="w-5 h-5" />
          </button>

          <!-- Tombol collapse/expand untuk desktop -->
          <button
            v-if="!isMobile"
            @click="isSidebarOpen = !isSidebarOpen"
            class="p-2 rounded-xl text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-all"
          >
            <Menu class="w-5 h-5" />
          </button>

          <!-- Page title / breadcrumb -->
          <div class="ml-3 sm:ml-5 font-medium text-gray-700 text-[15px]">
            Dashboard
          </div>
        </div>

        <!-- Avatar dengan Dropdown -->
        <div class="relative">
          <button
            @click="toggleDropdown"
            class="flex items-center gap-2 focus:outline-none group"
          >
            <div
              class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center font-semibold text-sm shadow-[0_2px_8px_rgba(59,130,246,0.2)] ring-2 ring-white/80 group-hover:ring-blue-200 transition-all"
            >
              A
            </div>
          </button>

          <!-- Dropdown Menu -->
          <transition
            enter-active-class="transition ease-out duration-150"
            enter-from-class="transform opacity-0 scale-95 -translate-y-1"
            enter-to-class="transform opacity-100 scale-100 translate-y-0"
            leave-active-class="transition ease-in duration-100"
            leave-from-class="transform opacity-100 scale-100 translate-y-0"
            leave-to-class="transform opacity-0 scale-95 -translate-y-1"
          >
            <div
              v-if="showDropdown"
              class="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-sm rounded-xl shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05)] border border-gray-200/60 py-1 z-50"
            >
              <button
                @click="handleLogout"
                class="w-full flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors rounded-lg mx-1"
              >
                <LogOut class="w-4 h-4 mr-3" />
                Logout
              </button>
            </div>
          </transition>
        </div>
      </header>

      <!-- Main Section -->
      <main class="flex-1 p-6 overflow-auto">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>
